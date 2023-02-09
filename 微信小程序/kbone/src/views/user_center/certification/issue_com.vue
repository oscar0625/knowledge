<template>
  <div class="user-issuecomcer-page">
    <my-header>企业认证</my-header>
    <div class="wrapper">
      <div class="content">
        <mp-toptips
          type="error"
          :show="!!errorMessage"
          :msg="errorMessage"
          @hide="errorMessage = ''"
        ></mp-toptips>
        <div class="prompt">填写企业基本信息</div>
        <mp-form-page class="formpage">
          <mp-form class="form" ref="ruleForm" :rules="rules" :models="form">
            <mp-cells>
              <mp-cell show-error="true" prop="name">
                <div slot="title">
                  <div class="title">公司名称</div>
                </div>
                <wx-input
                  class="wx-input"
                  :value="form.name"
                  data-field="name"
                  placeholder="请填写公司名称（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="50"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="companyUniqueCode">
                <div slot="title">
                  <div class="title">机构代码</div>
                </div>
                <wx-input
                  class="wx-input"
                  :value="form.companyUniqueCode"
                  data-field="companyUniqueCode"
                  placeholder="请填写统一社会信用代码（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="50"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="address">
                <div slot="title">
                  <div class="title">通信地址</div>
                </div>
                <div class="select-container">
                  <region
                    :value="form.address"
                    placeholder="请填写通信地址（必填）"
                    @change="
                      (v) => {
                        onSelectChange(v, 'address');
                      }
                    "
                  >
                  </region>
                </div>
              </mp-cell>
              <mp-cell show-error="true" prop="registerAddress">
                <div slot="title">
                  <div class="title">详细地址</div>
                </div>
                <wx-input
                  class="wx-input"
                  :value="form.registerAddress"
                  data-field="registerAddress"
                  placeholder="请填写详细地址（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="50"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="foundingTime">
                <div slot="title">
                  <div class="title">成立时间</div>
                </div>
                <wx-picker
                  class="wx-picker"
                  mode="date"
                  :value="form.foundingTime"
                  data-field="foundingTime"
                  @change="onFormInputChange"
                >
                  <div :class="form.foundingTime.length === 0 && 'unselect'">
                    {{ form.foundingTime || "请填写成立时间（必填）" }}
                  </div>
                </wx-picker>
              </mp-cell>
              <mp-cell show-error="true" prop="legalPerson">
                <div slot="title">
                  <div class="title">法人姓名</div>
                </div>
                <wx-input
                  class="wx-input"
                  :value="form.legalPerson"
                  data-field="legalPerson"
                  placeholder="请填写法人姓名（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="15"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="phoneNumber">
                <div slot="title">
                  <div class="title">企业电话</div>
                </div>
                <wx-input
                  class="wx-input"
                  :value="form.phoneNumber"
                  data-field="phoneNumber"
                  type="number"
                  placeholder="请填写企业电话（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="11"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="rtatType">
                <div slot="title">
                  <div class="title">企业类型</div>
                </div>
                <div class="select-container">
                  <enumerate
                    url="/api/user/comtypeenum"
                    :value="form.rtatType"
                    placeholder="请填写企业类型（必填）"
                    @change="
                      (v) => {
                        onSelectChange(v, 'rtatType');
                      }
                    "
                  >
                  </enumerate>
                </div>
              </mp-cell>
              <mp-cell show-error="true" prop="rtatCompanyNature">
                <div slot="title">
                  <div class="title">单位性质</div>
                </div>
                <div class="select-container">
                  <enumerate
                    url="/api/user/comnatureenum"
                    :value="form.rtatCompanyNature"
                    placeholder="请填写单位性质（必填）"
                    @change="
                      (v) => {
                        onSelectChange(v, 'rtatCompanyNature');
                      }
                    "
                  >
                  </enumerate>
                </div>
              </mp-cell>
            </mp-cells>
          </mp-form>
        </mp-form-page>
        <div class="prompt">补充企业认证人联系信息</div>
        <mp-form-page class="formpage">
          <mp-form class="form" ref="ruleForm" :rules="rules" :models="form">
            <mp-cells>
              <mp-cell show-error="true" prop="certifierName">
                <div slot="title">
                  <div class="title">真实姓名</div>
                </div>
                <wx-input
                  class="wx-input"
                  :value="form.certifierName"
                  data-field="certifierName"
                  placeholder="请填写您的真实姓名（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="15"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="certifierPhoneNumber">
                <div slot="title">
                  <div class="title">联系方式</div>
                </div>
                <wx-input
                  class="wx-input"
                  :value="form.certifierPhoneNumber"
                  data-field="certifierPhoneNumber"
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
          >提交审核</wx-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import CheckObj from "@/utils/check.js";
