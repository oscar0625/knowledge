<template>
  <div v-if="visible">
    <wx-animation ref="phoneApprove" class="phone-approve-dialog">
      <div class="mask" @click="hideContent"></div>
      <mp-toptips
        type="error"
        :show="!!errorMessage"
        :msg="errorMessage"
        @hide="errorMessage = ''"
      ></mp-toptips>
      <div class="phone-approve-dialog__content">
        <div class="name">
          <h2>身份认证</h2>
          <p>为了您的账号安全，进行敏感操作前须先验证身份</p>
        </div>
        <mp-form-page class="formpage">
          <mp-form
            class="rule-form"
            ref="ruleForm"
            :rules="rules"
            :models="form"
          >
            <mp-cells>
              <mp-cell>
                <div slot="title"><div class="title">验证方式</div></div>
                <span class="wx-input">{{ phoneNumber }}</span>
              </mp-cell>
              <mp-cell show-error="true" prop="smsCode">
                <div slot="title"><div class="title">短信验证</div></div>
                <wx-input
                  class="wx-input"
                  :value="form.smsCode"
                  data-field="smsCode"
                  placeholder="请输入验证码"
                  placeholder-class="wx-input-placeholder"
                  maxlength="6"
                  @input="onFormInputChange"
                ></wx-input>
                <div slot="footer">
                  <div class="pin" @click="sendPin">
                    {{ pinContent }}
                  </div>
                </div>
              </mp-cell>
            </mp-cells>
          </mp-form>
          <div slot="button">
            <wx-button
              class="common-btn"
              type="primary"
              :disabled="isLoading"
              :loading="isLoading"
              @click="handlerSubmit('ruleForm')"
              >确定</wx-button
            >
          </div>
        </mp-form-page>
      </div>
    </wx-animation>
  </div>
</template>

<script>
export default {
  name: "PhoneApprove",
  props: {
    visible: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      errorMessage: "",
      isLoading: false,
      rules: [
        {
          name: "smsCode",
          rules: { required: true, message: "请输入验证码" }
        }
      ],
      form: {
        smsCode: ""
      },
      pinContent: "获取验证码"
    };
  },
  computed: {
    phoneNumber() {
      return this.$store.state.info.phoneNumber || "";
    }
  },
  watch: {
    visible: "showContent"
  },
  methods: {
    // 如果 visible 为 true 则显示
    showContent() {
      this.$nextTick(() => {
        if (this.visible) {
          this.animShowElement(this.$refs.phoneApprove, "animate__fadeIn");
        }
      });
    },
    // 隐藏内容 并将 visible 置为 false
    hideContent() {
      return new Promise((resolve, reject) => {
        this.animHideElement(
          this.$refs.phoneApprove,
          "animate__fadeOut",
          () => {
            this.$emit("update:visible", false);
            resolve();
          }
        );
      });
    },
    // 输入绑定
    onFormInputChange(evt) {
      const { field } = evt.currentTarget.dataset;
      this.form = Object.assign({}, this.form); // 拷贝
      this.form[field] = evt.detail.value;
    },
    // 发送短信验证码
    sendPin() {
      // 此时点击才有效
      if (this.pinContent === "获取验证码") {
        // 开启倒计时60S
        this.countDown("timer", "pinContent", 60);
        this.loadPin();
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
      this.$api("user", "getPinByToken", {
        type: 3
      }).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.message);
        }
      });
    },
    // 提交
    handlerSubmit(formName) {
      // 校验
      this.$refs[formName].$$wxCustomComponent.validate((valid, errors) => {
        if (valid) {
          this.loadCheckPin();
        } else {
          const firstError = Object.keys(errors);
          if (firstError.length) {
            this.errorMessage = errors[firstError[0]].message;
          }
        }
      });
    },
    loadCheckPin() {
      this.isLoading = true;
      this.$api("user", "checkOldPhonePin", {
        type: 3,
        ...this.form
      }).then((res) => {
        this.isLoading = false;
        if (res.code === 0) {
          this.$store.commit("updateOldPhoneToken", res.smsCodeCheckToken);
          this.hideContent().then(() => {
            this.$emit("complete", true);
          });
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.phone-approve-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  --animate-duration: 400ms;

  .mask {
    position: absolute;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .phone-approve-dialog__content {
    position: absolute;
    z-index: 100;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 600 / @rem;
    background-color: #ffffff;
    border-radius: 30 / @rem 30 / @rem 0 / @rem 0 / @rem;
    .name {
      padding: 40 / @rem 0;
      text-align: center;
      h2 {
        line-height: 58 / @rem;
        font-size: 40 / @rem;
      }
      p {
        line-height: 44 / @rem;
        color: #666666;
      }
    }
    .formpage {
      .weui-form {
        min-height: auto;
        flex: none;
        .weui-form__control-area {
          flex: none;
          .rule-form {
            .weui-cells {
              margin-top: 0;
              &::before,
              &::after {
                display: none;
              }
              .weui-cell {
                height: 110 / @rem;
                padding: 0;
                font-size: 30 / @rem;
                border-bottom: 1 / @rem solid #f2f2f2;
                .wx-input {
                  width: 100%;
                  height: 110 / @rem;
                  line-height: 110 / @rem;
                }
                .wx-input-placeholder {
                  color: #999999;
                }
                .title {
                  padding-right: 30 / @rem;
                }
                .pin {
                  color: @mainColor;
                }
              }
            }
          }
        }
        .weui-form__opr-area {
          padding-top: 90 / @rem;
        }
      }
    }
  }
}
</style>
