import Vue from "vue";
import "./filters";

// 全局混入
Vue.mixin({
  methods: {
    // 路由定向方法
    redirectByPath(path, query) {
      this.$router.push({ path, query });
    }
  }
});
