<template>
  <div>
    <div class="wow slideInLeft">Hello word</div>
    <div class="wow rotateIn">Hello word</div>
    <div class="wow slideInRight">Hello word</div>
  </div>
</template>
<script>
// https://juejin.im/post/6844904144973594637
import { WOW } from "wowjs";

export default {
  name: "Wow",
  mounted() {
    this.wow = this.wowInstance();
    this.wow.init();
  },
  beforeDestroy() {
    this.wow.stop();
  },
  methods: {
    // 初始化wowjs
    wowInstance() {
      return new WOW({
        animateClass: "animate__animated",
        live: false
      });
    }
  }
};
</script>
