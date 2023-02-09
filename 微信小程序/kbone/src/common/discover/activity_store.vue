<template>
  <div class="activity-store">
    <div v-show="showApply" class="activity-close-time">
      <span>报名截止时间：{{ closeTime }}</span>
    </div>
    <div class="activity-store__content">
      <div
        :class="{
          btn: true,
          'store-btn': true,
          'store-active': isStoreUp
        }"
        @click="handleStore"
      >
        收藏
      </div>
      <wx-button class="share-btn btn" open-type="share">分享</wx-button>
      <div class="apply" v-show="showApply" @click="handleApply">立即报名</div>
    </div>
    <activity-apply :visible.sync="showActivityApply" :dataId="dataId" />
  </div>
</template>

<script>
import ActivityApply from "@/common/discover/activity_apply";
export default {
  name: "ActivityStore",
  components: {
    ActivityApply
  },
  props: {
    showApply: {
      type: Boolean,
      required: true
    },
    closeTime: {
      type: String,
      default: ""
    },
    // 是否已经收藏
    isFavorite: {
      type: Boolean,
      require: true
    },
    dataType: {
      type: String,
      require: true
    },
    dataId: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      // 是否已经收藏
      isStoreUp: this.isFavorite,
      showActivityApply: false
    };
  },
  created() {
    // 获取用户信息
    this.$store.dispatch("getInfo", this);
  },
  methods: {
    // 点击报名
    handleApply(id) {
      this.showActivityApply = true;
    },
    // 点击收藏
    handleStore() {
      // 是否登录
      const isLogin = this.checkAuth();
      if (isLogin) {
        // 如果已经收藏
        if (this.isStoreUp) return;
        this.$api("storeUp", this.dataType + "Store", {
          id: this.dataId,
          isTrue: true
        }).then((res) => {
          this.$message({
            message: res.message,
            type: res.code === 0 ? "success" : "error"
          });
          if (res.code === 0) {
            this.isStoreUp = true;
          }
        });
      } else {
      }
    }
  }
};
</script>

<style lang="less">
.activity-store {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .activity-close-time {
    background: #feebd0;
    line-height: 46 / @rem;
    text-align: center;
    span {
      display: inline-block;
      position: relative;
      padding: 0 26 / @rem;
      color: #fa9b15;
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 20 / @rem;
        width: 6 / @rem;
        height: 6 / @rem;
        background: #fa9b15;
        border-radius: 50%;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
  }
  .activity-store__content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100 / @rem;
    box-shadow: 0 / @rem 0 / @rem 6 / @rem 0 / @rem rgba(0, 0, 0, 0.06);
    background-color: #ffffff;
    .btn {
      width: 44 / @rem;
      padding-top: 52 / @rem;
      line-height: 1;
      font-size: 20 / @rem;
      background-size: 44 / @rem;
      background-repeat: no-repeat;
      &.store-btn {
        background-image: url("~@/assets/images/collect_icon_a.png");
        &.store-active {
          background-image: url("~@/assets/images/collect_icon_acitve.png");
        }
      }

      &.share-btn {
        padding-left: 0;
        padding-right: 0;
        margin: 0;
        border-radius: 0;
        color: #141414;
        background-color: transparent;
        background-image: url("~@/assets/images/share_icon_a.png");
        &::after {
          display: none;
        }
      }
    }
    .apply {
      width: 366 / @rem;
      height: 80 / @rem;
      border-radius: 40 / @rem;
      line-height: 80 / @rem;
      text-align: center;
      font-size: 28 / @rem;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(90deg, #0c40d4, #245bf5);
    }
  }
}
</style>
