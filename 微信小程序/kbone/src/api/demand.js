import myAxios from "@/utils/request";
export default {
  // 获取需求列表
  getDemlist(params) {
    return myAxios.post("/api/requirement/getesreqdatalist", {
      dataBase: 1,
      foudation_from: "",
      foudation_to: "",
      order: 1,
      ...params
    });
  },
  // 获取需求详细信息
  getDemInfo(params) {
    const { id, type = 0 } = params;
    return myAxios.get(
      "/api/requirement/getreqbyid_im?id=" + id + "&type=" + type
    );
  },
  // 添加/修改需求详情
  addDem(params) {
    return myAxios.post("/api/requirement/topaddreq_im", params);
  },
  // 获取发布的民用需求
  getIssueList(params) {
    return myAxios.post("/api/requirement/topreqpaging", params);
  },
  // 批量删除
  batchDelete(params) {
    return myAxios.post("/api/requirement/fronntbatchdelete", params);
  }
};
