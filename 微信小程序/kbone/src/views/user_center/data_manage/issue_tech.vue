<template>
  <div class="user-issue-page">
    <my-header>发布</my-header>
    <div class="wrapper">
      <div class="content">
        <mp-toptips
          type="error"
          :show="!!errorMessage"
          :msg="errorMessage"
          @hide="errorMessage = ''"
        ></mp-toptips>
        <div class="space"></div>
        <mp-form-page class="formpage">
          <mp-form class="form" ref="ruleForm" :rules="rules" :models="form">
            <mp-cells>
              <mp-cell show-error="true" prop="specialFieldId">
                <div slot="title">
                  <div class="title auto">专业领域</div>
                </div>
                <div class="select-container">
                  <enumerate
                    url="/api/achievement/getimspecialfield"
                    :value="form.specialFieldId"
                    placeholder="请填写专业领域（必填）"
                    @change="
                      (v) => {
                        onSelectChange(v, 'specialFieldId');
                      }
                    "
                  >
                  </enumerate>
                </div>
              </mp-cell>
            </mp-cells>
          </mp-form>
        </mp-form-page>
        <div class="space"></div>
        <mp-form-page class="formpage">
          <mp-form class="form" ref="ruleForm" :rules="rules" :models="form">
            <mp-cells>
              <div class="vertical-title">成果类型：技术类</div>
              <mp-cell show-error="true" prop="name">
                <wx-input
                  class="wx-input"
                  :value="form.name"
                  data-field="name"
                  placeholder="请填写成果标题（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="50"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
              <mp-cell show-error="true" prop="description">
                <my-textarea
                  :value="form.description"
                  :maxlength="2000"
                  placeholder="请填写详情介绍（必填）"
                  @change="
                    (v) => {
                      onSelectChange(v, 'description');
                    }
                  "
                />
              </mp-cell>
              <mp-cell show-error="true">
                <image-upload
                  url="/api/Achievement/UploadAchiAttach"
                  :fileList="form.imgUploadList"
                  :numLimit="5"
                  @change="
                    (v) => {
                      onSelectChange(v, 'imgUploadList');
                    }
                  "
                ></image-upload>
              </mp-cell>
              <mp-cell show-error="true" prop="technicalMaturity">
                <div slot="title">
                  <div class="title">技术成熟度</div>
                </div>
                <div class="select-container">
                  <enumerate
                    url="/api/Achievement/GetTecMaturity"
                    :value="form.technicalMaturity"
                    placeholder="请填写技术成熟度（必填）"
                    @change="
                      (v) => {
                        onSelectChange(v, 'technicalMaturity');
                      }
                    "
                  >
                  </enumerate>
                </div>
              </mp-cell>
              <mp-cell show-error="true" prop="advancedLevel">
                <div slot="title">
                  <div class="title">先进程度</div>
                </div>
                <div class="select-container">
                  <enumerate
                    url="/api/Achievement/GetAdvanceLevel"
                    :value="form.advancedLevel"
                    placeholder="请填写先进程度（必填）"
                    @change="
                      (v) => {
                        onSelectChange(v, 'advancedLevel');
                      }
                    "
                  >
                  </enumerate>
                </div>
              </mp-cell>
              <mp-cell show-error="true" prop="closingTime">
                <div slot="title">
                  <div class="title">截止时间</div>
                </div>
                <wx-picker
                  class="wx-picker"
                  mode="date"
                  :value="form.closingTime"
                  data-field="closingTime"
                  @change="onFormInputChange"
                >
                  <div :class="form.closingTime.length === 0 && 'unselect'">
                    {{ form.closingTime || "请填写截止时间" }}
                  </div>
                </wx-picker>
              </mp-cell>
              <mp-cell show-error="true" prop="technologyKeyword">
                <div slot="title">
                  <div class="title">技术关键词</div>
                </div>
                <wx-input
                  class="wx-input"
                  :value="form.technologyKeyword"
                  data-field="technologyKeyword"
                  placeholder="请填写技术关键词（必填）"
                  placeholder-class="wx-input-placeholder"
                  maxlength="50"
                  @input="onFormInputChange"
                ></wx-input>
              </mp-cell>
            </mp-cells>
          </mp-form>
        </mp-form-page>
      </div>
      <div class="btn">
        <div class="prompt">
          点击发布，即表示已阅读并同意
          <a href="">《发布协议》</a>
        </div>
        <wx-button
          class="common-btn"
          type="primary"
          :disabled="isLoading"
          :loading="isLoading"
          @click="handlerSubmit('ruleForm')"
          >发布</wx-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Enumerate from "@/common/enumerate";
