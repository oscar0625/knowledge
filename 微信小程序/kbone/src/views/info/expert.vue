<template>
  <div class="expert-resource-info" v-if="info">
    <my-header>专家详情</my-header>
    <wx-image class="photo" :src="info.imgUrl"></wx-image>
    <div class="wrapper">
      <div class="content">
        <div class="synthesis">
          <div
            class="left"
            :style="`background-image: url('${info.imgUrl}');`"
          ></div>
          <div class="right">
            <div class="title">{{ info.name }}</div>
            <div class="job">
              <p>中国科学院自动化研究所研究员</p>
              <p>博士研究生导师</p>
            </div>
          </div>
        </div>
        <div class="details">
          {{ info.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpertResourceInfo",

  data() {
    return {
      info: null
    };
  },
  created() {
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "专家详情"
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
      this.$api("achievement", "getExpertInfo", { id }).then((res) => {
        this.hideWXLoading();
        const { code, message, dataList } = res;
        if (code === 0) {
          this.info = dataList[0];
        } else {
          this.$message.error(message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.expert-resource-info {
  overflow: hidden;
  min-height: 100vh;
  background-color: #f7f7f7;
  .photo {
    display: block;
    width: 100%;
    // height: auto;
    height: 612 / @rem;
  }
  .content {
    padding: 30 / @rem;
    margin-top: -112 / @rem;
    margin-bottom: 30 / @rem;
    border-radius: 30 / @rem;
    box-shadow: 0 / @rem 10 / @rem 20 / @rem 0 / @rem rgba(0, 0, 0, 0.04);
    background-color: #ffffff;
    .synthesis {
      display: flex;
      align-items: center;
      padding-bottom: 30 / @rem;
      border-bottom: 1 / @rem dashed #f2f2f2;
      .left {
        flex: 0 0 auto;
        width: 152 / @rem;
        height: 152 / @rem;
        margin-right: 30 / @rem;
        border-radius: 14 / @rem;
        background-size: cover;
        background-position: center;
      }
      .right {
        .title {
          line-height: 72 / @rem;
          font-size: 42 / @rem;
          font-weight: 800;
        }
        .job {
          line-height: 40 / @rem;
          color: #999999;
        }
      }
    }
    .details {
      padding-top: 43 / @rem;
      line-height: 42 / @rem;
      font-size: 28 / @rem;
      color: #666666;
    }
  }
}
</style>
