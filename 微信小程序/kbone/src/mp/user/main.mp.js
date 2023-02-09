import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import store from "@/store";
import "@/utils/config"; // 通用配置

import { cookies } from "@/utils/public";

// 页面
import User from "@/views/user/index.vue";

Vue.use(VueRouter);

// 配置路由
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/", //tabBar 页面默认进入的 location.pathname 为 /
      redirect: "/user"
    },
    {
      path: "/user",
      component: User
    }
  ]
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const hasToken = cookies.get("token");
  if (hasToken) {
    next();
  } else {
    // 小程序端
    if (process.env.isMiniprogram) {
      location.href = "/login?path=" + to.fullPath;
    } else {
      next({ path: "/login", query: { path: to.fullPath } });
    }
  }
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
