import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import store from "@/store";
import "@/utils/config"; // 通用配置

// 页面
import Discover from "@/views/discover/index.vue";

Vue.use(VueRouter);

// 配置路由
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/", //tabBar 页面默认进入的 location.pathname 为 /
      redirect: "/discover"
    },
    {
      path: "/discover",
      component: Discover
    }
  ]
});

export default function createApp() {
  const container = document.createElement("div");
  container.id = "app";
  document.body.appendChild(container);

  Vue.config.productionTip = false;

  return new Vue({
    el: "#app",
    router,
    store,
    render: (h) => h(App)
  });
}
