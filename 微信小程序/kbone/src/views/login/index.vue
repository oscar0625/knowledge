<template>
  <div class="login-page">
    <my-header>登录</my-header>
    <div class="common-top">
      <div class="logo"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "LoginPage"
};
</script>

<style lang="less">
.login-page {
  .common-top {
    padding: 130 / @rem 0 160 / @rem;
    .logo {
      width: 160 / @rem;
      height: 160 / @rem;
      margin: 0 auto;
      background-size: cover;
      background-image: url("~@/assets/images/logo.png");
      background-position: center;
    }
  }
  .login__formpage {
    .weui-form {
      .weui-form__control-area {
        .login__form {
          .weui-cells {
            margin-top: 0;
            &::before,
            &::after {
              display: none;
            }
            .weui-cell {
              height: 88 / @rem;
              padding: 0 30 / @rem;
              margin-bottom: 60 / @rem;
              border-radius: 44 / @rem;
              font-size: 30 / @rem;
              color: #141414;
              background-color: #fafafa;
              .wx-input {
                width: 100%;
                height: 88 / @rem;
                line-height: 88 / @rem;
              }
              .wx-input-placeholder {
                color: #999999;
              }
              .pin {
                position: relative;
                width: 180 / @rem;
                &::before {
                  content: "";
                  position: absolute;
                  left: 0;
                  top: 30 / @rem;
                  width: 1 / @rem;
                  height: 28 / @rem;
                  background-color: #e6e6e6;
                }
              }
            }
          }
        }
      }
      .weui-form__opr-area {
        padding-top: 15 / @rem;
        .login__formbtn {
          width: 100%;
          height: 88 / @rem;
          border-radius: 44 / @rem;
          line-height: 88 / @rem;
          font-size: 30 / @rem;
          color: @mainColor;
          background-color: transparent;
          background-image: linear-gradient(
            90deg,
            rgba(12, 64, 212, 0.1),
            rgba(36, 91, 245, 0.1)
          );
          &::after {
            display: none;
          }
          transition: 0.3s;
          &:active {
            background-image: linear-gradient(
              90deg,
              rgba(12, 64, 212, 0.2),
              rgba(36, 91, 245, 0.2)
            );
          }
        }
      }
    }
  }
}
</style>
