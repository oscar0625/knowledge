import myAxios from "@/utils/request";
export default {
  // 获取消息列表
  getNotificationlist(params) {
    return myAxios.post("/api/message/getfrontmessagelist", params);
  },
  // 批量删除
  batchDelete(params) {
    return myAxios.post("/api/message/frontbatchdelete", params);
  },
  // 标为已读
  markRead(params) {
    return myAxios.post("/api/message/batchmark", params);
  },
  // 获取消息详细信息
  getNotificationInfo(params) {
    const { id } = params;
    return myAxios.get("/api/message/getmessagequeuebyid?id=" + id);
  }
};
