import myAxios from "@/utils/request";
export default {
  // 添加普通企业认证
  addCer(params) {
    return myAxios.post("/api/user/frontaddcom", params);
  },
  // 修改普通企业认证
  modifyCer(params) {
    return myAxios.post("/api/user/frontaddcom", params);
  },
  // 获取普通企业认证信息
  getCerInfo(params) {
    const { id } = params;
    return myAxios.get("/api/user/comcertificateinfo?id=" + id);
  },
  // 添加个人认证
  addPerCer(params) {
    return myAxios.post("/api/user/frontaddpersonal", params);
  },
  // 修改个人认证
  modifyPerCer(params) {
    return myAxios.post("/api/user/frontaddpersonal", params);
  },
  // 获取个人认证信息
  getPerCerInfo(params) {
    const { id } = params;
    return myAxios.get("/api/user/percertificateinfo?id=" + id);
  }
};
