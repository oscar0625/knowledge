import myAxios from "@/utils/request";
export default {
  // 创新活动
  getActivityRecommend() {
    return myAxios.get("/api/news/getfrontactpagingnew");
  },
  getActivitylist(params) {
    return myAxios.post("/api/news/getfrontactpaging", params);
  },
  getCooperatorlist() {
    return myAxios.get("/api/news/topactjoininfo");
  },
  getActivityInfo(params) {
    const { id, type = 0 } = params;
    return myAxios.get("/api/news/getactivityinfo?id=" + id + "&type=" + type);
  },
  applyActivity(params) {
    return myAxios.post("/api/news/onlinejoinact", params);
  },
  // 公告
  getNoticeList(params) {
    return myAxios.post("/api/news/topnoticepaging", params);
  },
  // 获取小程序最新新闻
  getNewsNewestList() {
    return myAxios.get("/api/news/topnewsxcx");
  },
  // 新闻
  getNewsList(params) {
    return myAxios.post("/api/news/topnewspaging", params);
  },
  getNewsInfo(params) {
    const { id } = params;
    return myAxios.get("/api/news/getnewsinfo?id=" + id);
  },
  getNewsRecommend(params) {
    return myAxios.post("/api/news/newsrecommend", params);
  },
  getNoticeRecommend(params) {
    return myAxios.post("/api/news/ggrecommend", params);
  }
};
