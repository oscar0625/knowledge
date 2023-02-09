<template>
  <div class="user-issue-manage-page">
    <my-header>{{
      "发布" + (this.dataTypeName === "achievement" ? "成果" : "需求")
    }}</my-header>
    <div class="issue-manage-toolbar">
      <span
        >共发布<b>{{ total }}</b
        >个{{ dataTypeName === "achievement" ? "成果" : "需求" }}</span
      >
    </div>
    <div class="issue-manage-list wrapper">
      <div class="result">
        <template v-if="queryResult && queryResult.length === 0">
          <no-data type="issue" class="nodata" />
        </template>
        <template v-else>
          <template v-if="dataTypeName === 'achievement'">
            <issue-ach-list :dataList="queryResult" />
          </template>
          <template v-if="dataTypeName === 'demand'">
            <issue-demand-list :dataList="queryResult" />
          </template>
        </template>
      </div>
    </div>
    <backtop v-if="showBack" />
  </div>
</template>

<script>
import Backtop from "@/common/backtop";
import noData from "@/common/no_data";
import issueDemandList from "@/common/user/issue_demand_list";
import issueAchList from "@/common/user/issue_ach_list";
export default {
  name: "UserIssueList",
  components: {
    Backtop,
    noData,
    issueDemandList,
    issueAchList
  },
  data() {
    return {
      // 是否显示返回顶部
      showBack: false,
      dataTypeName: "",
      // 是否还有数据可以进行下拉加载
      canLoadNextPage: false,
      queryCondition: {
        createBy: "",
        state: -1,
        dateOrder: 0,
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      queryResult: null
    };
  },
  created() {
    // 下拉刷新
    this.onpulldownrefresh(() => {
      this.queryCondition.pageIndex = 1;
      this.loadList();
    });
    // 加载更多
    this.onreachbottom(() => {
      if (this.canLoadNextPage) {
        this.queryCondition.pageIndex = this.queryCondition.pageIndex + 1;
        this.loadList(false);
      }
    });
    this.dataTypeName = this.$route.params.type;
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "发布" + (this.dataTypeName === "achievement" ? "成果" : "需求")
    });
    // 加载数据
    this.loadList();
  },
  methods: {
    // 获取列表
    loadList(clear = true) {
      this.showWXLoading({ type: "nav" });
      return this.$api(
        this.dataTypeName,
        "getIssueList",
        this.queryCondition
      ).then((res) => {
        this.hideWXLoading({ type: "nav" });
        const { pageIndex, pageSize } = this.queryCondition;
        this.canLoadNextPage = pageIndex * pageSize < res.count;
        this.total = res.count;
        if (clear) {
          this.queryResult = res.dataList;
        } else {
          this.queryResult.push.apply(this.queryResult, res.dataList);
        }
        // 如果是添加数据则显示返回
        this.showBack = !clear;
      });
    }
  }
};
</script>

<style lang="less">
.user-issue-manage-page {
  min-height: 100vh;
  background-color: #f7f7f7;

  .issue-manage-toolbar {
    padding: 20 / @rem 30 / @rem 60 / @rem;
    text-align: center;
    font-size: 28 / @rem;
    background-color: #fff;
    span {
      line-height: 66 / @rem;
      b {
        font-weight: normal;
        color: #d91717;
      }
    }
  }
  .issue-manage-list {
    margin-top: -30 / @rem;
    border-radius: 30 / @rem 30 / @rem 0 / @rem 0 / @rem;
    background-color: #f7f7f7;
    .result {
      padding-top: 30 / @rem;
      .nodata {
        padding-top: 140 / @rem;
      }
    }
  }
}
</style>
