// https://github.com/postcss/postcss
// https://postcss.docschina.org/doc/plugins.html
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 192, //代表根元素字体大小
      minPixelValue: 1, // 设置要替换的最小像素值。如果为2的话，小于2px不会被替换
      propList: ["*"], // 适用css属性名单
      selectorBlackList: [], // 与propList相反黑名单
      mediaQuery: false // 媒体查询里的单位是否需要转换单位
    }
  }
};
