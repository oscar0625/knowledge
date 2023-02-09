<template>
  <div v-if="visible">
    <wx-animation ref="activityApply" class="activity-apply-dialog">
      <div class="mask" @click="hideContent"></div>
      <mp-toptips
        type="error"
        :show="!!errorMessage"
        :msg="errorMessage"
        @hide="errorMessage = ''"
      ></mp-toptips>
      <div class="activity-apply-dialog__content">
        <div class="name">
          <h2>报名信息填写</h2>
        </div>
        <mp-form-page class="formpage">
          <mp-form
            class="rule-form"
            ref="ruleForm"
            :rules="rules"
            :models="form"
          >
            <mp-cells>
              <mp-cell show-error="true" prop="linkMan">
                <wx-input
                  class="wx-input"
                  :value="form.linkMan"
                  data-field="linkMan"
                  placeholder="请输入联系人（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="15"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="companyName">
                <wx-input
                  class="wx-input"
                  :value="form.companyName"
                  data-field="companyName"
                  placeholder="请输入公司名称（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="50"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="duty">
                <wx-input
                  class="wx-input"
                  :value="form.duty"
                  data-field="duty"
                  placeholder="请输入职务（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="50"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="linkPhone">
                <wx-input
                  class="wx-input"
                  :value="form.linkPhone"
                  data-field="linkPhone"
                  type="number"
                  placeholder="请输入联系电话（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="11"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="email">
                <wx-input
                  class="wx-input"
                  :value="form.email"
                  data-field="email"
                  placeholder="请输入邮箱"
                  placeholder-class="wx-input-placeholder"
                  @input="onFormInputChange"
                ></wx-input>
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
              >立即报名</wx-button
            >
          </div>
        </mp-form-page>
      </div>
    </wx-animation>
  </div>
</template>

<script>
import CheckObj from "@/utils/check.js";
export default {
  name: "ActivityApply",
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    dataId: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      errorMessage: "",
      isLoading: false,
      rules: [
        {
          name: "linkMan",
          rules: [
            { required: true, message: "请输入联系人" },
            {
              validator: (rule, value) => {
                if (value && !CheckObj.checkChineseName(value)) {
                  return "请填写正确的中文姓名";
                }
                return "";
              }
            }
          ]
        },
        {
          name: "companyName",
          rules: { required: true, message: "请输入公司名称" }
        },
        {
          name: "duty",
          rules: { required: true, message: "请输入职务" }
        },
        {
          name: "linkPhone",
          rules: [
            { required: true, message: "请输入联系电话" },
            { mobile: true, message: "请输入正确的手机号" }
          ]
        },
        {
          name: "email",
          rules: {
            validator: (rule, value) => {
              if (value && !CheckObj.checkEmail(value)) {
                return "请输入正确的邮箱";
              }
              return "";
            }
          }
        }
      ],
      form: {
        linkMan: "",
        companyName: "",
        duty: "",
        linkPhone: "",
        email: ""
      }
    };
  },
  watch: {
    visible: "showContent"
  },
  methods: {
    // 如果 visible 为 true 则显示
    showContent() {
      this.$nextTick(() => {
        if (this.visible) {
          this.animShowElement(this.$refs.activityApply, "animate__fadeIn");
        }
      });
    },
    // 隐藏内容 并将 visible 置为 false
    hideContent() {
      return new Promise((resolve, reject) => {
        this.animHideElement(
          this.$refs.activityApply,
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
    // 提交
    handlerSubmit(formName) {
      // 校验
      this.$refs[formName].$$wxCustomComponent.validate((valid, errors) => {
        if (valid) {
          this.loadApply();
        } else {
          const firstError = Object.keys(errors);
          if (firstError.length) {
            this.errorMessage = errors[firstError[0]].message;
          }
        }
      });
    },
    loadApply() {
      this.isLoading = true;
      this.$api("information", "applyActivity", {
        ...this.form,
        actId: this.dataId
      }).then((res) => {
        this.isLoading = false;
        this.$message({
          message: res.message,
          type: res.code === 0 ? "success" : "error"
        });
        if (res.code === 0) {
          this.hideContent().then(() => {
            this.$emit("complete", true);
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.activity-apply-dialog {
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

  .activity-apply-dialog__content {
    position: absolute;
    z-index: 100;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 850 / @rem;
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
                height: 108 / @rem;
                padding: 0;
                font-size: 30 / @rem;
                border-bottom: 1 / @rem solid #f2f2f2;
                .wx-input {
                  width: 100%;
                  height: 108 / @rem;
                  line-height: 108 / @rem;
                }
                .wx-input-placeholder {
                  color: #999999;
                }
              }
            }
          }
        }
        .weui-form__opr-area {
          padding-top: 45 / @rem;
        }
      }
    }
  }
}
</style>
