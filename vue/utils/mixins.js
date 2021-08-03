import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/utils/filters.js";

import axios from "@/utils/request";
import api from "@/api";
import cookies from "@/plugins/cookie";
import { upperFirst, camelCase } from "lodash";
// import mock from "@/plugins/mock";
// // 执行mock 拦截
// mock();

Vue.config.productionTip = false;

// 挂载到vue的原型上
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$cookies = cookies;

//全局混入
Vue.mixin({
  methods: {
    // 路由定向方法
    redirectByPath(path, query) {
      this.$router.push({ path, query });
    },
    // 在新窗口打开
    redirectByPathBlank(path, query) {
      const routeUrl = this.$router.resolve({ path, query });
      window.open(routeUrl.href, "_blank");
    },
    // 自定义的setInterval 参数一 timer的名字(当前定时器的指针 ) 参数二 callback回调函数 参数三 间隔时间
    customInterval(timer, callback, time) {
      const fn = () => {
        this[timer] = setTimeout(() => {
          callback();
          fn();
        }, time);
      };
      fn();
    },
    // 节流
    customThrottle(fn, delay, time) {
      let timer, previous;
      return function() {
        const current = new Date();
        const context = this;
        const args = arguments;
        // 如果时间间隔大于等于指定的时间 或 第一次则必须执行
        if (!previous || current - previous >= time) {
          fn.apply(context, args);
          previous = current;
        } else {
          // 否则 延时执行
          clearTimeout(timer);
          timer = setTimeout(function() {
            fn.apply(context, args);
          }, delay);
        }
      };
    },
    // 防抖
    customDebounce(fn, delay) {
      let timer;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn.apply(context, args);
        }, delay);
      };
    },
    // null => string
    turnNulltoString(value) {
      return value === null ? "" : value;
    },
    // 自定义跳转函数
    customScrollTo(top, duration = 500, cbk) {
      const scrollElement =
        document.scrollingElement || document.body || document.documentElement;
      this.$anime({
        targets: scrollElement,
        scrollTop: top,
        duration,
        easing: "easeInOutQuad",
        complete: () => {
          cbk && cbk();
        }
      });
    }
  }
});

// 自动化全局注册
const requireComponent = require.context(
  // 其组件目录的相对路径
  "../components",
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\w+\.(vue|js)$/
);
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