import MyTextarea from "@/common/my_textarea";
import ImageUpload from "@/common/image_upload";
export default {
  name: "UserIssueTech",
  components: {
    Enumerate,
    MyTextarea,
    ImageUpload
  },
  data() {
    return {
      errorMessage: "",
      isLoading: false,
      // 是添加数据还是修改数据 默认true 添加数据
      isAdd: true,
      rules: [
        {
          name: "specialFieldId",
          rules: { required: true, message: "请填写专业领域" }
        },
        {
          name: "name",
          rules: { required: true, message: "请填写成果标题" }
        },
        {
          name: "description",
          rules: { required: true, message: "请填写详情介绍" }
        },
        {
          name: "technicalMaturity",
          rules: { required: true, message: "请填写技术成熟度" }
        },
        {
          name: "advancedLevel",
          rules: { required: true, message: "请填写先进程度" }
        },
        {
          name: "closingTime",
          rules: [
            {
              validator: (rule, value) => {
                if (value && Date.now() - Date.parse(value) > 0) {
                  return "截止时间不可以早于当前时间";
                }
                return "";
              }
            }
          ]
        },
        {
          name: "technologyKeyword",
          rules: { required: true, message: "请填写技术关键词" }
        }
      ],
      form: {
        // 发布类型 技术1 产品2
        type: 1,
        specialFieldId: "",
        name: "",
        description: "",
        technicalMaturity: "",
        advancedLevel: "",
        closingTime: "",
        technologyKeyword: "",
        imgUploadList: []
      }
    };
  },
  created() {
    // 下拉刷新
    this.onpulldownrefresh();
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "发布"
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
        // 获取用户信息
        this.$store.dispatch("getInfo", this).then((info) => {
          this.loadCerInfo(info);
        });
        break;
    }
  },
  methods: {
    // 加载认证信息
    loadCerInfo(info) {
      // 如果info没数据、如果不是添加 退出
      if (!info.userOrCompany || !this.isAdd) return;
      // 判定是企业还是个人
      const { userOrCompany, id, companyId } = info;
      let name, uid;
      switch (userOrCompany) {
        case 1:
          name = "getPerCerInfo";
          uid = id;
          break;
        case 2:
          name = "getCerInfo";
          uid = companyId;
          break;
      }
      this.$api("certification", name, { id: uid }).then((res) => {
        const { code } = res;
        if (code === 0) {
          const {
            name = "",
            certifierName = "",
            registerAddress = "",

            linkMode = "",
            certifierPhoneNumber = "",
            provinceCode = "",
            cityCode = "",
            districtCode = ""
          } = res.dataList[0];
          const params =
            userOrCompany === 1
              ? {
                  contact: name,
                  provinceCode,
                  cityCode,
                  districtCode,
                  phoneNumber: linkMode
                }
              : {
                  companyName: name,
                  provinceCode,
                  cityCode,
                  districtCode,
                  address: registerAddress,
                  contact: certifierName,
                  phoneNumber: certifierPhoneNumber
                };
          this.form = {
            ...this.form,
            ...params
          };
        }
      });
    },
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
        // integer
        specialFieldId,
        technicalMaturity,
        advancedLevel,
        // list
        imgUploadList,
        ...others
      } = this.form;
      // 处理字符串 转为数字
      const turnNumber = {
        specialFieldId,
        technicalMaturity,
        advancedLevel
      };
      Object.keys(turnNumber).map((key) => {
        turnNumber[key] = turnNumber[key] === "" ? -1 : turnNumber[key];
      });
      return {
        ...others,
        ...turnNumber,
        imgFiles: imgUploadList.filter((item) => {
          return !item.error;
        })
      };
    },
    // 逆向处理数据 获取后进行数据处理回显
    downloadProcessData(data) {
      const {
        achvType,
        closingTime,
        // -1 => ""
        specialFieldId,
        technicalMaturity,
        advancedLevel,
        // list
        imgFiles,
        ...others
      } = data;
      // 处理数字 转为字符串
      const turnNumber = {
        specialFieldId,
        technicalMaturity,
        advancedLevel
      };
      Object.keys(turnNumber).map((key) => {
        turnNumber[key] = turnNumber[key] === -1 ? "" : turnNumber[key];
      });
      return {
        ...others,
        ...turnNumber,
        type: achvType,
        closingTime: closingTime.split(/\s+/)[0],
        imgUploadList: imgFiles
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
      this.$api("achievement", "addTechAch", params).then((res) => {
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
      this.$api("achievement", "addTechAch", {
        ...params,
        id
      }).then((res) => {
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
      this.$api("achievement", "getAchInfo", { id }).then((res) => {
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
.user-issue-page {
  min-height: 100vh;
  background: #f7f7f7;
  border-radius: 30 / @rem 30 / @rem 0 / @rem 0 / @rem;
  .content {
    .space {
      padding-top: 30 / @rem;
    }
    .formpage {
      .weui-form {
        padding-top: 30 / @rem;
        border-radius: 30 / @rem;
        .weui-form__control-area {
          .form {
            .weui-cells {
              margin-top: 0;
              &::before,
              &::after {
                display: none;
              }
              .vertical-title {
                line-height: 1;
                font-size: 30 / @rem;
                color: #141414;
                padding-bottom: 30 / @rem;
              }
              .weui-cell {
                padding: 0 0 30 / @rem;
                font-size: 30 / @rem;
                color: #141414;
                .wx-input,
                .wx-picker {
                  box-sizing: border-box;
                  width: 100%;
                  height: 66 / @rem;
                  padding-left: 20 / @rem;
                  line-height: 66 / @rem;
                  border-radius: 10 / @rem;
                  background-color: #f7f7f7;
                }
                .wx-input-placeholder,
                .wx-picker .unselect {
                  color: #999999;
                }
                .select-container {
                  box-sizing: border-box;
                  width: 100%;
                  height: 66 / @rem;
                  padding-left: 20 / @rem;
                  border-radius: 10 / @rem;
                  background-color: #f7f7f7;
                }
                .title {
                  width: 150 / @rem;
                  padding-right: 20 / @rem;
                  text-align: right;
                  &.auto {
                    width: auto;
                  }
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
