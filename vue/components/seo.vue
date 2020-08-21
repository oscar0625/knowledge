<template>
  <div v-if="isShowSeo" class="seo">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Seo",
  data() {
    return {
      isShowSeo: true
    };
  },
  mounted() {
    // 页面加载完成
    this.isShowSeo = false;
  }
};
</script>

<style lang="less" scoped>
.seo {
  position: absolute;
  top: -100000px;
}
</style>
