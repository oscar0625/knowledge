<template>
  <div class="my-ewm">
    <div class="evm"></div>
    <p>关注服务号，获取更多资源</p>
    <p>Copyright@2022-2023 Ckzone</p>
  </div>
</template>

<script>
export default {
  name: "MyEVM"
};
</script>

<style lang="less">
.my-ewm {
  text-align: center;
  .evm {
    width: 150 / @rem;
    height: 150 / @rem;
    margin: 0 auto 20 / @rem;
    background-size: cover;
    background-image: url("~@/assets/images/qr_code.jpg");
  }
  p {
    line-height: 45 / @rem;
    font-size: 26 / @rem;
    color: #999999;
  }
}
</style>
