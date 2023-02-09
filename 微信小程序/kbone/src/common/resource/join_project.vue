<template>
  <div class="join-project">
    <div class="join-project__content">
      <div
        :class="{
          btn: true,
          'store-btn': true,
          'store-active': isStoreUp
        }"
        v-if="noSelf"
        @click="handleStore"
      >
        {{ isStoreUp ? "已收藏" : "收藏" }}
      </div>
      <wx-button class="share-btn btn" open-type="share">分享</wx-button>
      <div class="join" v-if="noSelf" @click="handleDocking">加入工程</div>
    </div>

    <!-- 成果对接需求工程 -->
    <choice-project
      :visible.sync="showChoiceProject"
      :dataType="dataType"
      :dockingType="dockingType"
      :dataId="dataId"
      @complete="dockingComplete"
    />
  </div>
</template>

<script>
import ChoiceProject from "@/common/user/choice_project";
export default {
  name: "JoinProject",
  components: {
    ChoiceProject
  },
  props: {
    noSelf: {
      type: Boolean,
      require: true
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
    dockingType: {
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
      showChoiceProject: false
    };
  },
  created() {
    // 获取用户信息
    this.$store.dispatch("getInfo", this);
  },
  methods: {
    // 点击对接
    handleDocking() {
      // 是否登录
      const isLogin = this.checkAuth();
      if (isLogin) {
        // 是否验证
        const isCer = this.checkCertificate();
        if (isCer) {
          // 显示选择项目弹框
          this.showChoiceProject = true;
        }
      }
    },
    // 对接完成
    dockingComplete() {},
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
.join-project {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .join-project__content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100 / @rem;
    box-shadow: 0 / @rem 0 / @rem 6 / @rem 0 / @rem rgba(0, 0, 0, 0.06);
    background-color: #ffffff;
    .btn {
      min-width: 44 / @rem;
      padding-top: 52 / @rem;
      line-height: 1;
      font-size: 20 / @rem;
      background-size: 44 / @rem;
      background-repeat: no-repeat;
      background-position: center 0;
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
    .join {
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
