<template>
  <div class="user-add-match-page">
    <my-header>智能匹配</my-header>
    <mp-toptips
      type="error"
      :show="!!errorMessage"
      :msg="errorMessage"
      @hide="errorMessage = ''"
    ></mp-toptips>
    <div class="wrapper">
      <div class="title">
        <span>输入文本</span>
        <span @click="handleClear">清空</span>
      </div>
      <div class="content">
        <my-textarea
          :value="keywords"
          :maxlength="3000"
          placeholder="请输入"
          @change="
            (v) => {
              keywords = v;
            }
          "
          @confirm="handleCommit"
        />
      </div>
      <div class="explain">
        提示：请填写需要匹配的文本内容（20个字以上），系统将为您匹配与之相关的技术资源;信息越完整，匹配越精准。
      </div>
      <div class="btn">
        <wx-button class="common-btn" type="primary" @click="handleCommit"
          >提交</wx-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import MyTextarea from "@/common/my_textarea";
export default {
  name: "UserMatch",
  components: {
    MyTextarea
  },
  data() {
    return {
      errorMessage: "",
      keywords: ""
    };
  },
  created() {
    // 下拉刷新
    this.onpulldownrefresh();
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "智能匹配"
    });
  },
  methods: {
    handleClear() {
      this.keywords = "";
    },
    handleCommit() {
      // 校验
      if (this.keywords.length < 20) {
        return (this.errorMessage = "请填写20个字以上需要匹配的文本内容");
      }
      this.redirectByPathBlank("/userMatchList", { keywords: this.keywords });
    }
  }
};
</script>

<style lang="less">
.user-add-match-page {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90 / @rem;
    padding-top: 20 / @rem;
    span {
      &:first-child {
        font-size: 34 / @rem;
      }
      &:last-child {
        padding-left: 45 / @rem;
        line-height: 40 / @rem;
        font-size: 28 / @rem;
        color: #666666;
        background-size: auto 30 / @rem;
        background-image: url("~@/assets/images/delete_icon.png");
        background-repeat: no-repeat;
        background-position: left 3 / @rem;
      }
    }
  }
  .explain {
    padding-top: 23 / @rem;
    line-height: 42 / @rem;
    font-size: 28 / @rem;
    color: #999999;
  }
  .btn {
    padding: 90 / @rem 60 / @rem 0;
  }
}
</style>
