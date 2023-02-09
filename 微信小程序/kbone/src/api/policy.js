import myAxios from "@/utils/request";
export default {
  // // 一、政策主页
  // // 政策
  // getTopPolicy() {
  //   return myAxios.get("/api/policy/getfirstpagepolicylist");
  // },
  // // 最新项目申报
  // getTopProjectDeclare() {
  //   return myAxios.get("/api/declaration/getfirstpagedeclarationlist");
  // },
  // // 项目公告
  // getTopProject() {
  //   return myAxios.post("/api/item/getfirstpageitemlist");
  // },
  // // 申报公示
  // getTopProjectPublicity() {
  //   return myAxios.get("/api/publicity/getfirstpagepublicitylist");
  // },
  // 二、政策列表页、详情页
  // 获取政策范围
  getPolicyRange() {
    return myAxios.get("/api/policy/getpolicyrange");
  },
  // 获取政策时间选项
  getPolicyTime() {
    return myAxios.get("/api/policy/gettimeoption");
  },
  // 获取政策需求方向
  getPolicyDirection() {
    return myAxios.get("/api/policy/getdirectionnew");
  },
  // 获取小程序最新政策
  getPolicyNewestList() {
    return myAxios.get("/api/policy/topitem");
  },
  // 获取政策通知
  getNoticeList(params) {
    return myAxios.post("/api/policy/getfontpolicylist", params);
  },
  getNoticeInfo(params) {
    const { id, type = 0 } = params;
    return myAxios.get("/api/policy/getpolicybyid?id=" + id + "&type=" + type);
  },
  // 获取政策解读
  getExplainList(params) {
    return myAxios.post(
      "/api/policydocumentation/getfontpolicydocumentationlist",
      params
    );
  },
  getExplainInfo(params) {
    const { id, type = 0 } = params;
    return myAxios.get(
      "/api/policydocumentation/getpolicydocumentationbyid?id=" +
        id +
        "&type=" +
        type
    );
  },
  // // 获取政策列表页推荐
  // getPolicyListRec() {
  //   return myAxios.get("/api/policy/policylistpagees");
  // },
  // 获取政策通知详情页推荐
  getPolicyNoticeInfoRec(params) {
    const { id } = params;
    return myAxios.get("/api/policy/policydetailpagees?id=" + id);
  },
  // 获取政策解读详情页推荐
  getPolicyExplainInfoRec(params) {
    const { id } = params;
    return myAxios.get(
      "/api/policydocumentation/policydocumentationdetailpagees?id=" + id
    );
  },

  // 三、项目列表页、详情页
  // 获取项目范围
  getProjectRange() {
    return myAxios.get("/api/item/getitemrange");
  },
  // 获取项目申报类型
  getProjectDeclaration() {
    return myAxios.get("/api/item/getdeclarationtype");
  },
  // 获取项目服务类型
  getProjectService() {
    return myAxios.get("/api/item/getitemservicetype");
  },
  // 获取小程序最新项目
  getProjectNewestList() {
    return myAxios.get("/api/item/topitem");
  },
  // 获取项目列表
  getProjectList(params) {
    return myAxios.post("/api/item/getfontitemlist", params);
  },
  // 获取项目详情
  getProjectInfo(params) {
    const { id, type = 0 } = params;
    return myAxios.get("/api/item/getitembyid?id=" + id + "&type=" + type);
  },
  // // 获取项目列表页推荐
  // getProjectListRec() {
  //   return myAxios.get("/api/item/itemlistpagees");
  // },
  // 获取项目详情页推荐
  getProjectInfoRec(params) {
    const { id } = params;
    return myAxios.get("/api/item/itemdetailpagees?id=" + id);
  },
  // 申报项目
  declareProject(params) {
    return myAxios.post("/api/declaration/adddeclaration", params);
  },
  declareProjectByName(params) {
    return myAxios.post("/api/declaration/addhotpushitemdeclaration", params);
  }
  // // 四、项目公示列表页
  // // 获取公示列表
  // getPublicityList(params) {
  //   return myAxios.post("/api/publicity/getfontpublicitylist", params);
  // },
  // // 获取公示列表推荐
  // getPublicityListRec() {
  //   return myAxios.get("/api/publicity/publicitylistpagees");
  // }
};
