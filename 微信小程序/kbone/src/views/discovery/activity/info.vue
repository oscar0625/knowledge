<template>
  <div class="discovery-activity-info-page" v-if="info">
    <my-header bgColor="#f7f7f7">活动详情</my-header>
    <div
      class="picture"
      :style="`background-image: url('${info.imgURL}');`"
    ></div>
    <div class="head wrapper">
      <div class="title">
        {{ info.title }}
      </div>
      <p class="time">
        <span>{{ info.startTime }}</span>
        <i>-</i>
        <span>{{ info.endTime }}</span>
      </p>
      <p class="address">{{ info.actAddress }}</p>
      <p class="company">{{ info.actCompany }}</p>
      <div class="statistics">
        <span class="view-count">
          {{ info.viewCount > 9999 ? "9999+" : info.viewCount }}次</span
        >
      </div>
    </div>
    <div class="detail wrapper">
      <div class="title">活动详情</div>
      <div class="content rich-text" v-html="tinymceFilter"></div>
    </div>
    <div v-if="info.statusName == '报名中'" class="space"></div>
    <!-- 活动收藏报名 -->
    <activity-store
      :showApply="info.statusName == '报名中'"
      :closeTime="info.endTime"
      :isFavorite="info.isFavorite"
      dataType="activity"
      :dataId="$route.query.id"
    />
  </div>
</template>

<script>
import ActivityStore from "@/common/discover/activity_store";
import { decode } from "html-entities";
export default {
  name: "DiscoveryActivityInfoPage",
  components: {
    ActivityStore
  },
  data() {
    return {
      info: null
    };
  },
  computed: {
    tinymceFilter() {
      // 避免解码后影响标签正常解析
      // https://blog.csdn.net/lhy349/article/details/81062558
      return this.info
        ? decode(
            this.info.actContent
              .replace(/\<img/g, '<img class="rich-text-img"')
              .replace(/&lt;/g, "&loscart;")
              .replace(/&gt;/g, "&goscart;")
          )
            .replace(/&loscart;/g, "&lt;")
            .replace(/&goscart;/g, "&gt;")
        : "";
    }
  },
  created() {
    // 下拉刷新
    this.onpulldownrefresh();
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "活动详情"
    });
    this.setNavigationBarColor({
      backgroundColor: "f7f7f7"
    });
    this.loadInfo();
  },
  methods: {
    // 加载数据接口
    loadInfo() {
      this.showWXLoading({
        title: "加载中",
        mask: true
      });
      const { id } = this.$route.query;
      this.$api("information", "getActivityInfo", { id, type: 1 }).then(
        (res) => {
          this.hideWXLoading();
          const { code, message, dataList } = res;
          if (code === 0) {
            this.info = dataList[0];
          } else {
            this.$message.error(message);
          }
        }
      );
    }
  }
};
</script>

<style lang="less">
.discovery-activity-info-page {
  overflow: hidden;
  min-height: 100vh;
  background-color: #f7f7f7;
  .picture {
    height: 422 / @rem;
    background-size: cover;
    background-position: center;
  }
  .head {
    margin-top: -30 / @rem;
    border-radius: 30 / @rem;
    background-color: #ffffff;
    .title {
      padding: 40 / @rem 0 25 / @rem;
      line-height: 62 / @rem;
      font-size: 42 / @rem;
      font-weight: 800;
      color: #000000;
    }
    > p {
      line-height: 50 / @rem;
      padding-left: 40 / @rem;
      background-size: auto 30 / @rem;
      background-repeat: no-repeat;
      background-position: 0 10 / @rem;
      &.time {
        background-image: url("~@/assets/images/validity_icon_black.png");
      }
      &.address {
        background-image: url("~@/assets/images/location_icon.png");
      }
      &.company {
        background-image: url("~@/assets/images/company_icon_gray.png");
      }
      i {
        padding: 0 10 / @rem;
      }
    }
    .statistics {
      padding: 12 / @rem 0 30 / @rem;
      .view-count {
        padding-left: 40 / @rem;
        line-height: 1;
        color: #999999;
        background-size: 24 / @rem;
        background-position: 3 / @rem center;
        background-repeat: no-repeat;
        background-image: url("~@/assets/images/pageview_icon_gray.png");
      }
    }
  }
  .detail {
    margin: 30 / @rem 0 130 / @rem;
    border-radius: 30 / @rem;
    background-color: #ffffff;
    .title {
      width: 303 / @rem;
      margin: 0 auto;
      line-height: 65 / @rem;
      text-align: center;
      font-size: 34 / @rem;
      font-weight: 800;
      color: #ffffff;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url("~@/assets/images/activity_info_detail.png");
    }
    .content {
      padding: 30 / @rem 0;
      font-size: 30 / @rem;
    }
  }
  .space {
    padding-top: 46 / @rem;
  }
}
</style>
