<template>
  <div class="about_us-page">
    <my-header>关于我们</my-header>
    <div class="logo"></div>
    <div class="logo-text"></div>
    <div class="title">资源整合 快速对接</div>
    <div class="description">
      围绕面向机器人和智能制造领域创新成果产业化公共服务能力建设，打造“一线、两基、三库、九中心”的基础共性服务平台，通过线上线下结合的服务模式，为机器人和智能制造领域企业和研究机构提供成果转化公共服务。
    </div>
    <div class="ewm">
      <my-ewm />
    </div>
  </div>
</template>

<script>
import MyEwm from "@/common/my_ewm";
export default {
  name: "AboutUs",
  components: {
    MyEwm
  },
  created() {
    // 下拉刷新
    this.onpulldownrefresh();
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "关于我们"
    });
  }
};
</script>

<style lang="less">
.about_us-page {
  padding-top: 120 / @rem;
  .logo {
    width: 160 / @rem;
    height: 160 / @rem;
    margin: 0 auto;
    background-size: cover;
    background-image: url("~@/assets/images/logo.png");
    background-position: center;
  }
  .logo-text {
    width: 370 / @rem;
    height: 87 / @rem;
    margin: 40 / @rem auto;
    background-size: cover;
    background-image: url("~@/assets/images/logo_text.png");
    background-position: center;
  }
  .title {
    width: 344 / @rem;
    margin: 0 auto;
    line-height: 70 / @rem;
    text-align: center;
    font-size: 30 / @rem;
    background-image: url("~@/assets/images/aboutus_icon1.png");
    background-size: 344 / @rem auto;
    background-repeat: no-repeat;
    background-position: 0 center;
  }
  .description {
    padding: 12 / @rem 100 / @rem 0;
    line-height: 45 / @rem;
    font-size: 30 / @rem;
    color: #000000;
    text-align: justify;
    letter-spacing: 1 / @rem;
  }
  .ewm {
    padding-top: 310 / @rem;
  }
}
</style>
