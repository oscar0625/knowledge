import myAxios from "@/utils/request";
export default {
  // 获取专业领域（技术类成果+需求）
  getField() {
    return myAxios.get("/api/achievement/getimspecialfield");
  },
  // 获取专业领域（产品类成果）
  getProdField() {
    return myAxios.get("/api/achievement/getimproductfield");
  },
  // 获取区域
  getArea() {
    return myAxios.get("/api/achievement/getgxbarea");
  },
  // 获取区域包含全国
  getAreaAll() {
    return myAxios.get("/api/achievement/getgxbpolicyarea");
  }
};
