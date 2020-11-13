const DOMAIN = "http://47.94.205.149:8049";
const DEV_DOMAIN = "http://47.94.205.149:8049";
const LOGIN_DOMAIN = "http://47.94.205.149:8345";
export default {
  /*
   ** 配置全局的 CSS 文件、模块、库。
   ** https://www.nuxtjs.cn/api/configuration-css
   */
  css: [
    "@/assets/theme/index.css",
    "animate.css",
    "@/assets/css/normalize.css",
    "@/assets/css/base.css",
    "@/assets/css/utils.css",
    "@/assets/css/public.css"
  ],
  /*
   ** 配置环境变量
   ** https://www.nuxtjs.cn/api/configuration-env
   */
  env: {
    DOMAIN,
    DEV_DOMAIN
  },
  /*
   ** 配置个性化的路由（vue-router）。
   ** https://www.nuxtjs.cn/api/configuration-router
   */
  router: {
    middleware: [],
    // 仅在html5历史记录模式下可用 默认为无滚动行为 返回false以防止滚动
    scrollBehavior(to, from, savedPosition) {
      let position = false;

      if (savedPosition) {
        // savedPosition仅可用于popstate导航。
        position = savedPosition;
      } else {
        // 否则返回到顶部
        position = { x: 0, y: 0 };
      }

      return new Promise((resolve) => {
        // wait for the out transition to complete (if necessary)
        window.$nuxt.$once("triggerScroll", () => {
          // coords will be used if no selector is provided,
          // or if the selector didn't match any element.
          if (to.hash) {
            let hash = to.hash;
            // CSS.escape() is not supported with IE and Edge.
            if (
              typeof window.CSS !== "undefined" &&
              typeof window.CSS.escape !== "undefined"
            ) {
              hash = "#" + window.CSS.escape(hash.substr(1));
            }
            try {
              if (document.querySelector(hash)) {
                // scroll to anchor by returning the selector
                position = { selector: hash };
              }
            } catch (e) {
              console.warn(
                "Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape)."
              );
            }
          }
          resolve(position);
        });
      });
    }
  },
  /*
   ** modules是Nuxt.js扩展，可以扩展它的核心功能并添加无限的集成。
   ** https://www.nuxtjs.cn/api/configuration-modules
   */
  modules: [
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    "@nuxtjs/style-resources"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true, // 开启代理
    credentials: true // 是否带cookie
  },
  proxy: {
    // 项目大部分模块的接口地址
    "/commonApi/": {
      target: process.env.NODE_ENV === "development" ? DEV_DOMAIN : DOMAIN, // key(路由前缀)：value(代理地址)
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        "^/commonApi/": "" // 路径重写
      }
    },
    // 登录模块的接口地址
    "/loginApi/": {
      target: LOGIN_DOMAIN,
      changeOrigin: true,
      pathRewrite: {
        "^/loginApi/": ""
      }
    }
  },
  /*
   ** styleResources module configuration
   ** See https://www.npmjs.com/package/@nuxtjs/style-resources
   */
  styleResources: {
    // your settings here
    less: ["./assets/less/mixins.less"]
  },
  /*
   ** plugins 属性配置
   ** 所有插件会在 Nuxt.js 应用初始化之前被加载导入。
   ** https://www.nuxtjs.cn/api/configuration-plugins
   */
  plugins: [
    { src: "@/plugins/element-ui", ssr: true },
    { src: "@/plugins/device", ssr: true },
    { src: "@/plugins/axios", ssr: true },
    { src: "@/api", ssr: true },
    // { src: "@/plugins/router", ssr: true },
    // { src: "@/plugins/mockjs", ssr: true },
    { src: "@/mixins", ssr: true },
    { src: "@/mixins/index_client", ssr: false },
    { src: "@/plugins/lazyload", ssr: false },
    { src: "@/plugins/anime", ssr: false },
    { src: "@/plugins/nuxt-fullpage", ssr: false },
    { src: "@/plugins/nuxt-swiper-plugin", ssr: false },
    { src: "@/plugins/nuxt-video-player-plugin", ssr: false }
  ],

  /*
   ** 配置head
   ** https://www.nuxtjs.cn/api/configuration-head
   */
  head: {},
  /*
   ** 设置页面切换过渡效果
   ** 设置布局切换过渡效果
   ** https://www.nuxtjs.cn/api/configuration-transition
   */
  transition: {
    name: "page",
    mode: "out-in"
  },
  layoutTransition: {
    name: "layout",
    mode: "out-in"
  },
  /*
   ** 配置个性化加载进度条
   ** https://www.nuxtjs.cn/api/configuration-loading
   */
  loading: {
    color: "#f23f47",
    height: "2px"
  },
  /*
   ** Nuxt rendering mode
   ** https://www.nuxtjs.cn/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** 配置自定义服务器访问主机和端口
   ** https://www.nuxtjs.cn/api/configuration-server
   */
  server: {
    port: 8080 // default: 3000
  },
  /*
   ** 自动导入您的组件
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: false,
  /*
   ** 配置自定义webpack。
   ** https://www.nuxtjs.cn/api/configuration-build
   */
  build: {
    transpile: [/^element-ui/],
    babel: {
      presets() {
        return [
          [require.resolve("@nuxt/babel-preset-app"), { useBuiltIns: "usage" }]
        ];
      }
    }
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module"
  ]
};
