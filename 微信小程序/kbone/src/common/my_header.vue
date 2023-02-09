<template>
  <div
    check-reduce
    class="my-header"
    :style="`background-color: ${bgColor};color: ${fontColor};`"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    fontColor: {
      type: String,
      default: "#141414"
    }
  }
};
</script>

<style lang="less">
.my-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90 / @rem;
  font-size: 42 / @rem;
  font-weight: 800;
}
</style>