import Region from "@/common/region";
import Enumerate from "@/common/enumerate";
export default {
  name: "UserIssueComCer",
  components: {
    Region,
    Enumerate
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
          rules: { required: true, message: "请填写公司名称" }
        },
        {
          name: "companyUniqueCode",
          rules: [
            { required: true, message: "请填写统一社会信用代码" },
            {
              validator: (rule, value) => {
                if (value && !CheckObj.checkTradingCertificate(value)) {
                  return "请填写正确的统一社会信用代码";
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
                  return "请填写通信地址";
                }
                return "";
              }
            }
          ]
        },
        {
          name: "registerAddress",
          rules: { required: true, message: "请填写详细地址" }
        },
        {
          name: "foundingTime",
          rules: { required: true, message: "请填写成立时间" }
        },
        {
          name: "legalPerson",
          rules: [
            { required: true, message: "请填写法人姓名" },
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
          name: "phoneNumber",
          rules: [
            { required: true, message: "请填写企业电话" },
            { mobile: true, message: "请填写正确的手机号" }
          ]
        },
        {
          name: "rtatType",
          rules: { required: true, message: "请填写企业类型" }
        },
        {
          name: "rtatCompanyNature",
          rules: { required: true, message: "请填写单位性质" }
        },
        {
          name: "certifierName",
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
          name: "certifierPhoneNumber",
          rules: [
            { required: true, message: "请填写联系方式" },
            { mobile: true, message: "请填写正确的手机号" }
          ]
        }
      ],
      form: {
        // 企业联系信息
        name: "",
        companyUniqueCode: "",
        address: [],
        registerAddress: "",
        foundingTime: "",
        legalPerson: "",
        phoneNumber: "",
        rtatType: "",
        rtatCompanyNature: "",
        // 认证人信息
        certifierName: "",
        certifierPhoneNumber: ""
      }
    };
  },
  created() {
    // 下拉刷新
    this.onpulldownrefresh();
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "企业认证"
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
        foundingTime,
        ...others
      } = data;

      return {
        ...others,
        address: [provinceCode, cityCode, districtCode],
        foundingTime: foundingTime.split("T")[0]
      };
    },
    // 提交
    handlerSubmit(formName) {
      // 校验
      this.$refs[formName].$$wxCustomComponent.validate((valid, errors) => {
        if (valid) {
          this.isAdd ? this.loadAddData() : this.loadModifyData();
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
      this.$api("certification", "addCer", params).then((res) => {
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
    // 加载修改数据接口
    loadModifyData() {
      this.isLoading = true;
      const params = this.processDataSubmit();
      const { id } = this.$route.query;
      this.$api("certification", "modifyCer", { ...params, id }).then((res) => {
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
      this.$api("certification", "getCerInfo", { id }).then((res) => {
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
.user-issuecomcer-page {
  min-height: 100vh;
  background: #f7f7f7;
  border-radius: 30 / @rem 30 / @rem 0 / @rem 0 / @rem;
  .content {
    .prompt {
      padding-left: 27 / @rem;
      font-size: 26 / @rem;
      line-height: 84 / @rem;
      color: #999999;
    }
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
                .wx-input,
                .wx-picker {
                  width: 100%;
                  height: 105 / @rem;
                  line-height: 105 / @rem;
                }
                .wx-input-placeholder,
                .wx-picker .unselect {
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
    padding-bottom: 98 / @rem;
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
