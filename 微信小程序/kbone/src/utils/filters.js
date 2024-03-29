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
/** 将数字四舍五入保留到N位小数
 * @param {string|number} num 要处理的数字
 * @param {number} n 保留的小数位数 0-20
 * @return {string}
 */
Vue.filter("keepDecimal", function (num, n) {
  const times = Math.pow(10, n);
  return (Math.round(num * times) / times).toFixed(n);
});
