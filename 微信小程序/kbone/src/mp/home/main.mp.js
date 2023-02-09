import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import store from "@/store";
import "@/utils/config"; // 通用配置

// 页面
import Home from "@/views/home/index.vue";

Vue.use(VueRouter);

// 配置路由
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/", //tabBar 页面默认进入的 location.pathname 为 /
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/index.html",
      redirect: "/home"
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
