import myAxios from "@/utils/request";

export default {
  // 获取用户创建的工程列表(简易版)
  getUserProjectList(params) {
    return myAxios.post("/api/project/getsimpleprojectlist", params);
  },
  // 获取用户创建的工程列表(个人中心使用)
  getUserProjectListPro(params) {
    return myAxios.post("/api/project/getcomplexprojectlist", params);
  },
  // 创建工程
  createProject(params) {
    return myAxios.post("/api/project/addbymodel_rtat", params);
  },
  // 删除工程
  deleteProject(params) {
    const { id } = params;
    return myAxios.get("/api/project/deletesinglebyid?projectId=" + id);
  },
  // 关联工程
  relateData(params) {
    return myAxios.post("/api/project/updaterelation_rtat", params);
  },
  // 对接工程
  dockingProject(params) {
    return myAxios.post("/api/project/adddetailtorelation_rtat", params);
  },
  // 获取工程详情
  getProjectInfo(params) {
    const { id } = params;
    return myAxios.get("/api/project/getprodockingprogress?projectId=" + id);
  },
  // 获取需求工程下的对接成果信息列表
  getAchProjectInfo(params) {
    const { id } = params;
    return myAxios.get("/api/project/getprojectachvdetail?projectId=" + id);
  },
  // 获取成果工程下的对接需求信息列表
  getDemProjectInfo(params) {
    const { id } = params;
    return myAxios.get("/api/project/getprojectreqdetail?projectId=" + id);
  },
  // 开始对接
  startDocking(params) {
    const { id } = params;
    return myAxios.get("/api/project/startdocking_rtat?projectId=" + id);
  },
  // 关闭对接
  closeDocking(params) {
    const { id } = params;
    return myAxios.get("/api/project/closedocking_rtat?projectId=" + id);
  },
  // 删除工程中的成果或需求
  deleleDateInProject(params) {
    return myAxios.post("/api/project/removedetailfromrelation_rtat", params);
  }
};
