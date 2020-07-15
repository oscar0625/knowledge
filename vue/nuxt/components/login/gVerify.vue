<template>
  <div id="gVerify"></div>
</template>

<script>
import GVerify from "@/utils/gVerify.js";
export default {
  name: "GVerify",
  data() {
    return {
      gVerif: null,
      random: Math.random().toString(36).substr(2)
    };
  },
  mounted() {
    // 实例化插件
    this.gVerif = new GVerify({
      id: "gVerify",
      click: () => {
        this.loadAuthCode();
      }
    });
    this.loadAuthCode();
  },
  methods: {
    loadAuthCode() {
      this.$api("login", "verificationCode", this.random).then((res) => {
        this.gVerif.setCode(res.verificationCode).draw();
        // 自定义事件名 传递的参数
        this.$emit("emitAuthCode", {
          verificationCode: res.verificationCode,
          pageId: this.random
        });
      });
    }
  }
};
</script>

<style lang="less">
#gVerify {
  height: 40px;
}
</style>
