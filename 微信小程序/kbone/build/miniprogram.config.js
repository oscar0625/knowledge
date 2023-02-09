const path = require("path");
/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */

module.exports = {
  origin: "https://test.miniprogram.com",
  // 路由入口
  entry: "/",
  // 多页配置
  // 页面路由，用于页面间跳转。其值是一个以页面名称作为 key 的对象，每项的值是该页面可以响应的路由。
  // 所有跳转的路由必须包含 如果不包含则无跳转效果
  router: {
    // 选项卡部分页面
    // 由于tabBar存在 在切换时只能跳转到其首页面
    home: ["/", "/index.html", "/home"],
    resource: [
      "/resource",
      "/resource/techAch",
      "/resource/prodAch",
      "/resource/demand",
      "/resource/expert"
    ],
    discover: ["/discover"],
    user: ["/user"],
    // 非选项卡部分
    search: ["/search", "/search/techAch", "/search/prodAch", "/search/demand"],
    info: ["/techAchInfo", "/prodAchInfo", "/demandInfo", "/expertInfo"],
    discovery: [
      // 搜索
      "/discoverySearch",
      "/discoverySearch/policy",
      "/discoverySearch/project",
      "/discoverySearch/news",
      "/activityList",
      "/activityInfo",
      "/policyList",
      "/policyInfo/notice",
      "/policyInfo/explain",
      "/projectList",
      "/projectInfo",
      "/newsList",
      "/newsInfo"
    ],
    login: ["/login", "/login/choice", "/login/phone", "/login/username"],
    userCenter: [
      "/userInformation",
      // 发布
      "/userIssueList/achievement",
      "/userIssueList/demand",
      "/userIssueTech/addition",
      "/userIssueTech/modify",
      "/userIssueProd/addition",
      "/userIssueProd/modify",
      "/userIssueDem/addition",
      "/userIssueDem/modify",
      // 对接
      "/userDockingList/achievement",
      "/userDockingList/demand",
      "/userDockingInfo/achievement",
      "/userDockingInfo/demand",
      // 匹配
      "/userMatch",
      "/userMatchList",
      // 认证
      "/userCer",
      "/userIssuePerCer/addition",
      "/userIssuePerCer/modify",
      "/userIssueComCer/addition",
      "/userIssueComCer/modify",
      // 消息中心
      "/userNotificationList",
      "/userNotificationInfo",
      // 关于我们
      "/aboutUs",
      // 收藏
      "/storeUp"
    ]
  },
  redirect: {
    notFound: "home",
    accessDenied: "home"
  },

  // 构建输出配置
  generate: {
    appEntry: "miniprogram-app", //自定义 app.js 和 app.wxss
    autoBuildNpm: "npm", //构建完成后是否自动安装小程序依赖
    appWxss: "display",
    weui: true,
    tabBar: {
      color: "#666666",
      selectedColor: "#2738E9",
      backgroundColor: "#ffffff",
      list: [
        {
          pageName: "home",
          text: "首页",
          iconPath: path.resolve(
            __dirname,
            "../src/assets/images/tabBar_icon1.png"
          ),
          selectedIconPath: path.resolve(
            __dirname,
            "../src/assets/images/tabBar_icon_sl1.png"
          )
        },
        {
          pageName: "resource",
          text: "资源",
          iconPath: path.resolve(
            __dirname,
            "../src/assets/images/tabBar_icon2.png"
          ),
          selectedIconPath: path.resolve(
            __dirname,
            "../src/assets/images/tabBar_icon_sl2.png"
          )
        },
        {
          pageName: "discover",
          text: "发现",
          iconPath: path.resolve(
            __dirname,
            "../src/assets/images/tabBar_icon3.png"
          ),
          selectedIconPath: path.resolve(
            __dirname,
            "../src/assets/images/tabBar_icon_sl3.png"
          )
        },
        {
          pageName: "user",
          text: "我的",
          iconPath: path.resolve(
            __dirname,
            "../src/assets/images/tabBar_icon5.png"
          ),
          selectedIconPath: path.resolve(
            __dirname,
            "../src/assets/images/tabBar_icon_sl5.png"
          )
        }
      ]
    }
    // // 分包
    // subpackages: {
    //   package1: ["home"],
    //   package2: ["info"]
    // },
    // // 分包预下载
    // preloadRule: {
    //   home: {
    //     network: "all",
    //     packages: ["package2"]
    //   }
    // }
  },

  // app window窗口配置
  app: {
    navigationBarBackgroundColor: "#ffffff",
    navigationBarTextStyle: "black"
  },
  // app.json补充配置
  appExtraConfig: {
    sitemapLocation: "sitemap.json"
  },

  // 所有页面的全局配置
  global: {
    rem: true, // 是否支持 rem
    // pageStyle: true, // 是否支持修改页面样式
    pullDownRefresh: true, //开启上拉刷新
    reachBottom: true, //开启下拉加载
    reachBottomDistance: 50,
    share: true, //转发
    shareTimeline: true //分享朋友圈
  },
  //  page.json 各个页面的单独配置
  pages: {
    // 选项卡部分页面 因为页面常驻不会反复触发 created 生命周期
    home: {
      extra: {
        navigationBarBackgroundColor: "#264aec",
        navigationBarTextStyle: "white",
        navigationBarTitleText: "国家机器人与智能制造"
      }
    },
    resource: {
      extra: {
        navigationBarTitleText: "资源"
      }
    },
    discover: {
      extra: {
        navigationBarTitleText: "发现",
        navigationBarBackgroundColor: "#F7F7F7",
        backgroundColor: "#F7F7F7"
      }
    },
    user: {
      extra: {
        navigationBarBackgroundColor: "#F7F7F7",
        backgroundColor: "#F7F7F7"
      }
    },
    // 非选项卡部分
    search: {
      extra: {
        navigationBarTitleText: "搜索"
      }
    },
    login: {
      pullDownRefresh: false,
      extra: {
        navigationBarTitleText: "登录"
      }
    },
    info: {
      pullDownRefresh: false,
      extra: {
        navigationBarBackgroundColor: "#F7F7F7",
        backgroundColor: "#F7F7F7"
      }
    }
  },

  // 优化配置，控制优化级别，通常使用默认配置即可
  optimization: {
    domSubTreeLevel: 10,
    elementMultiplexing: true,
    textMultiplexing: true,
    commentMultiplexing: true,
    domExtendMultiplexing: true,
    styleValueReduce: 5000,
    attrValueReduce: 5000
  },

  // 项目配置，会被合并到 project.config.json
  projectConfig: {
    projectname: "工信部",
    appid: "wxc6fb143c44787be6"
  }
};
