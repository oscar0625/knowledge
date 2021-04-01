<template>
  <div>
    <div class="wow slideInLeft">Hello word</div>
    <div class="wow rotateIn">Hello word</div>
    <div class="wow slideInRight" data-wow-delay="0.2s">Hello word</div>
  </div>
</template>
<script>
// https://juejin.im/post/6844904144973594637
import { WOW } from "wowjs";

export default {
  name: "Wow",
  mounted() {
    this.createWow();
  },
  methods: {
    // 初始化wowjs
    wowInstance() {
      return new WOW({
        animateClass: "animate__animated",
        live: false
      });
    },
    createWow() {
      const wow = this.wowInstance();
      wow.init();
      this.$once("hook:beforeDestroy", function () {
        wow.stop();
      });
    },
  }
};
</script>
