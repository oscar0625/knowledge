import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import store from "@/store";
import "@/utils/config"; // 通用配置

import { cookies } from "@/utils/public";

// 页面
import UserInformation from "@/views/user_center/information.vue";

import UserIssueList from "@/views/user_center/data_manage/index.vue";
import UserIssueTech from "@/views/user_center/data_manage/issue_tech.vue";
import UserIssueProd from "@/views/user_center/data_manage/issue_prod.vue";
import UserIssueDem from "@/views/user_center/data_manage/issue_dem.vue";

import UserDockingList from "@/views/user_center/docking_manage/index.vue";
import UserDockingInfo from "@/views/user_center/docking_manage/info/index.vue";

import UserMatch from "@/views/user_center/match/index.vue";
import UserMatchList from "@/views/user_center/match/list.vue";

import UserCer from "@/views/user_center/certification/index.vue";
import UserIssuePerCer from "@/views/user_center/certification/issue_per.vue";
import UserIssueComCer from "@/views/user_center/certification/issue_com.vue";

import UserNotificationList from "@/views/user_center/notification_manage/index.vue";
import UserNotificationInfo from "@/views/user_center/notification_manage/info/index.vue";

import AboutUs from "@/views/user_center/about_us.vue";
import StoreUp from "@/views/user_center/store_up.vue";
Vue.use(VueRouter);

// 配置路由
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/userInformation",
      component: UserInformation
    },
    {
      path: "/userIssueList/:type",
      component: UserIssueList
    },
    {
      path: "/userIssueTech/:method",
      component: UserIssueTech
    },
    {
      path: "/userIssueProd/:method",
      component: UserIssueProd
    },
    {
      path: "/userIssueDem/:method",
      component: UserIssueDem
    },
    {
      path: "/userDockingList/:type",
      component: UserDockingList
    },
    {
      path: "/userDockingInfo/:type",
      component: UserDockingInfo
    },
    {
      path: "/userMatch",
      component: UserMatch
    },
    {
      path: "/userMatchList",
      component: UserMatchList
    },
    {
      path: "/userCer",
      component: UserCer
    },
    {
      path: "/userIssuePerCer/:method",
      component: UserIssuePerCer
    },
    {
      path: "/userIssueComCer/:method",
      component: UserIssueComCer
    },
    {
      path: "/userNotificationList",
      component: UserNotificationList
    },
    {
      path: "/userNotificationInfo",
      component: UserNotificationInfo
    },
    {
      path: "/aboutUs",
      component: AboutUs
    },
    {
      path: "/storeUp",
      component: StoreUp
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
