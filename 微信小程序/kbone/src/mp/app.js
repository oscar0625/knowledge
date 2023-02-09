// 自定义 app.wxss
import "./app.css";

App({
  onLaunch: function (options) {
    // 小程序初始化完成时触发(全局只触发一次。)
    // options.scene  打开小程序的场景值
  },
  onShow: function (options) {
    // 小程序启动，或从后台进入前台显示时
    // 注意切换页面不会再次触发***
  },
  onHide: function () {
    // 小程序从前台进入后台时触发。
  },
  onError: function (msg) {
    // 小程序发生脚本错误，或者 api 调用失败时触发。
    console.log(msg);
  },
  onPageNotFound: function (options) {
    // // 小程序要打开的页面不存在时触发。
    // wx.redirectTo({
    //   // 如果是 tabbar 页面，请使用 wx.switchTab
    //   url: "pages/..."
    // });
  }
});
