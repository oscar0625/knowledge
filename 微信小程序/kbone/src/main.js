import Vue from "vue";
import App from "@/App.vue";
import router from "@/router/web.js";
import store from "@/store";
import "@/utils/config"; // 通用配置

import KBoneUI from "kbone-ui"; // web端引入完整 kbone-ui
// import KBoneUI from 'kbone-ui/wx-components' //  web端只引入内置组件

KBoneUI.register();

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App)
});
