<template>
  <div class="user-notification-manage-page">
    <my-header>消息中心</my-header>
    <div class="notification-manage-toolbar">
      <span>
        共{{ countAll }}条，
        <template v-if="queryCondition.isRead === -1"
          >其中{{ countNotRead }}条未读<template v-if="countNotRead > 0"
            >，仅查看<b @click="handleUnread(0)">未读消息</b></template
          >
        </template>
        <template v-if="queryCondition.isRead === 0"
          >查看<b @click="handleUnread(-1)">全部消息</b></template
        ></span
      >
    </div>
    <div class="notification-manage-list wrapper">
      <div class="result">
        <template v-if="queryResult && queryResult.length === 0">
          <no-data class="nodata">暂无任何消息</no-data>
        </template>
        <template v-else>
          <notification-list :dataList="queryResult" />
        </template>
      </div>
    </div>
    <backtop v-if="showBack" />
  </div>
</template>

<script>
import Backtop from "@/common/backtop";
import noData from "@/common/no_data";
import notificationList from "@/common/user/notification_list";
export default {
  name: "UserNotificationList",
  components: {
    Backtop,
    noData,
    notificationList
  },
  data() {
    return {
      // 是否显示返回顶部
      showBack: false,
      // 是否还有数据可以进行下拉加载
      canLoadNextPage: false,
      queryCondition: {
        isRead: -1,
        keyWords: "",
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      countAll: 0,
      countNotRead: 0,
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
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "消息中心"
    });
    // 加载数据
    this.loadList();
  },
  methods: {
    // 点击切换未读/全部
    handleUnread(v) {
      this.queryCondition.isRead = v;
      this.queryCondition.pageIndex = 1;
      this.loadList();
    },
    // 获取列表
    loadList(clear = true) {
      this.showWXLoading({ type: "nav" });
      return this.$api(
        "notification",
        "getNotificationlist",
        this.queryCondition
      ).then((res) => {
        this.hideWXLoading({ type: "nav" });
        const { pageIndex, pageSize } = this.queryCondition;
        this.canLoadNextPage = pageIndex * pageSize < res.count;
        this.total = res.count;
        if (clear) {
          this.queryResult = res.dataList;
          this.countAll = res.countAll;
          this.countNotRead = res.countNotRead;
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
.user-notification-manage-page {
  min-height: 100vh;
  background-color: #f7f7f7;

  .notification-manage-toolbar {
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
  .notification-manage-list {
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
