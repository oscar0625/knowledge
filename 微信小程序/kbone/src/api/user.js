import myAxios from "@/utils/request";

export default {
  // 工信部适用
  // 获取用户信息（带认证信息）
  getUserInfo() {
    return myAxios.get("/api/user/userinfobytoken");
  },
  // 修改用户姓名
  updateUsername(params) {
    return myAxios.post("/api/User/UpdateUserName", params);
  },
  // 修改用户邮箱 待修改
  updateUserEmail(params) {
    return myAxios.post("/api/User/UpdateUserName", params);
  },
  // 修改密码
  updatePassword(params) {
    return myAxios.post("/api/User/ModifyPWD", params);
  },
  // 找回密码
  retrievePassword(params) {
    return myAxios.post("/api/User/FindPWD", params);
  },
  // 获取短信验证码
  getPin(params) {
    return myAxios.post("/api/User/SendSMSCode", params);
  },
  // 根据登录用户token获取短信验证码
  getPinByToken(params) {
    return myAxios.post("/api/User/SendSMSCodeByToken", params);
  },
  // 修改为新手机号前 验证老手机短信验证码
  checkOldPhonePin(params) {
    return myAxios.post("/api/User/CheckSMSCodeByToken", params);
  },
  // 修改用户手机号
  updateUserPhone(params) {
    return myAxios.post("/api/User/ModifyPhoneNumber", params);
  }
};
