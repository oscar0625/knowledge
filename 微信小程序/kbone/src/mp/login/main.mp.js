import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import store from "@/store";
import "@/utils/config"; // 通用配置

// 页面
import Login from "@/views/login/index.vue";
import Choice from "@/views/login/choice.vue";
import Phone from "@/views/login/phone.vue";
import Username from "@/views/login/username.vue";

Vue.use(VueRouter);

// 配置路由
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/login",
      component: Login,
      children: [
        {
          path: "",
          redirect: "choice"
        },
        {
          path: "choice",
          component: Choice
        },
        {
          path: "phone",
          component: Phone
        },
        {
          path: "username",
          component: Username
        }
      ]
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
