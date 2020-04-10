<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="test.aspx.cs" Inherits="Authentication.MainTestFrm" %>

<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head id="Head1" runat="server">
    <title>test</title>
    <object id="AuthIE" name="AuthIE" width="0px" height="0px" codebase="DogAuth.CAB"
        classid="CLSID:05C384B0-F45D-46DB-9055-C72DC76176E3" style="visibility: hidden">
    </object>
    <embed id="AuthNoIE" type="application/x-dogauth" width=0 height=0 hidden="true"></embed>
</head>

<body>
    <%-- 登陆 --%>
    <%-- <div>
        <input type="text" id="username" name="username" />
        <input type="password" id="password" name="password" maxlength="32" />
        <input type="submit" value="登陆" id="submit" />
        <div>
            当前用户登陆状态：
            <h1></h1>
        </div>
        <div>
            操作状态：
            <p></p>
        </div>
    </div> --%>

    <%-- 注册 --%>
    <%-- <div>
        <input type="text" id="username" name="username" />
        <input type="password" id="password1" name="password1" maxlength="32" />
        <input type="password" id="password2" name="password2" maxlength="32" />
        <input type="submit" value="注册" id="register" />
        <div>
            当前用户登陆状态：
            <h1></h1>
        </div>
        <div>
            操作状态：
            <p></p>
        </div>
    </div> --%>
    <%-- 修改密码 --%>
    <div>
        <input type="password" id="password0" name="password0" maxlength="32" />
        <input type="password" id="password1" name="password1" maxlength="32" />
        <input type="password" id="password2" name="password2" maxlength="32" />
        <input type="submit" value="修改密码" id="changePwd" />
        <div>
            当前用户登陆状态：
            <h1></h1>
        </div>
        <div>
            操作状态：
            <p></p>
        </div>
    </div>
</body>
<script src="https://cdn.bootcss.com/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="test.js"></script>
<script language="javascript" type="text/javascript">
    var changePwd = {
        //写入关于用户的提示信息
        htmlUserNotice: function (message) {
            document.querySelector('h1').innerText = message;
        },
        //写入关于登陆的提示信息
        htmlLoginNotice: function (message) {
            document.querySelector('p').innerText = message;
        },
        //superDog是否插上 默认true没有插上
        dogNotPresent: true,
        //权限对象
        authObj: null,
        //AuthCode 是从服务端的 auth_code.xml 配置文件中读取的算法数据。
        authCode: "",
        //Scope 表示在多个超级狗同时存在的情况下，可以打开特定的狗；
        scope: "<dogscope/>",
        //获取认证代码
        createAuthCode: function () {
            this.authCode = superDog.getAuthCode();
        },
        //创建权限对象
        createAuthObj: function () {
            this.authObj = superDog.getAuthObject();
        },
        //ie
        handleIeChangePwd: function () {
            var self = this,
                oldPwd = document.getElementById("password0").value,
                newPwd = document.getElementById("password1").value,
                authObj = this.authObj,
                status;
            //是否打开supperDog
            status = authObj.Open(this.scope, this.authCode);
            if (status != 0) {
                authObj.Close();
                this.htmlLoginNotice(superDog.reportStatus(status));
                return false;
            }
            //验证一个新的超级狗必须
            status = authObj.VerifyUserPin(oldPwd);
            if (status != 0) {
                authObj.Close();
                this.htmlLoginNotice(superDog.reportStatus(status));
                return false;
            }
            //修改密码
            status = authObj.ChangeUserPin(newPwd);
            if (status == 0) {
                alert("Your password has been changed successfully!");
            } else {
                this.htmlLoginNotice(superDog.reportStatus(status));
            }
            authObj.Close();
        },
        //chrome和firefox
        //监听
        onMessage: function () {
            var self = this;
            window.parent.addEventListener("message", function (event) {
                if (event.data.type == "SNTL_FROM_HOST") {
                    var ReturnText = event.data.text,
                        message;
                    console.log(ReturnText);
                    if ("GetUserNameEx" == ReturnText.InvokeMethod) {
                        //获取用户名
                        if (ReturnText.Status == 0) {
                            self.dogNotPresent = false;
                            message = "";
                        } else {
                            self.dogNotPresent = true;
                            self.nameInDog = "";
                            message = superDog.reportStatus(parseInt(ReturnText.Status))
                        }
                        self.htmlUserNotice(message);
                    } else if ("ChangeUserPinEx" == ReturnText.InvokeMethod) {
                        //验证旧口令是否通过
                        if (ReturnText.Status == 0) {
                            alert("Your password has been changed successfully!");
                        } else {
                            self.htmlLoginNotice(superDog.reportStatus(parseInt(ReturnText.Status)));
                        }
                    }
                }
            }, false);
        },
        //从超级狗中读取用户名
        getUser: function () {
            this.authObj.GetUserNameEx(this.scope, this.authCode);
            //Execute the check again after 2 seconds
            setTimeout(function () {
                this.getUser();
            }.bind(this), 2000);
        },
        handleChromeChangePwd: function () {
            var self = this,
                oldPwd = document.getElementById("password0").value,
                newPwd = document.getElementById("password1").value;
            //如果没有插上supperDog
            if (this.dogNotPresent) {
                return false;
            }
            //代码调用本机应用的 ChangeUserPinEx (Scope,AuthCode, oldPIN, newPIN) 方法，本机应用如果验证旧口令通过
            this.authObj.ChangeUserPinEx(this.scope, this.authCode, oldPwd, newPwd);
        },
        bin: function () {
            var self = this;
            this.createAuthCode();
            this.createAuthObj();

            //Chrome or Firefox
            if ((navigator.userAgent.indexOf("Chrome") > 0) || (navigator.userAgent.indexOf("Firefox") > 0)) {
                this.onMessage();
                this.getUser();
                document.querySelector('#changePwd').onclick = function () {
                    self.handleChromeChangePwd();
                }
            }
            //ie
            else {
                document.querySelector('#changePwd').onclick = function () {
                    self.handleIeChangePwd();
                }
            }
        }
    };
    changePwd.bin();
</script>

</html>