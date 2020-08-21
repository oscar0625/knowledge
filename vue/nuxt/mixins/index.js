import Vue from "vue";
import "./filters";

// 全局混入
Vue.mixin({
  methods: {
    // 路由定向方法
    redirectByPath(path, query) {
      this.$router.push({ path, query });
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
      return function () {
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
          timer = setTimeout(function () {
            fn.apply(context, args);
          }, delay);
        }
      };
    },
    // 防抖
    customDebounce(fn, delay) {
      let timer;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }
  }
});
