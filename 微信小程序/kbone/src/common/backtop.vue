<template>
  <div class="backtop" @click="handleBacktop"></div>
</template>

<script>
export default {
  name: "Backtop",
  methods: {
    handleBacktop() {
      // 小程序
      if (process.env.isMiniprogram) {
        wx.pageScrollTo({ scrollTop: 0 });
      } else {
        // Web 端
        document.body.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }
};
</script>

<style lang="less">
.backtop {
  position: fixed;
  z-index: 1000;
  right: 40 / @rem;
  bottom: 40 / @rem;
  width: 100 / @rem;
  height: 100 / @rem;
  border-radius: 50%;
  box-shadow: 0 0 20 / @rem 0 / @rem rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  background-size: auto 44 / @rem;
  background-image: url("~@/assets/images/backtop_icon.png");
  background-position: center;
  background-repeat: no-repeat;
}
</style>
