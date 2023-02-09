<template>
  <div class="user-docking-manage-page">
    <my-header>{{
      (this.dataTypeName === "achievement" ? "成果" : "需求") + "对接"
    }}</my-header>
    <div class="docking-manage-toolbar">
      <span
        >共<b>{{ total }}</b
        >个项目工程</span
      >
      <div class="create" @click="showCreateProject = true">新建工程</div>
    </div>
    <div class="docking-manage-list wrapper">
      <div class="result">
        <template v-if="queryResult && queryResult.length === 0">
          <no-data class="nodata">您还没有创建过项目</no-data>
        </template>
        <template v-else>
          <project-list :dataList="queryResult" :dataType="dataTypeName" />
        </template>
      </div>
    </div>
    <backtop v-if="showBack" />
    <create-project
      :visible.sync="showCreateProject"
      :dataType="dataTypeName"
      @complete="createComplete"
    />
  </div>
</template>

<script>
import Backtop from "@/common/backtop";
import noData from "@/common/no_data";
import ProjectList from "@/common/user/project_list";
import CreateProject from "@/common/user/create_project";
export default {
  name: "UserDockingList",
  components: {
    Backtop,
    noData,
    ProjectList,
    CreateProject
  },
  data() {
    return {
      // 是否显示返回顶部
      showBack: false,
      dataTypeName: "",
      type: { achievement: 1, demand: 2 },
      // 是否还有数据可以进行下拉加载
      canLoadNextPage: false,
      queryCondition: {
        dateOrder: 1,
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      queryResult: null,
      // 创建工程弹框
      showCreateProject: false
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
      title: (this.dataTypeName === "achievement" ? "成果" : "需求") + "对接"
    });
    // 加载数据
    this.loadList();
  },
  methods: {
    // 获取列表
    loadList(clear = true) {
      this.showWXLoading({ type: "nav" });
      return this.$api("project", "getUserProjectListPro", {
        ...this.queryCondition,
        dockingType: this.type[this.dataTypeName]
      }).then((res) => {
        this.hideWXLoading({ type: "nav" });
        const { pageIndex, pageSize } = this.queryCondition;
        this.canLoadNextPage = pageIndex * pageSize < res.count;
        this.total = res.count;
        if (clear) {
          this.queryResult = res.projectList;
        } else {
          this.queryResult.push.apply(this.queryResult, res.projectList);
        }
        // 如果是添加数据则显示返回
        this.showBack = !clear;
      });
    },
    // 创建工程完成回调
    createComplete() {
      this.queryCondition.pageIndex = 1;
      this.loadList();
    }
  }
};
</script>

<style lang="less">
.user-docking-manage-page {
  min-height: 100vh;
  background-color: #f7f7f7;

  .docking-manage-toolbar {
    display: flex;
    justify-content: space-between;
    padding: 20 / @rem 30 / @rem 60 / @rem;
    font-size: 28 / @rem;
    background-color: #fff;
    span {
      line-height: 66 / @rem;
      b {
        font-weight: normal;
        color: #d91717;
      }
    }
    .create {
      padding: 0 30 / @rem 0 70 / @rem;
      border: 1 / @rem solid #00a0e9;
      line-height: 64 / @rem;
      color: @mainColor;
      border-radius: 33 / @rem;
      background-image: url("~@/assets/images/icon_add.png");
      background-size: 26 / @rem auto;
      background-repeat: no-repeat;
      background-position: 30 / @rem center;
    }
  }
  .docking-manage-list {
    margin-top: -30 / @rem;
    border-radius: 30 / @rem 30 / @rem 0 / @rem 0 / @rem;
    background-color: #f7f7f7;
    .result {
      .nodata {
        padding-top: 140 / @rem;
      }
    }
  }
}
</style>
