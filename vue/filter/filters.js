import Vue from "vue";
// 字符串长度过滤
Vue.filter("lengthFilter", function (value, length) {
  if (typeof value !== "string") return "";
  return value.length > length ? value.slice(0, length) + "..." : value;
});
// 字符串过滤掉html标签
Vue.filter("htmlTagFilter", function (value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, "")
    .replace(/&[a-zA-Z]+;/g, "");
});
// 从日期字符串提取出年月日 2019-12-08T00:00:00 => 2019-12-08
Vue.filter("dateFilter", function (value) {
  if (typeof value !== "string") return "";
  return value.split("T")[0];
});
// 从日期字符串提取出年月日 2019-12-08 00:00:00 => 2019-12-08
Vue.filter("dateFilterSpace", function (value) {
  if (typeof value !== "string") return "";
  return value.split(/\s+/)[0];
});
// 手机号保密过滤 13888888888 => 138****8888
Vue.filter("phoneSecretFilter", function (value) {
  if (typeof value !== "string") return "";
  return value.slice(0, 3) + "****" + value.slice(7);
});
