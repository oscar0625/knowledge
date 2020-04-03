<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="test.aspx.cs" Inherits="Authentication.MainTestFrm" %>

<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head id="Head1" runat="server">
    <title>test</title>
    <object id="AuthIE" name="AuthIE" width="0px" height="0px" codebase="DogAuth.CAB"
        classid="CLSID:05C384B0-F45D-46DB-9055-C72DC76176E3" style="visibility: hidden">
    </object>
</head>

<body>
    <div>
        <input type="text" id="username" name="username" readonly="readonly" />
        <input type="passwoprd" id="password" name="password" maxlength="32" />
        <input type="submit" value="登陆" id="submit" />
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
    var main = {
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
        //打开superDog
        openDog: function () {
            //打开超级狗 返回值用来判断成功的状态
            var authObj = this.authObj,
                isOpen = authObj.Open(this.scope, this.authCode),
                code, message = "";
            //如果isOpen是0 证明打开了超级狗
            if (isOpen == 0) {
                this.dogNotPresent = false;
                //获取用户名 返回值用来判断成功的状态
                code = authObj.GetUserName();
                //如果code值是0 证明成功获取用户名
                if (code == 0) {
                    document.getElementById("username").value = authObj.UserNameStr;
                } else {
                    message = superDog.reportStatus(code)
                }
            } else {
                this.dogNotPresent = true;
                message = superDog.reportStatus(isOpen);
            }
            this.htmlUserNotice(message);
            //Execute the check again after 2 seconds
            setTimeout(function () {
                this.openDog();
            }.bind(this), 2000);
        },
        //点击ie登陆
        handleIeLogin: function () {
            var self = this,
                authObj = this.authObj,
                pwd = document.getElementById("password").value,
                status,
                dogID, digest;
            //是否打开supperDog
            status = authObj.Open(this.scope, this.authCode);
            if (status != 0) {
                authObj.Close();
                this.htmlLoginNotice(superDog.reportStatus(status));
                return false;
            }
            //验证密码
            status = authObj.VerifyUserPin(pwd);
            if (status != 0) {
                authObj.Close();
                this.htmlLoginNotice(superDog.reportStatus(status));
                return false;
            }
            //获取DogID
            status = authObj.GetDogID();
            if (status != 0) {
                authObj.Close();
                this.htmlLoginNotice(superDog.reportStatus(status));
                return false;
            }
            dogID = authObj.DogIdStr;
            //获取challenge
            this.loadChallenge(function (challenge) {
                //获取digest
                status = authObj.GetDigest(challenge);
                if (status != 0) {
                    authObj.Close();
                    this.htmlLoginNotice(superDog.reportStatus(status));
                    return false;
                }
                digest = authObj.DigestStr;
                //发送给服务器验证    
                self.loadAuth(dogID, digest);
                //最后关闭
                authObj.Close();
            });

        },
        //chrome和firefox
        //监听
        onMessage: function () {
            var self = this;
            window.parent.addEventListener("message", function (event) {
                if (event.data.type == "SNTL_FROM_HOST") {
                    var ReturnText = event.data.text,
                        message;
                    //获取用户名
                    if ("GetUserNameEx" == ReturnText.InvokeMethod) {
                        //成功获取到用户名
                        if (ReturnText.Status == 0) {
                            self.dogNotPresent = false;
                            message = ""
                            document.getElementById("username").value = ReturnText.UserNameStr;
                        } else {
                            self.dogNotPresent = true;
                            message = superDog.reportStatus(parseInt(ReturnText.Status))
                            document.getElementById("username").value = "";
                        }
                        self.htmlUserNotice(message);
                    }
                    //点击登陆后的验证
                    else if ("GetDigestEx" == ReturnText.InvokeMethod) {
                        //密码经过superDog验证成功后
                        if (ReturnText.Status == 0) {
                            var dogID = ReturnText.DogIdStr,
                                digest = ReturnText.DigestStr;
                            //发送给服务器验证    
                            self.loadAuth(dogID, digest)
                        } else {
                            self.htmlLoginNotice(superDog.reportStatus(parseInt(ReturnText.Status)));
                        }
                    }
                }
                return;
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
        //点击Chrome登陆
        handleChromeLogin: function () {
            var self = this,
                pwd = document.getElementById("password").value;
            //如果没有插上supperDog
            if (this.dogNotPresent) {
                return false;
            }
            this.loadChallenge(function (challenge) {
                self.authObj.GetDigestEx(self.scope, self.authCode, pwd, challenge);
            });
        },

        //获取服务端随机生成的挑战数据
        loadChallenge: function (callback) {
            $.ajax({
                url: "./Config.aspx?func=getChallenge",
                type: "get",
                success: function (res) {
                    var challenge = res;
                    //挑战数据格式错误
                    if (challenge.toString().length < 32) {
                        return this.htmlLoginNotice(superDog.reportStatus(918));
                    }
                    callback(challenge);
                }
            })
        },
        //把从本机应用获取的 DogID 和加密的挑战数据发送给服务端。服务端的 verifyDigest()方法对数据进行比对。
        loadAuth: function (dogID, digest) {
            var self = this;
            $.ajax({
                url: "./Config.aspx?func=Authentication",
                type: "get",
                data: {
                    dogID: dogID,
                    digest: digest
                },
                success: function (res) {
                    var message = "";
                    //服务器返回的状态码为 0 成功
                    if (res == 0) {
                        console.log(res)
                    } else {
                        message = superDog.reportStatus(res);
                    }
                    self.htmlLoginNotice(message);
                }
            })
        },

        bin: function () {
            var self = this;
            this.createAuthCode();
            this.createAuthObj();

            //Chrome or Firefox
            if ((navigator.userAgent.indexOf("Chrome") > 0) || (navigator.userAgent.indexOf("Firefox") > 0)) {
                this.onMessage();
                this.getUser();
                document.querySelector('#submit').onclick = function () {
                    self.handleChromeLogin();
                }
            }
            //ie
            else {
                this.openDog();
                document.querySelector('#submit').onclick = function () {
                    self.handleIeLogin();
                }
            }
        }
    };
    main.bin();
</script>

</html>