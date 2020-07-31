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
    myInterval(timer, callback, time) {
      const fn = () => {
        this[timer] = setTimeout(() => {
          fn();
        }, time);
        callback();
      };
      this[timer] = setTimeout(() => {
        fn();
      }, time);
    }
  }
});
