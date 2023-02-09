<template>
  <div class="wx-share-container">
    <div class="occupy-space"></div>
    <div class="wx-share">
      <div class="wx-share__content">
        <wx-button class="btn" open-type="share">分享</wx-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WxShare"
};
</script>

<style lang="less">
.wx-share-container {
  .occupy-space {
    height: 100 / @rem;
  }
  .wx-share {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .wx-share__content {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 100 / @rem;
      box-shadow: 0 / @rem 0 / @rem 6 / @rem 0 / @rem rgba(0, 0, 0, 0.06);
      background-color: #ffffff;
      .btn {
        padding-left: 60 / @rem;
        padding-right: 0;
        margin: 0;
        border-radius: 0;
        line-height: 38 / @rem;
        font-size: 30 / @rem;
        color: #141414;
        background-color: transparent;
        background-size: 38 / @rem;
        background-image: url("~@/assets/images/share_icon_a.png");
        background-position: 0 center;
        background-repeat: no-repeat;
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
