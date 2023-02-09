<template>
  <div class="user-store-up-page">
    <my-header>收藏</my-header>
    <div class="store-up__head">
      <div class="store-up__tab">
        <a
          v-for="(v, k) in tabTypes"
          :key="k"
          :class="{ active: currentType === k }"
          href="javascript:;"
          @click="handleType(k)"
        >
          {{ v.name }}
        </a>
      </div>
    </div>

    <div class="store-up__content wrapper">
      <div class="result">
        <template v-if="isLoading === false && queryResult.length === 0">
          <no-data type="collect" class="nodata" />
        </template>
        <template v-else>
          <template v-if="currentType === 'achievement'">
            <store-ach-list :dataList="queryResult" />
          </template>
          <template v-if="currentType === 'demand'">
            <store-demand-list :dataList="queryResult" />
          </template>
          <template v-if="currentType === 'activity'">
            <div class="activity" v-for="item in queryResult" :key="item.id">
              <activity-list-item
                :info="item"
                :showApply="false"
                :hideApply="true"
                @apply="handleApply"
              />
            </div>
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
import storeDemandList from "@/common/user/store_demand_list";
import storeAchList from "@/common/user/store_ach_list";
import ActivityListItem from "@/common/discover/activity_list_item";
export default {
  name: "UserStoreUpPage",
  components: {
    Backtop,
    noData,
    storeDemandList,
    storeAchList,
    ActivityListItem
  },
  data() {
    return {
      // 是否显示返回顶部
      showBack: false,
      isLoading: true,
      // 类型
      currentType: "achievement",
      tabTypes: {
        achievement: {
          name: "成果",
          apiUrl: "achievementList"
        },
        demand: {
          name: "需求",
          apiUrl: "demandList"
        },
        activity: {
          name: "活动",
          apiUrl: "activityList"
        }
      },

      // 是否还有数据可以进行下拉加载
      canLoadNextPage: false,
      // 筛选条件
      queryCondition: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      queryResult: []
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

    // 加载数据
    loadList(clear = true) {
      this.isLoading = true;
      this.showWXLoading({ type: "nav" });
      this.$api(
        "storeUp",
        this.tabTypes[this.currentType].apiUrl,
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
        this.isLoading = false;
      });
    }
  }
};
</script>

<style lang="less">
.user-store-up-page {
  overflow: hidden;
  min-height: 100vh;
  background: #f7f7f7;
  .store-up__head {
    background-color: #fff;
    .store-up__tab {
      padding: 30 / @rem 0 44 / @rem;
      display: flex;
      justify-content: space-evenly;
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
  }

  .store-up__content {
    // 筛选组件的mask根据此定位
    position: relative;
    margin-top: -30 / @rem;
    border-radius: 30 / @rem 30 / @rem 0 0;
    background-color: #f7f7f7;
    .result {
      padding-top: 30 / @rem;
      .nodata {
        padding-top: 140 / @rem;
      }
      .activity {
        > div {
          margin-bottom: 30 / @rem;
        }
      }
    }
  }
}
</style>
