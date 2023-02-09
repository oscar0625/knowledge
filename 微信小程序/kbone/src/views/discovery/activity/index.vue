<template>
  <div class="discovery-activity-list-page">
    <my-header bgColor="#f7f7f7">活动列表</my-header>
    <!-- <div class="tab">
      <a
        v-for="(v, k) in tabTypes"
        :key="k"
        :class="{ active: currentType === k }"
        href="javascript:;"
        @click="handleType(k)"
      >
        {{ v.name }}
      </a>
    </div> -->
    <div class="result wrapper">
      <div v-for="item in queryResult" :key="item.id">
        <activity-list-item
          :info="item"
          :showApply="item.statusName == '报名中'"
          @apply="handleApply"
        />
      </div>
    </div>
    <backtop v-if="showBack" />
    <activity-apply
      :visible.sync="showActivityApply"
      :dataId="activityApplyId"
    />
  </div>
</template>

<script>
import Backtop from "@/common/backtop";
import ActivityListItem from "@/common/discover/activity_list_item";
import ActivityApply from "@/common/discover/activity_apply";
export default {
  name: "DiscoveryActivityListPage",
  components: {
    Backtop,
    ActivityListItem,
    ActivityApply
  },
  data() {
    return {
      // 是否显示返回顶部
      showBack: false,
      // 类型
      currentType: "all",
      tabTypes: {
        recommend: {
          name: "推荐活动",
          type: 1
        },
        future: {
          name: "即将开始",
          type: 2
        },
        all: {
          name: "全部活动",
          type: 3
        }
      },
      // 是否还有数据可以进行下拉加载
      canLoadNextPage: false,
      queryCondition: {
        actType: -1,
        status: -1,
        orderBy: 1,
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      queryResult: [],
      activityApplyId: "",
      showActivityApply: false
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
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "活动列表"
    });
    this.setNavigationBarColor({
      backgroundColor: "f7f7f7"
    });
    // 加载数据
    this.loadList();
  },
  methods: {
    // 修改类型
    handleType(type) {
      if (this.currentType === type) return;
      this.currentType = type;
      this.queryResult = [];
      this.queryCondition.pageIndex = 1;
      this.loadList();
    },
    // 获取列表
    loadList(clear = true) {
      this.showWXLoading({ type: "nav" });
      return this.$api("information", "getActivitylist", {
        ...this.queryCondition,
        type: this.tabTypes[this.currentType].type
      }).then((res) => {
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
    },
    handleApply(id) {
      this.activityApplyId = id;
      this.showActivityApply = true;
    }
  }
};
</script>

<style lang="less">
.discovery-activity-list-page {
  min-height: 100vh;
  background-color: #f7f7f7;
  .tab {
    padding: 30 / @rem 0 44 / @rem;
    display: flex;
    justify-content: space-evenly;
    background-color: #fff;
    a {
      position: relative;
      padding-bottom: 5 / @rem;
      line-height: 54 / @rem;
      font-size: 34 / @rem;
      &.active {
        font-weight: 800;
        color: #000000;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 42 / @rem;
          height: 5 / @rem;
          background: linear-gradient(90deg, #0c40d4 0%, #245bf4 100%);
          border-radius: 3 / @rem;
          transform: translateX(-50%);
        }
      }
    }
  }
  .result {
    overflow: hidden;
    padding-top: 30 / @rem;
    // margin-top: -30 / @rem;
    // border-radius: 30 / @rem 30 / @rem 0 0;
    background-color: #f7f7f7;
    > div {
      margin-bottom: 30 / @rem;
    }
  }
}
</style>
