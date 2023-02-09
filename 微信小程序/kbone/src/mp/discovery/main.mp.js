import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import store from "@/store";
import "@/utils/config"; // 通用配置

// 页面
import DiscoverySearch from "@/views/discovery/search.vue";
import ActivityList from "@/views/discovery/activity/index.vue";
import ActivityInfo from "@/views/discovery/activity/info.vue";
import PolicyList from "@/views/discovery/policy/index.vue";
import PolicyInfo from "@/views/discovery/policy/info.vue";
import ProjectList from "@/views/discovery/project/index.vue";
import ProjectInfo from "@/views/discovery/project/info.vue";
import NewsList from "@/views/discovery/news/index.vue";
import NewsInfo from "@/views/discovery/news/info.vue";

Vue.use(VueRouter);

// 配置路由
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/discoverySearch",
      redirect: "/discoverySearch/policy"
    },
    {
      path: "/discoverySearch/:type",
      component: DiscoverySearch
    },
    {
      path: "/activityList",
      component: ActivityList
    },
    {
      path: "/activityInfo",
      component: ActivityInfo
    },
    {
      path: "/policyList",
      component: PolicyList
    },
    {
      path: "/policyInfo/:type",
      component: PolicyInfo
    },
    {
      path: "/projectList",
      component: ProjectList
    },
    {
      path: "/projectInfo",
      component: ProjectInfo
    },
    {
      path: "/newsList",
      component: NewsList
    },
    {
      path: "/newsInfo",
      component: NewsInfo
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
