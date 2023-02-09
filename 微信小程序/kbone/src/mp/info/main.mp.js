import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import store from "@/store";
import "@/utils/config"; // 通用配置

// 页面
import TechAchInfo from "@/views/info/tech_ach.vue";
import ProdAchInfo from "@/views/info/prod_ach.vue";
import DemandInfo from "@/views/info/demand.vue";
import ExpertInfo from "@/views/info/expert.vue";

Vue.use(VueRouter);

// 配置路由
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/techAchInfo",
      component: TechAchInfo
    },
    {
      path: "/prodAchInfo",
      component: ProdAchInfo
    },
    {
      path: "/demandInfo",
      component: DemandInfo
    },
    {
      path: "/expertInfo",
      component: ExpertInfo
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
