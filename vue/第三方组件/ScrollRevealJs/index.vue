<template>
  <div class="reveal-top">123</div>
</template>

<script>
// npm install scrollreveal --save
// https://scrollrevealjs.org/api/reveal.html

import ScrollReveal from "scrollreveal";

export default {
  data() {
    return {
      sr: null
    };
  },
  mounted() {
    this.createSr(".reveal-top", {
      // 指定显示时方向元素从何而来，'bottom', 'left', 'top', 'right'
      origin: "bottom",
      // 控制元素显示时移动的距离，单位可以用%，rem等
      distance: "200px",

      // 当动画开始之前会被触发
      beforeReveal(domEl) {
        console.log("动画执行了");
      },
      // 鼠标滚轮滚动之前会被触发
      beforeReset(domEl) {
        console.log("滚轮开始---");
      },
      // 动画开始之后会被触发
      afterReveal(domEl) {
        console.log("动画结束了");
      },
      // 滚轮滚动之后会被触发
      afterReset(domEl) {
        console.log("滚轮结束了");
      }
    });
  },
  methods: {
    // 初始化ScrollReveal.js
    srInstance() {
      return ScrollReveal({
        // 在移动端是否使用动画
        mobile: false,
        // 回滚的时候是否再次触发动画
        reset: false,
        // 延迟时间
        delay: 0,
        // 动画的时长
        duration: 1000,
        easing: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
        afterReveal(el) {
          // 实际执行cleanup: true 但插件暂时不好使
          el.style.transform = "";
          el.style.transition = "";
        }
      });
    },
    createSr(name = "", config = {}) {
      const sr = this.srInstance();
      sr.reveal(name, config);
      this.$once("hook:beforeDestroy", function () {
        sr.destroy();
      });
    }
  }
};
</script>

<style>
/* ScrollReveal.js */
html.sr .load-hidden {
  visibility: hidden;
}
</style>
