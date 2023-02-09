import myAxios from "@/utils/request";
export default {
  // 微信登录
  wxLogin(params) {
    return myAxios.post("/api/user/wxgettokenbycode", params);
  },
  // 手机登录
  telLogin(params) {
    return myAxios.post("/api/user/wxgettoken", params);
  },
  // 获取短信验证码
  getPin(params) {
    return myAxios.post("/api/User/SendSMSCode", params);
  },
  // 添加用户名
  addUserName(params) {
    return myAxios.post("/api/user/addwxaccountname", params);
  }
};
