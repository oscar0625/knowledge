<template>
  <div class="user-notification-info-page" v-if="info">
    <my-header>消息中心</my-header>
    <div class="user-notification-info-advice wrapper">
      <div class="title">{{ info.title }}</div>
      <div class="detail">
        <p>用户您好！</p>
        <p>
          {{ info.content }}
        </p>
      </div>
      <ul v-if="info.jsonContent" class="other">
        <li v-for="(v, k) in info.jsonContent" :key="k">
          <span>{{ k }}</span>
          <template v-if="v === '失败'">
            <b class="status-color error">{{ v }}</b>
          </template>
          <template v-else-if="v === '成功'">
            <b class="status-color success">{{ v }}</b>
          </template>
          <template v-else>
            <b>{{ v }}</b>
          </template>
        </li>
      </ul>
    </div>
    <div class="ewm">
      <my-ewm />
    </div>
  </div>
</template>
<script>
import MyEwm from "@/common/my_ewm";
export default {
  name: "UserNotificationInfo",
  components: {
    MyEwm
  },
  data() {
    return {
      info: null
    };
  },
  created() {
    // 下拉刷新
    this.onpulldownrefresh();
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "消息中心"
    });
    this.loadInfo();
  },
  methods: {
    loadInfo() {
      // 加载数据
      this.showWXLoading({
        title: "加载中",
        mask: true
      });
      const { id } = this.$route.query;
      return this.$api("notification", "getNotificationInfo", {
        id
      }).then(({ model: info }) => {
        this.hideWXLoading();
        this.info = info;
      });
    }
  }
};
</script>
<style lang="less">
.user-notification-info-page {
  overflow: hidden;
  min-height: 100vh;
  .user-notification-info-advice {
    .title {
      padding: 30 / @rem 0 5 / @rem;
      line-height: 54 / @rem;
      font-size: 34 / @rem;
      font-weight: 800;
      color: #000000;
    }
    .detail {
      line-height: 45 / @rem;
      font-size: 30 / @rem;
      color: #000000;
      p {
        padding: 8 / @rem 0;
      }
    }
    .other {
      li {
        display: flex;
        padding: 10 / @rem 0;
        line-height: 40 / @rem;
        font-size: 30 / @rem;
        color: #000000;
        span {
          flex: none;
          min-width: 4em;
          margin-right: 30 / @rem;
          text-align: right;
          color: #999999;
        }
        b {
          font-weight: 400;
        }
      }
    }
    .status-color {
      &.success {
        color: #38b466;
      }
      &.error {
        color: #f23b43;
      }
    }
  }
  .ewm {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 100 / @rem;
  }
}
</style>
