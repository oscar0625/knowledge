export default function ($axios) {
  return {
    getNews() {
      return $axios.get(`/commonApi/api/News/GetTopNews?top=4`);
    }
  };
}
