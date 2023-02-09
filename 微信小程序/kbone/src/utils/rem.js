// rem配置
window.onload = function () {
  // 小程序
  if (process.env.isMiniprogram) {
    const fontSize = wx.getSystemInfoSync().screenWidth / 10;
    document.documentElement.style.fontSize = fontSize + "px";
  } else {
    // Web 端
    const fontSize =
      document.documentElement.getBoundingClientRect().width / 10;
    document.documentElement.style.fontSize = fontSize + "px";
  }
};
import Vue from "vue";
Vue.mixin({
  methods: {
    //路由定向方法
    pxtorem(num) {
      let fontSize;
      // 小程序
      if (process.env.isMiniprogram) {
        fontSize = wx.getSystemInfoSync().screenWidth / 10;
      } else {
        // Web 端
        fontSize = document.documentElement.getBoundingClientRect().width / 10;
      }
      // 设计稿为750
      return (num / 75) * fontSize;
    }
  }
});
