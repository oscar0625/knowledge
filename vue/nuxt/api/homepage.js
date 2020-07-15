export default function ($axios) {
  return {
    getBanner(params) {
      return $axios.post("/commonApi/api/BannerInfo/GetFontBanner", params);
    },
    getCourseList(params) {
      return $axios.post(
        "/commonApi/api/CourseInfo/GetHomePageCourseList",
        params
      );
    }
  };
}
