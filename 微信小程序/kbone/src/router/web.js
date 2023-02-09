import Vue from "vue";
import VueRouter from "vue-router";

// 页面
import Home from "@/views/home/index.vue";
import Search from "@/views/search/index.vue";
// 资源
import Resource from "@/views/resource/index.vue";
import TechAchInfo from "@/views/info/tech_ach.vue";
import ProdAchInfo from "@/views/info/prod_ach.vue";
import DemandInfo from "@/views/info/demand.vue";
import ExpertInfo from "@/views/info/expert.vue";
// 发现模块
import Discover from "@/views/discover/index.vue";
import DiscoverySearch from "@/views/discovery/search.vue";
import ActivityList from "@/views/discovery/activity/index.vue";
import ActivityInfo from "@/views/discovery/activity/info.vue";
import PolicyList from "@/views/discovery/policy/index.vue";
import PolicyInfo from "@/views/discovery/policy/info.vue";
import ProjectList from "@/views/discovery/project/index.vue";
import ProjectInfo from "@/views/discovery/project/info.vue";
import NewsList from "@/views/discovery/news/index.vue";
import NewsInfo from "@/views/discovery/news/info.vue";
// 用户
import Login from "@/views/login/index.vue";
import Choice from "@/views/login/choice.vue";
import Phone from "@/views/login/phone.vue";
import Username from "@/views/login/username.vue";
import User from "@/views/user/index.vue";
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

export default new VueRouter({
  mode: "history",
  routes: [
    // 首页
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/index.html",
      redirect: "/home"
    },
    {
      path: "/search/:type?",
      component: Search
    },
    // 资源
    {
      path: "/resource/:type?",
      component: Resource
    },
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
    },
    // 发现
    {
      path: "/discover",
      component: Discover
    },
    {
      path: "/discoverySearch/:type?",
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
    },
    // 用户中心
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
    },
    {
      path: "/user",
      component: User
    },
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
    },

    // 404返回
    {
      path: "*",
      redirect: "/404"
    },
    {
      path: "/404",
      component: Home
    }
  ]
});
