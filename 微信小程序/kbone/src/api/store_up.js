import myAxios from "@/utils/request";
export default {
  // 成果收藏
  achievementStore(params) {
    return myAxios.post("/api/achievement/setfacorite", params);
  },
  // 需求收藏
  demandStore(params) {
    return myAxios.post("/api/requirement/setfacorite", params);
  },
  // 案列收藏
  caseStore(params) {
    return myAxios.post("/api/typicalcase/setfacorite", params);
  },
  // 活动收藏
  activityStore(params) {
    return myAxios.post("/api/activity/setfacorite", params);
  },
  // 收藏的成果
  achievementList(params) {
    return myAxios.post("/api/myfacorites/myfacoriteachi", params);
  },
  // 收藏的需求
  demandList(params) {
    return myAxios.post("/api/myfacorites/myfacoritereq", params);
  },
  // 收藏的案例
  caseList(params) {
    return myAxios.post("/api/myfacorites/myfacoritetyp", params);
  },
  // 收藏的活动
  activityList(params) {
    return myAxios.post("/api/myfacorites/myfacoriteact", params);
  },
  // 删除
  delete(params) {
    return myAxios.post("/api/myfacorites/batchdelete", params);
  }
};
