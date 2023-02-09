<template>
  <div class="notification-list">
    <ul>
      <li
        v-for="item in dataList"
        :key="item.id"
        :class="{
          'mark-read': item.isRead === 1
        }"
      >
        <a :href="`/userNotificationInfo?id=${item.id}`" :target="isBlank">
          <div class="type">
            <div class="left">{{ item.sonTypeName }}</div>
            <div class="right">{{ item.createTime }}</div>
          </div>
          <div class="title">
            <h4 class="fn-text-ellipsis">
              {{ item.title }}
            </h4>
          </div>
          <div class="detail">查看详情</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NotificationList",
  props: {
    dataList: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="less">
.notification-list {
  overflow: hidden;
  li {
    margin-bottom: 30 / @rem;
    border-radius: 20 / @rem;
    background: #ffffff;
    &.mark-read {
      > * {
        opacity: 0.8;
        filter: grayscale(100%);
      }
    }
    > a {
      display: block;
      padding: 0 30 / @rem;
    }
    .type {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 88 / @rem;
      border-bottom: 1 / @rem dashed #f2f2f2;
      line-height: 44 / @rem;
      .left {
        padding-left: 60 / @rem;
        font-size: 30 / @rem;
        color: #000000;
        background-size: auto 44 / @rem;
        background-repeat: no-repeat;
        background-position: 0 center;
        background-image: url("~@/assets/images/notification_icon.png");
      }
      .right {
        color: #999999;
      }
    }

    .title {
      padding-top: 20 / @rem;
      h4 {
        line-height: 54 / @rem;
        font-size: 34 / @rem;
        color: #000000;
        font-weight: 800;
      }
    }
    .detail {
      padding-bottom: 10 / @rem;
      line-height: 64 / @rem;
      background-size: auto 16 / @rem;
      background-repeat: no-repeat;
      background-position: right 0 center;
      background-image: url("~@/assets/images/more_icon.png");
    }
  }
}
</style>
