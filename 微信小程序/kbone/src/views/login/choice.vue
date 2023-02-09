<template>
  <div class="login-choice">
    <div class="btn wrapper">
      <div class="wx" @click="handleWXLogin">微信用户一键登录</div>
      <div class="phone">
        <router-link
          :to="{
            path: '/login/phone',
            query: $route.query
          }"
          >手机号登录</router-link
        >
      </div>
    </div>
    <div class="ewm">
      <my-ewm />
    </div>
  </div>
</template>

<script>
import MyEwm from "@/common/my_ewm";
export default {
  name: "LoginChoice",
  components: {
    MyEwm
  },
  data() {
    return {};
  },
  methods: {
    handleWXLogin() {
      this.showWXLoading({
        title: "登录中",
        mask: true
      });
      //登陆 设置新token
      wx.login({
        success: ({ code }) => {
          this.$api("login", "wxLogin", { code }).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "登录成功"
              });
              this.$cookies.set("token", res.token, 86400000);
              this.redirectByPath(this.$route.query.path || "/");
            } else if (res.code === 4017) {
              // 微信未注册
              this.redirectByPath("/login/phone", {
                ...this.$route.query,
                isWX: true
              });
            } else {
              this.$message({
                type: "error",
                message: res.message
              });
            }
          });
        },
        fail: (res) => {
          this.$message({
            type: "error",
            message: res.errMsg
          });
        },
        complete: () => {
          this.hideWXLoading();
        }
      });
    }
  }
};
</script>

<style lang="less">
.login-choice {
  .btn {
    > div {
      box-sizing: border-box;
      height: 88 / @rem;
      border-radius: 44 / @rem;
      line-height: 88 / @rem;
      text-align: center;
      font-size: 30 / @rem;
      color: #141414;
      &.wx {
        margin-bottom: 60 / @rem;
        color: #ffffff;
        background: linear-gradient(90deg, #0c40d4, #245bf5);
      }
      &.phone {
        border: 1 / @rem solid #f2f2f2;
        a {
          display: block;
        }
      }
    }
  }
  .ewm {
    padding-top: 440 / @rem;
  }
}
</style>
