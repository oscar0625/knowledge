import myAxios from "@/utils/request";
export default {
  // 获取成果列表
  getTechAchlist(params) {
    return myAxios.post("/api/achievement/retecachipp_es", params);
  },
  getProdAchlist(params) {
    return myAxios.post("/api/achievement/reproachipp_es", params);
  },
  // 获取需求列表
  getDemlist(params) {
    return myAxios.post("/api/requirement/getesrereqpp_es", params);
  }
};
