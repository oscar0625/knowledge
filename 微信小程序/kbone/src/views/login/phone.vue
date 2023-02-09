<template>
  <div class="login-phone">
    <mp-toptips
      type="error"
      :show="!!errorMessage"
      :msg="errorMessage"
      @hide="errorMessage = ''"
    ></mp-toptips>
    <mp-form-page class="login__formpage">
      <mp-form class="login__form" ref="ruleForm" :rules="rules" :models="form">
        <mp-cells>
          <mp-cell show-error="true" prop="phoneNumber">
            <wx-input
              class="wx-input"
              :value="form.phoneNumber"
              data-field="phoneNumber"
              type="number"
              placeholder="请输入手机号"
              placeholder-class="wx-input-placeholder"
              maxlength="11"
              @input="onFormInputChange"
            ></wx-input>
            <div slot="footer">
              <div class="pin" @click="sendPin('ruleForm')">
                {{ pinContent }}
              </div>
            </div>
          </mp-cell>
          <mp-cell show-error="true" prop="smsCode">
            <wx-input
              class="wx-input"
              :value="form.smsCode"
              data-field="smsCode"
              placeholder="请输入验证码"
              placeholder-class="wx-input-placeholder"
              maxlength="6"
              @input="onFormInputChange"
            ></wx-input>
          </mp-cell>
        </mp-cells>
      </mp-form>
      <div slot="button">
        <wx-button
          class="login__formbtn"
          type="primary"
          :disabled="isLoading"
          :loading="isLoading"
          @click="handlerSubmit('ruleForm')"
          >确定</wx-button
        >
      </div>
    </mp-form-page>
    <!-- <wx-button open-type="getPhoneNumber" @getphonenumber="getWXPhone"
      >获取手机号</wx-button
    > -->
  </div>
</template>

<script>
export default {
  name: "LoginPhone",
  data() {
    return {
      // 是否是微信登录方式
      isWX: false,
      errorMessage: "",
      isLoading: false,
      rules: [
        {
          name: "phoneNumber",
          rules: [
            { required: true, message: "请输入手机号" },
            { mobile: true, message: "请输入正确的手机号" }
          ]
        },
        {
          name: "smsCode",
          rules: { required: true, message: "请输入验证码" }
        }
      ],
      form: {
        phoneNumber: "",
        smsCode: ""
      },
      pinContent: "获取验证码"
    };
  },
  created() {
    this.hideHomeBtn();
    const { isWX = false } = this.$route.query;
    this.isWX = isWX;
  },
  methods: {
    // 输入绑定
    onFormInputChange(evt) {
      const { field } = evt.currentTarget.dataset;
      this.form = Object.assign({}, this.form); // 拷贝
      this.form[field] = evt.detail.value;
    },
    // 发送短信验证码
    sendPin(formName) {
      // 此时点击才有效
      if (this.pinContent === "获取验证码") {
        this.$refs[formName].$$wxCustomComponent.validateField(
          "phoneNumber",
          (valid, errors) => {
            if (valid) {
              // 开启倒计时60S
              this.countDown("timer", "pinContent", 60);
              this.loadPin();
            } else {
              this.errorMessage = errors.message;
            }
          }
        );
      }
    },
    // 定时器
    countDown(name, content, time) {
      // 清除之前的定时
      clearTimeout(this[name]);

      let num = 0;
      const fn = () => {
        if (num < time) {
          this[name] = setTimeout(fn, 1000);
          this[content] = `倒计时${time - num}秒`;
        } else {
          clearTimeout(this[name]);
          this[content] = "获取验证码";
        }
        num++;
      };
      // 开始倒计时
      fn();
    },
    loadPin() {
      this.$api("login", "getPin", {
        type: 7,
        phoneNumber: this.form.phoneNumber
      }).then((res) => {
        if (res.code !== 0) {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    // 提交
    handlerSubmit(formName) {
      // 校验
      this.$refs[formName].$$wxCustomComponent.validate((valid, errors) => {
        if (valid) {
          this.loadCommit();
        } else {
          const firstError = Object.keys(errors);
          if (firstError.length) {
            this.errorMessage = errors[firstError[0]].message;
          }
        }
      });
    },
    // 微信登录获取code
    WXLogin() {
      return new Promise((resolve, reject) => {
        if (this.isWX) {
          this.showWXLoading({
            title: "登录中",
            mask: true
          });
          //微信登陆
          wx.login({
            success: ({ code }) => {
              resolve(code);
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
        } else {
          resolve();
        }
      });
    },
    loadCommit() {
      this.isLoading = true;
      this.WXLogin().then((code = "") => {
        this.$api("login", "telLogin", {
          ...this.form,
          code
        }).then((res) => {
          this.isLoading = false;
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "登录成功"
            });
            this.$cookies.set("token", res.token, 86400000);
            if (res.accountAddFlag === 1) {
              this.redirectByPath("/login/username", this.$route.query);
            } else {
              this.redirectByPath(this.$route.query.path || "/");
            }
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    },
    getWXPhone(e, b) {
      // 待续
      console.log(e.detail);
    }
  }
};
</script>

<style lang="less">
.login-phone {
}
</style>
