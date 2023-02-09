<template>
  <div class="user-issuepercer-page">
    <my-header>用户认证</my-header>
    <div class="wrapper">
      <div class="content">
        <mp-toptips
          type="error"
          :show="!!errorMessage"
          :msg="errorMessage"
          @hide="errorMessage = ''"
        ></mp-toptips>
        <mp-form-page class="formpage">
          <mp-form class="form" ref="ruleForm" :rules="rules" :models="form">
            <mp-cells>
              <mp-cell show-error="true" prop="name">
                <div slot="title">
                  <div class="title">真实姓名</div>
                </div>
                <wx-input
                  class="wx-input"
                  :value="form.name"
                  data-field="name"
                  placeholder="请填写您的真实姓名（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="15"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="address">
                <div slot="title">
                  <div class="title">联系地址</div>
                </div>
                <div class="select-container">
                  <region
                    :value="form.address"
                    placeholder="请填写联系地址（必填）"
                    @change="
                      (v) => {
                        onSelectChange(v, 'address');
                      }
                    "
                  >
                  </region>
                </div>
              </mp-cell>
              <mp-cell show-error="true" prop="linkMode">
                <div slot="title">
                  <div class="title">联系方式</div>
                </div>
                <wx-input
                  class="wx-input"
                  :value="form.linkMode"
                  data-field="linkMode"
                  type="number"
                  placeholder="请填写联系方式（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="11"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
            </mp-cells>
          </mp-form>
        </mp-form-page>
      </div>
      <div class="btn">
        <div class="prompt">
          点击提交审核，即表示已阅读并同意
          <a href="">《用户服务协议》</a>
        </div>
        <wx-button
          class="common-btn"
          type="primary"
          :disabled="isLoading"
          :loading="isLoading"
          @click="handlerSubmit('ruleForm')"
          >提交</wx-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import CheckObj from "@/utils/check.js";
import Region from "@/common/region";
export default {
  name: "UserIssuePerCer",
  components: {
    Region
  },
  data() {
    return {
      errorMessage: "",
      isLoading: false,
      // 是添加数据还是修改数据 默认true 添加数据
      isAdd: true,
      rules: [
        {
          name: "name",
          rules: [
            { required: true, message: "请填写您的真实姓名" },
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
          name: "address",
          rules: [
            {
              validator: (rule, value) => {
                if (value.length === 0) {
                  return "请填写联系地址";
                }
                return "";
              }
            }
          ]
        },
        {
          name: "linkMode",
          rules: [
            { required: true, message: "请填写联系方式" },
            { mobile: true, message: "请填写正确的手机号" }
          ]
        }
      ],
      form: {
        name: "",
        address: [],
        linkMode: ""
      }
    };
  },
  created() {
    // 下拉刷新
    this.onpulldownrefresh();
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "用户认证"
    });
    const { method } = this.$route.params;
    // 区分是添加数据/修改数据
    switch (method) {
      case "modify":
        this.isAdd = false;
        // 如果是修改获取信息
        this.loadInfo();
        break;
      case "addition":
      default:
        this.isAdd = true;
        break;
    }
  },
  methods: {
    // 输入绑定
    onFormInputChange(evt) {
      const { field } = evt.currentTarget.dataset;
      this.form = Object.assign({}, this.form); // 拷贝
      this.form[field] = evt.detail.value;
    },
    onSelectChange(value, field) {
      this.form = Object.assign({}, this.form); // 拷贝
      this.form[field] = value;
    },
    // 正向处理数据 将数据处理后提交
    processDataSubmit() {
      const {
        // list
        address,
        ...others
      } = this.form;
      // 省市区
      const [provinceCode = "", cityCode = "", districtCode = ""] = address;
      return {
        ...others,
        provinceCode,
        cityCode,
        districtCode
      };
    },
    // 逆向处理数据 获取后进行数据处理回显
    downloadProcessData(data) {
      const {
        provinceCode = "",
        cityCode = "",
        districtCode = "",
        ...others
      } = data;
      return {
        ...others,
        address: [provinceCode, cityCode, districtCode]
      };
    },
    // 提交
    handlerSubmit(formName) {
      // 校验
      this.$refs[formName].$$wxCustomComponent.validate((valid, errors) => {
        if (valid) {
          this.loadAddData();
        } else {
          const firstError = Object.keys(errors);
          if (firstError.length) {
            this.errorMessage = errors[firstError[0]].message;
          }
        }
      });
    },
    // 加载添加数据接口
    loadAddData() {
      this.isLoading = true;
      const params = this.processDataSubmit();
      this.$api("certification", "addPerCer", params).then((res) => {
        this.isLoading = false;
        this.$message({
          message: res.message,
          type: res.code === 0 ? "success" : "error"
        });
        if (res.code === 0) {
          this.redirectTo();
        }
      });
    },
    // 加载数据接口
    loadInfo() {
      const { id } = this.$route.query;
      this.$api("certification", "getPerCerInfo", { id }).then((res) => {
        const { code, message } = res;
        if (code === 0) {
          this.form = this.downloadProcessData(res.dataList[0]);
        } else {
          this.$message.error(message);
          this.redirectTo();
        }
      });
    },
    // 返回列表页
    redirectTo() {
      this.redirectByPathBlank(`/user`);
    }
  }
};
</script>

<style lang="less">
.user-issuepercer-page {
  min-height: 100vh;
  background: #f7f7f7;
  border-radius: 30 / @rem 30 / @rem 0 / @rem 0 / @rem;
  .content {
    padding-top: 30 / @rem;
    .formpage {
      .weui-form {
        border-radius: 30 / @rem;
        .weui-form__control-area {
          .form {
            .weui-cells {
              margin-top: 0;
              &::before,
              &::after {
                display: none;
              }
              .wx-comp-mp-cell:last-child .weui-cell {
                border-bottom: none;
              }
              .weui-cell {
                height: 105 / @rem;
                padding: 0;
                font-size: 28 / @rem;
                border-bottom: 1 / @rem solid #f2f2f2;
                color: #141414;
                .wx-input {
                  width: 100%;
                  height: 105 / @rem;
                  line-height: 105 / @rem;
                }
                .wx-input-placeholder {
                  color: #999999;
                }
                .select-container {
                  width: 100%;
                  height: 105 / @rem;
                }
                .title {
                  width: 160 / @rem;
                }
              }
            }
          }
        }
      }
    }
  }
  .btn {
    .prompt {
      padding: 30 / @rem 0 98 / @rem;
      line-height: 1;
      text-align: center;
      color: #999999;
      a {
        color: rgba(12, 64, 212, 1);
      }
    }
  }
}
</style>
