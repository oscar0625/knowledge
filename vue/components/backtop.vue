<template>
  <div class="backtop" @click="handleBacktop">
    <i class="el-icon-arrow-up"></i>
  </div>
</template>

<script>
export default {
  name: "Backtop",
  methods: {
    handleBacktop() {
      document.body.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.backtop {
  display: flex;
  position: fixed;
  z-index: 5;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
  &:hover {
    background-color: #f23f47;
    box-shadow: 0 4px 10px 4px rgba(241, 63, 71, 0.5);
  }
}
</style>
