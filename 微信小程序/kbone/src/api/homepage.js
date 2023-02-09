import myAxios from "@/utils/request";
export default {
  getHotWord() {
    return myAxios.get("/api/requirement/getesword_es");
  },
  getTechAchlist(params) {
    return myAxios.post("/api/achievement/retecachi_es", params);
  },
  getProdAchlist(params) {
    return myAxios.post("/api/achievement/reproachi_es", params);
  },
  getDemlist(params) {
    return myAxios.post("/api/requirement/getesrereq_es", params);
  },
  searchGlobal(params) {
    return myAxios.post("/api/achievement/firstpagesearches", {
      database: 1,
      ...params
    });
  }
};
