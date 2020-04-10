/******************************************************************************
Function: sendRequest
Parameters: url
Return: response text
Description: Send XMLHttpRequest get challenge.
******************************************************************************/
function sendRequest(url) {
    var httpRequest;

    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else {
        // IE
        try {
            httpRequest = new ActiveXObject("Msxm12.XMLHTTP");
        } catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!httpRequest) {
        return false;
    }
    httpRequest.open('POST', url, false);
    httpRequest.send(null);
    return httpRequest.responseText;
}
var superDog = {
    //状态码
    reportStatus: function (status) {
        var text = "Unknown status code";
        switch (status) {
            case 0:
                text = "Success";
                break;
            case 1:
                text = "Request exceeds data file range";
                break;
            case 3:
                text = "System is out of memory";
                break;
            case 4:
                text = "Too many open login sessions";
                break;
            case 5:
                text = "Access denied";
                break;
            case 7:
                text = "Required SuperDog not found";
                break;
            case 8:
                text = "Encryption/decryption data length is too short";
                break;
            case 9:
                text = "Invalid input handle";
                break;
            case 10:
                text = "Specified File ID not recognized by API";
                break;
            case 15:
                text = "Invalid XML format";
                break;
            case 18:
                text = "SuperDog to be updated not found";
                break;
            case 19:
                text = "Invalid update data";
                break;
            case 20:
                text = "Update not supported by SuperDog";
                break;
            case 21:
                text = "Update counter is set incorrectly";
                break;
            case 22:
                text = "Invalid Vendor Code passed";
                break;
            case 24:
                text = "Passed time value is outside supported value range";
                break;
            case 26:
                text = "Acknowledge data requested by the update, however the ack_data input parameter is NULL";
                break;
            case 27:
                text = "Program running on a terminal server";
                break;
            case 29:
                text = "Unknown algorithm used in V2C file";
                break;
            case 30:
                text = "Signature verification failed";
                break;
            case 31:
                text = "Requested Feature not available";
                break;
            case 33:
                text = "Communication error between API and local SuperDog License Manager";
                break;
            case 34:
                text = "Vendor Code not recognized by API";
                break;
            case 35:
                text = "Invalid XML specification";
                break;
            case 36:
                text = "Invalid XML scope";
                break;
            case 37:
                text = "Too many SuperDog currently connected";
                break;
            case 39:
                text = "Session was interrupted";
                break;
            case 41:
                text = "Feature has expired";
                break;
            case 42:
                text = "SuperDog License Manager version too old";
                break;
            case 43:
                text = "USB error occurred when communicating with a SuperDog";
                break;
            case 45:
                text = "System time has been tampered with";
                break;
            case 46:
                text = "Communication error occurred in secure channel";
                break;
            case 50:
                text = "Unable to locate a Feature matching the scope";
                break;
            case 54:
                text = "The values of the update counter in the file are lower than those in the SuperDog";
                break;
            case 55:
                text = "The first value of the update counter in the file is greater than the value in the SuperDog";
                break;
            case 400:
                text = "Unable to locate dynamic library for API";
                break;
            case 401:
                text = "Dynamic library for API is invalid";
                break;
            case 500:
                text = "Object incorrectly initialized";
                break;
            case 501:
                text = "Invalid function parameter";
                break;
            case 502:
                text = "Logging in twice to the same object";
                break;
            case 503:
                text = "Logging out twice of the same object";
                break;
            case 525:
                text = "Incorrect use of system or platform";
                break;
            case 698:
                text = "Requested function not implemented";
                break;
            case 699:
                text = "Internal error occurred in API";
                break;
            case 802:
                text = "Parameter error";
                break;
            case 803:
                text = "Verify password failed";
                break;
            case 804:
                text = "Modify password failed";
                break;
            case 810:
                text = "Password's length is wrong";
                break;
            case 811:
                text = "Name's length is wrong";
                break;
            case 812:
                text = "Info's length is wrong";
                break;
            case 813:
                text = "Name's length is wrong";
                break;
            case 814:
                text = "Parameter error";
                break;
            case 820:
                text = "Hardware internal error!";
                break;
            case 821:
                text = "Parameter error";
                break;
            case 822:
                text = "Need to verify Password";
                break;
            case 823:
                text = "Verify password failed";
                break;
            case 824:
                text = "Need to initialize";
                break;
            case 825:
                text = "Password has been locked";
                break;
            case 831:
                text = "Verify password failed, you still have 14 chances";
                break;
            case 832:
                text = "Verify password failed, you still have 13 chances";
                break;
            case 833:
                text = "Verify password failed, you still have 12 chances";
                break;
            case 834:
                text = "Verify password failed, you still have 11 chances";
                break;
            case 835:
                text = "Verify password failed, you still have 10 chances";
                break;
            case 836:
                text = "Verify password failed, you still have 9 chances";
                break;
            case 837:
                text = "Verify password failed, you still have 8 chances";
                break;
            case 838:
                text = "Verify password failed, you still have 7 chances";
                break;
            case 839:
                text = "Verify password failed, you still have 6 chances";
                break;
            case 840:
                text = "Verify password failed, you still have 5 chances";
                break;
            case 841:
                text = "Verify password failed, you still have 4 chances";
                break;
            case 842:
                text = "Verify password failed, you still have 3 chances";
                break;
            case 843:
                text = "Verify password failed, you still have 2 chances";
                break;
            case 844:
                text = "Verify password failed, you still have 1 chance";
                break;
            case 845:
                text = "Password has been locked";
                break;
            case 901:
                text = "Authenticate failed";
                break;
            case 902:
                text = "Generate challenge string failed";
                break;
            case 903:
                text = "Name is illegal";
                break;
            case 904:
                text = "Please enter your password";
                break;
            case 905:
                text = "Password's length should be between 6-16 characters";
                break;
            case 906:
                text = "Password is illegal";
                break;
            case 907:
                text = "Please enter your user name";
                break;
            case 908:
                text = "Please enter your confirm password";
                break;
            case 909:
                text = "Confirm password's length should be between 6-16 characters";
                break;
            case 910:
                text = "Password is illegal";
                break;
            case 911:
                text = "Passwords do not match";
                break;
            case 912:
                text = "Please enter your current password";
                break;
            case 913:
                text = "Please enter your new password";
                break;
            case 914:
                text = "Name length should be between 1-32 characters";
                break;
            case 915:
                text = "The SuperDog has been registered";
                break;
            case 916:
                text = "no dog_auth_srv in java.library.path";
                break;
            case 917:
                text = "Fail to get challenge";
                break;
            case 918:
                text = "Fail to get challenge";
                break;
            case 919:
                text = "Cannot find session file! Please confirm you have created session folder and set the folder path!";
                break;
            case 920:
                text = "Fail to load the library: dog_auth_srv_php.dll! Please confirm that your configuration file is right.";
                break;

        }
        return text
    },
    //获取认证代码
    getAuthCode: function () {
        var authCode = sendRequest("./Config.aspx?func=getAuthCode");
        return "" + authCode + "";
    },
    //获取权限对象
    getAuthObject: function () {
        var objAuth;
        if (window.ActiveXObject || "ActiveXObject" in window) //IE
        {
            objAuth = document.getElementById("AuthIE");
        } else if ((navigator.userAgent.indexOf("Chrome") > 0) || (navigator.userAgent.indexOf("Firefox") > 0)) {
            AuthObject = this.AuthObject;
            objAuth = new AuthObject();
        } else {
            objAuth = document.getElementById("AuthNoIE");
        }
        return objAuth;
    },
    AuthObject: function () {
        if (typeof AuthObject._initialized == "undefined") {
            // GetUserNameEx
            AuthObject.prototype.GetUserNameEx = function (scope, authCode) {
                //console.log("enter GetUserNameEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "GetUserNameEx",
                        "Scope": scope,
                        "AuthCode": authCode
                    }
                }, "*");
                return 0;
            };
            // GetDigestEx
            AuthObject.prototype.GetDigestEx = function (scope, authCode, password, challenge) {
                //console.log("enter GetDigestEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "GetDigestEx",
                        "Scope": scope,
                        "AuthCode": authCode,
                        "UserPin": password,
                        "Challenge": challenge
                    }
                }, "*");
                return 0;
            };
            // RegisterUserEx   
            AuthObject.prototype.RegisterUserEx = function (scope, authCode, username, password) {
                //console.log("enter RegisterUserEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "RegisterUserEx",
                        "Scope": scope,
                        "AuthCode": authCode,
                        "Name": username,
                        "UserPin": password
                    }
                }, "*");
                return 0;
            };
            // ChangeUserPinEx
            AuthObject.prototype.ChangeUserPinEx = function (scope, authCode, oldPassword, newPassword) {
                //console.log("enter ChangeUserPinEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "ChangeUserPinEx",
                        "Scope": scope,
                        "AuthCode": authCode,
                        "OldPin": oldPassword,
                        "NewPin": newPassword
                    }
                }, "*");
                return 0;
            };
            // SetUserDataEx
            AuthObject.prototype.SetUserDataEx = function (scope, authCode, password, type, offset, data) {
                //console.log("enter SetUserDataEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "SetUserDataEx",
                        "Scope": scope,
                        "AuthCode": authCode,
                        "UserPin": password,
                        "Type": type,
                        "Offset": offset,
                        "Data": data
                    }
                }, "*");
                return 0;
            };
            // GetUserDataEx
            AuthObject.prototype.GetUserDataEx = function (scope, authCode, type, offset, size) {
                //console.log("enter GetUserDataEx()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "GetUserDataEx",
                        "Scope": scope,
                        "AuthCode": authCode,
                        "Type": type,
                        "Offset": offset,
                        "Size": size
                    }
                }, "*");
                return 0;
            };
            // EnumDog
            AuthObject.prototype.EnumDog = function (authCode) {
                //console.log("enter EnumDog()");
                window.parent.postMessage({
                    type: "SNTL_FROM_PAGE",
                    text: {
                        "InvokeMethod": "EnumDog",
                        "AuthCode": authCode
                    }
                }, "*");
                return 0;
            };
            AuthObject._initialized = true;
        }
    }
}
var login = {
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
                self.htmlLoginNotice(superDog.reportStatus(status));
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
        var self = this;
        $.ajax({
            url: "./Config.aspx?func=getChallenge",
            type: "get",
            success: function (res) {
                var challenge = res;
                //挑战数据格式错误
                if (challenge.toString().length < 32) {
                    return self.htmlLoginNotice(superDog.reportStatus(918));
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
var register = {
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
    //当前superDog中的用户名
    nameInDog: "",
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
    handleIeRegister: function () {
        var self = this,
            authObj = this.authObj,
            name = document.getElementById("username").value,
            pwd1 = document.getElementById("password1").value,
            pwd2 = document.getElementById("password2").value,
            usrName,
            status,
            dogID, digest;
        //是否打开supperDog
        status = authObj.Open(this.scope, this.authCode);
        if (status != 0) {
            authObj.Close();
            this.htmlLoginNotice(superDog.reportStatus(status));
            return false;
        }
        //从supperDog中获取usrName 判断其是否已经有name
        status = authObj.GetUserName();;
        if (status != 0) {
            authObj.Close();
            this.htmlLoginNotice(superDog.reportStatus(status));
            return false;
        }
        usrName = authObj.UserNameStr;
        if (usrName != "") {
            authObj.Close();
            this.htmlLoginNotice(superDog.reportStatus(915));
            return false;
        }
        //验证一个新的超级狗必须
        status = authObj.VerifyUserPin("12345678");
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
                self.htmlLoginNotice(superDog.reportStatus(status));
                return false;
            }
            digest = authObj.DigestStr;
            //发送给服务器验证    
            self.loadAuth(dogID, digest, function () {
                status = authObj.RegisterUser(name, pwd1);
                if (status != 0) {
                    authObj.Close();
                    self.htmlLoginNotice(superDog.reportStatus(status));
                    return false;
                }
                alert("Register User Successful!");
                authObj.Close();
            });
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
                if ("GetUserNameEx" == ReturnText.InvokeMethod) {
                    //获取用户名
                    if (ReturnText.Status == 0) {
                        self.dogNotPresent = false;
                        self.nameInDog = ReturnText.UserNameStr;
                        message = "";
                    } else {
                        self.dogNotPresent = true;
                        self.nameInDog = "";
                        message = superDog.reportStatus(parseInt(ReturnText.Status))
                    }
                    self.htmlUserNotice(message);
                } else if ("RegisterUserEx" == ReturnText.InvokeMethod) {
                    //将注册信息写入到超级狗后
                    if (ReturnText.Status == 0) {
                        alert("Register User Successful!");
                    } else {
                        //回滚数据库
                        self.htmlLoginNotice(superDog.reportStatus(parseInt(ReturnText.Status)));
                    }
                } else if ("GetDigestEx" == ReturnText.InvokeMethod) {
                    //密码经过superDog处理成功后
                    if (ReturnText.Status == 0) {
                        var dogID = ReturnText.DogIdStr,
                            digest = ReturnText.DigestStr;
                        //发送给服务器验证    
                        self.loadAuth(dogID, digest, function () {
                            self.bindUserInfo();
                        });
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
    //将注册信息写入到超级狗里
    bindUserInfo: function () {
        var name = document.getElementById("username").value,
            pwd1 = document.getElementById("password1").value,
            pwd2 = document.getElementById("password2").value;
        this.authObj.RegisterUserEx(this.scope, this.authCode, name, pwd1);
    },
    handleChromeRegister: function () {
        var self = this;
        //如果没有插上supperDog
        if (this.dogNotPresent) {
            return false;
        }
        //如果supperDog中已经有注册的用户名
        if (this.nameInDog != "") {
            this.htmlLoginNotice(superDog.reportStatus(915));
            return false;
        }
        this.loadChallenge(function (challenge) {
            //注册在superdog的初始密码是12345678
            self.authObj.GetDigestEx(self.scope, self.authCode, "12345678", challenge);
        });
    },

    //获取服务端随机生成的挑战数据
    loadChallenge: function (callback) {
        var self = this;
        $.ajax({
            url: "./Config.aspx?func=getChallenge",
            type: "get",
            success: function (res) {
                var challenge = res;
                //挑战数据格式错误
                if (challenge.toString().length < 32) {
                    return self.htmlLoginNotice(superDog.reportStatus(918));
                }
                callback(challenge);
            }
        })
    },
    //把从本机应用获取的 DogID 和加密的挑战数据发送给服务端。服务端的 verifyDigest()方法对数据进行比对。
    loadAuth: function (dogID, digest, callback) {
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
                    console.log(res);
                    callback();
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
            document.querySelector('#register').onclick = function () {
                self.handleChromeRegister();
            }
        }
        //ie
        else {
            document.querySelector('#register').onclick = function () {
                self.handleIeRegister();
            }
        }
    }
};
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