<template>
  <div>
    <my-header />
    <Nuxt />
    <my-footer />
  </div>
</template>
<script>
import MyHeader from "@/components/header";
import MyFooter from "@/components/footer";
// 默认布局
export default {
  components: { MyHeader, MyFooter }
};
</script>
<style lang="less"></style>
