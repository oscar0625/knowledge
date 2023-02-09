<template>
  <div class="login-username">
    <mp-toptips
      type="error"
      :show="!!errorMessage"
      :msg="errorMessage"
      @hide="errorMessage = ''"
    ></mp-toptips>
    <mp-form-page class="login__formpage">
      <mp-form class="login__form" ref="ruleForm" :rules="rules" :models="form">
        <mp-cells>
          <mp-cell show-error="true" prop="account">
            <wx-input
              class="wx-input"
              :value="form.account"
              type="nickname"
              data-field="account"
              placeholder="请输入用户名"
              placeholder-class="wx-input-placeholder"
              maxlength="20"
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
  </div>
</template>

<script>
export default {
  name: "LoginUsername",
  data() {
    return {
      errorMessage: "",
      isLoading: false,
      rules: [
        {
          name: "account",
          rules: { required: true, message: "请输入用户名" }
        }
      ],
      form: {
        account: ""
      }
    };
  },
  created() {
    this.hideHomeBtn();
  },
  methods: {
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
          this.loadCommit();
        } else {
          const firstError = Object.keys(errors);
          if (firstError.length) {
            this.errorMessage = errors[firstError[0]].message;
          }
        }
      });
    },
    loadCommit() {
      this.isLoading = true;
      this.$api("login", "addUserName", {
        ...this.form
      }).then((res) => {
        this.isLoading = false;
        if (res.code === 0) {
          this.$message({
            type: "success",
            message: "添加用户名成功"
          });
          this.redirectByPath(this.$route.query.path || "/");
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.login-username {
}
</style>
