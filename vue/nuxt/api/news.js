export default function ($axios) {
  return {
    getNewsType() {
      return $axios.get(`/commonApi/api/News/GetNewsType`);
    },
    getNewsInfo(params) {
      const { id } = params;
      return $axios.get(`/commonApi/api/News/GetNewsById?Id=` + id);
    },
    getNewsTop() {
      return $axios.get(`/commonApi/api/News/GetTopNews?top=4`);
    },
    getNewsList(params) {
      return $axios.post(`/commonApi/api/News/GetFrontNewsPaging`, params);
    }
  };
}
