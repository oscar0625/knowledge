// 全局css
import "animate.css";
import "@/assets/css/normalize.css";
import "@/assets/css/base.css";
import "@/assets/css/utils.css";
import "@/assets/less/public.less";

// 全局js
import "@/utils/filters"; // 过滤器
import "@/utils/rem"; // rem配置

//全局混入
import Vue from "vue";
import axios from "@/utils/request";
import api from "@/api";
import { showMessage, cookies } from "@/utils/public";

// 全局组件
import MyHeader from "@/common/my_header";

// 全局注册组件
Vue.component("MyHeader", MyHeader);

// 挂载到vue的原型上
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$cookies = cookies;
Vue.prototype.$message = showMessage;

const queryString = require("query-string");
Vue.mixin({
  computed: {
    isBlank() {
      return process.env.isMiniprogram ? "_blank" : "_self";
    }
  },
  methods: {
    //路由定向方法
    redirectByPath(path, query) {
      // 小程序
      if (process.env.isMiniprogram) {
        const str = queryString.stringify(query);
        location.href = path + (str ? "?" + str : "");
      } else {
        // Web 端
        this.$router.push({ path, query });
      }
    },
    // 在新窗口打开
    redirectByPathBlank(path, query) {
      // 小程序
      if (process.env.isMiniprogram) {
        const str = queryString.stringify(query);
        window.open(path + (str ? "?" + str : ""), "_blank");
      } else {
        // 注意 Web 端都不在新窗口打开
        this.$router.push({ path, query });
        // const routeUrl = this.$router.resolve({ path, query });
        // window.open(routeUrl.href, "_blank");
      }
    },
    // null => string
    turnNulltoString(value) {
      return value === null ? "" : value;
    },
    // 去分号将字符串转成数组
    strToArr(param) {
      return this.turnNulltoString(param) === ""
        ? []
        : this.turnNulltoString(param).split(";");
    },
    // 检验登录
    checkAuth() {
      const token = this.$cookies.get("token");
      if (!token) {
        return this.redirectByPathBlank("/login", {
          path: this.$route.fullPath
        });
      }
      return true;
    },
    // 检验验证
    checkCertificate() {
      const { cerCerStatus } = this.$store.state.info;
      let res = false;
      switch (cerCerStatus) {
        case 0:
          // 未认证
          this.$message.error("未进行实名认证");
          setTimeout(() => {
            this.redirectByPathBlank(`/userCer`);
          }, 500);
          break;
        case 3:
          // 认证失败
          this.$message.error("认证审核未通过");
          // setTimeout(() => {
          //   this.redirectByPathBlank(`/userCer`);
          // }, 500);
          break;
        case 1:
          this.$message.error("实名认证审核中");
          break;
        case 2:
          res = true;
          break;
      }
      return res;
    },
    // 小程序相关
    setNavigationBarColor({ frontColor = "#000000", backgroundColor }) {
      // 小程序
      if (process.env.isMiniprogram) {
        wx.setNavigationBarColor({
          frontColor,
          backgroundColor
        });
      }
    },
    setNavigationBarTitle({ title }) {
      // 小程序
      if (process.env.isMiniprogram) {
        wx.setNavigationBarTitle({
          title
        });
      }
    },
    showWXLoading(params) {
      // 小程序
      if (process.env.isMiniprogram) {
        const { type } = params;
        if (type) {
          wx.showNavigationBarLoading(params);
        } else {
          wx.showLoading(params);
        }
      }
    },
    hideWXLoading(params = {}) {
      // 小程序
      if (process.env.isMiniprogram) {
        const { type } = params;
        if (type) {
          wx.hideNavigationBarLoading(params);
        } else {
          wx.hideLoading(params);
        }
      }
    },
    hideHomeBtn() {
      // 小程序
      if (process.env.isMiniprogram) {
        wx.hideHomeButton();
      }
    },
    // 下拉刷新
    onshow(cbk) {
      if (process.env.isMiniprogram) {
        window.addEventListener("wxshow", () => {
          cbk && cbk();
        });
        this.$once("hook:beforeDestroy", function () {
          window.$$clearEvent("wxshow");
        });
      } else {
        cbk && cbk();
      }
    },
    // 下拉刷新
    onpulldownrefresh(cbk) {
      if (process.env.isMiniprogram) {
        window.addEventListener("pulldownrefresh", () => {
          cbk && cbk();
          // 停止下拉刷新
          wx.stopPullDownRefresh();
        });
        this.$once("hook:beforeDestroy", function () {
          window.$$clearEvent("pulldownrefresh");
        });
      }
    },
    // 上拉加载
    onreachbottom(cbk) {
      if (process.env.isMiniprogram) {
        window.addEventListener("reachbottom", () => {
          cbk && cbk();
        });
        this.$once("hook:beforeDestroy", function () {
          window.$$clearEvent("reachbottom");
        });
      }
    },

    // 动画相关
    // animatecss 添加后去掉动画类
    animateCSS({ element, animationName, cbk }) {
      element.classList.add(`animate__animated`, animationName);

      function handleAnimationEnd(event) {
        event.stopPropagation();
        element.classList.remove(`animate__animated`, animationName);
        element.removeEventListener("animationend", handleAnimationEnd);
        cbk && cbk(element);
      }

      element.addEventListener("animationend", handleAnimationEnd);
    },
    // 显示元素动画
    animShowElement(element, animationName, cbk) {
      // 当前元素如果正处于动画执行中 不进行操作 防止用户过快点击
      if (!element.getAttribute("animation-ing")) {
        element.setAttribute("animation-ing", true);
        element.style.display = "block";
        // 执行动画
        this.animateCSS({
          element,
          animationName,
          cbk: () => {
            element.removeAttribute("animation-ing");
            cbk && cbk(element);
          }
        });
      } else {
        // console.log("show-error：animation in progress");
      }
    },
    animHideElement(element, animationName, cbk) {
      // 当前元素如果正处于动画执行中 不进行操作 防止用户过快点击
      if (!element.getAttribute("animation-ing")) {
        element.setAttribute("animation-ing", true);
        // 执行动画
        this.animateCSS({
          element,
          animationName,
          cbk: () => {
            element.style.display = "none";
            element.removeAttribute("animation-ing");
            cbk && cbk(element);
          }
        });
      } else {
        // console.log("hide——error：animation in progress");
      }
    },
    // 收起动画
    zoomout({ ele, cbk, duration = 400 }) {
      // 待续 速度慢 等正式发布再测试看看
      // 获取元素子元素的实际高度
      ele.children[0].$$getBoundingClientRect().then(({ height }) => {
        const keyframes = [
          {
            height: height + "px",
            ease: "ease-out"
          },
          {
            height: 0,
            ease: "ease-out"
          }
        ];
        ele.$$animate(keyframes, duration, cbk);
      });
    },
    // 展开动画
    zoomin({ ele, cbk, duration = 400 }) {
      // 获取元素子元素的实际高度
      ele.children[0].$$getBoundingClientRect().then(({ height }) => {
        const keyframes = [
          {
            height: 0,
            ease: "ease-out"
          },
          {
            height: height + "px",
            ease: "ease-out"
          }
        ];
        ele.$$animate(keyframes, duration, cbk);
      });
    }
  }
});
