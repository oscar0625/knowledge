import myAxios from "@/utils/request";
export default {
  // 获取成果列表
  getTechAchlist(params) {
    return myAxios.post("/api/achievement/getesachvdatalist", {
      dataBase: 1,
      foudation_from: "",
      foudation_to: "",
      order: 1,
      ...params
    });
  },
  getProdAchlist(params) {
    return myAxios.post("/api/achievement/getesachvdatalist", {
      dataBase: 2,
      foudation_from: "",
      foudation_to: "",
      order: 1,
      ...params
    });
  },
  // 获取资源主页 专家列表
  getExpertList(params) {
    const { name, pageIndex, pageSize } = params;
    return myAxios.post("/api/specialist/gettopspecialist_xcx", {
      keyWord: name,
      pageIndex,
      pageSize
    });
  },
  // 获取成果详细信息
  getAchInfo(params) {
    const { id, type = 0 } = params;
    return myAxios.get(
      "/api/achievement/getachibyid_im?id=" + id + "&type=" + type
    );
  },
  // 获取专家详细信息
  getExpertInfo(params) {
    const { id } = params;
    return myAxios.get("/api/specialist/getinfo?id=" + id);
  },
  // 添加/修改技术成果详情
  addTechAch(params) {
    return myAxios.post("/api/achievement/topaddachi_im", {
      ...params,
      type: 1
    });
  },
  // 添加/修改产品成果详情
  addProdAch(params) {
    return myAxios.post("/api/achievement/topaddachi_im", {
      ...params,
      type: 2
    });
  },
  // 获取发布的科技成果
  getIssueList(params) {
    return myAxios.post("/api/achievement/topachipaging", params);
  },
  // 批量删除
  batchDelete(params) {
    return myAxios.post("/api/achievement/fronntbatchdelete", params);
  }
};
