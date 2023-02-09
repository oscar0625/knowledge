<template>
  <div class="tech-resource-info" v-if="info">
    <my-header>成果详情</my-header>
    <div class="synthesis">
      <div class="title">{{ info.name }}</div>
      <template v-if="info.companyName">
        <div class="company">{{ info.companyName }}</div>
      </template>
      <template v-else>
        <div class="person">个人</div>
      </template>
      <div class="score">
        <span
          v-for="s in Math.round(totalScore / 20)"
          :key="s + 's'"
          class="star"
        ></span>
        <span
          v-for="u in 5 - Math.round(totalScore / 20)"
          :key="u + 'u'"
          class="un-star"
        ></span>
      </div>
      <div class="statistics">
        <span class="pageview">{{
          info.viewCount > 9999 ? "9999+" : info.viewCount
        }}</span>
        <!-- <span class="collect">256</span>
        <span class="share">256</span> -->
      </div>
    </div>
    <div class="details">
      <div class="title">成果详情</div>
      <p>
        {{ info.description }}
      </p>
      <div v-if="info.technologyKeyword" class="keyword">
        <div class="name">关键词</div>
        <div class="tags">
          <span v-for="item in strToArr(info.technologyKeyword)" :key="item">{{
            item
          }}</span>
        </div>
      </div>
    </div>
    <div class="other-info">
      <p>
        <span class="name">发布时间</span>
        <span>{{ info.createTime | dateFilterSpace }}</span>
      </p>
      <p>
        <span class="name">专业领域</span>
        <span>{{ info.specialFieldIdName }}</span>
      </p>
      <p v-if="info.closingTime">
        <span class="name">截止时间</span>
        <span>{{ info.closingTime | dateFilterSpace }}</span>
      </p>
      <p>
        <span class="name">先进程度</span>
        <span>{{ info.advancedLevelName }}</span>
      </p>
      <p>
        <span class="name">技术成熟度</span>
        <span>{{ info.technicalMaturityName }}</span>
      </p>
      <p>
        <span class="name">所属地区</span>
        <span>{{ info.area }}</span>
      </p>
      <p v-if="info.applicationNumber">
        <span class="name">专利信息</span>
        <span>{{ info.applicationNumber }}</span>
      </p>
    </div>
    <div class="graph">
      <div class="title">系统评分</div>
      <div class="radar">
        <radar-graph :dataset="dataset" />
      </div>
    </div>
    <!-- 成果对需求工程 -->
    <join-project
      :noSelf="!info.isSelfData"
      :isFavorite="info.isFavorite"
      dataType="achievement"
      dockingType="demand"
      :dataId="$route.query.id"
    />
  </div>
</template>

<script>
import JoinProject from "@/common/resource/join_project";
import RadarGraph from "@/common/resource/radar_graph";
export default {
  name: "TechResourceInfo",
  components: {
    JoinProject,
    RadarGraph
  },
  data() {
    return {
      info: null
    };
  },
  computed: {
    totalScore() {
      const { achvDataModels = {} } = this.info || {};
      return achvDataModels.totalScore || 0;
    },
    dataset() {
      const { achvDataModels = {} } = this.info || {};
      return achvDataModels.dataList || [];
    }
  },
  created() {
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "成果详情"
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
      this.$api("achievement", "getAchInfo", { id, type: 1 }).then((res) => {
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
.tech-resource-info {
  overflow: hidden;
  min-height: 100vh;
  background-color: #f7f7f7;
  .synthesis {
    padding: 30 / @rem;
    margin-bottom: 30 / @rem;
    border-radius: 30 / @rem;
    background-color: #ffffff;
    .title {
      padding-top: 10 / @rem;
      line-height: 62 / @rem;
      font-size: 42 / @rem;
      font-weight: 800;
      color: #000000;
    }
    .company,
    .person {
      padding-left: 56 / @rem;
      margin: 13 / @rem 0;
      line-height: 40 / @rem;
      background-size: 40 / @rem;
      background-position: 0 center;
      background-repeat: no-repeat;
      &.company {
        background-image: url("~@/assets/images/company_icon.png");
      }
      &.person {
        background-image: url("~@/assets/images/person_icon.png");
      }
    }
    .score {
      display: flex;
      padding: 30 / @rem 0;
      > span {
        width: 34 / @rem;
        height: 34 / @rem;
        margin-left: 11 / @rem;
        background-size: cover;
        background-position: center;
        &.star {
          background-image: url("~@/assets/images/star_icon.png");
        }
        &.un-star {
          background-image: url("~@/assets/images/star_un_icon.png");
        }
      }
    }
    .statistics {
      display: flex;
      padding-top: 12 / @rem;
      line-height: 34 / @rem;
      color: #999999;
      span {
        padding: 0 50 / @rem;
        background-size: 34 / @rem;
        background-position: 0 center;
        background-repeat: no-repeat;
        &.pageview {
          background-image: url("~@/assets/images/pageview_icon.png");
        }
        &.collect {
          background-image: url("~@/assets/images/collect_icon.png");
        }
        &.share {
          background-image: url("~@/assets/images/share_icon.png");
        }
      }
    }
  }
  .details {
    padding: 30 / @rem;
    margin-bottom: 30 / @rem;
    border-radius: 30 / @rem;
    background-color: #ffffff;
    .title {
      line-height: 74 / @rem;
      font-size: 34 / @rem;
      font-weight: 800;
    }
    > p {
      padding-top: 13 / @rem;
      line-height: 42 / @rem;
      font-size: 28 / @rem;
      color: #666666;
    }
    .keyword {
      display: flex;
      padding: 3 / @rem 0 30 / @rem;
      .name {
        flex: none;
        margin: 20 / @rem 10 / @rem 0 0;
        line-height: 48 / @rem;
        font-size: 28 / @rem;
      }
      .tags {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        span {
          padding: 0 23 / @rem;
          margin: 20 / @rem 0 0 20 / @rem;
          border: 1 / @rem solid rgba(12, 64, 212, 0.5);
          border-radius: 6 / @rem;
          line-height: 46 / @rem;
          word-break: break-all;
          color: rgba(12, 64, 212, 1);
        }
      }
    }
  }
  .other-info {
    padding: 30 / @rem;
    margin-bottom: 30 / @rem;
    border-radius: 30 / @rem;
    background-color: #ffffff;
    p {
      display: flex;
      padding: 5 / @rem 0;
      line-height: 42 / @rem;
      font-size: 28 / @rem;
      .name {
        flex: none;
        width: 178 / @rem;
        color: #666666;
      }
    }
  }
  .graph {
    margin-bottom: 130 / @rem;
    border-radius: 30 / @rem;
    background-color: #ffffff;
    .title {
      padding: 30 / @rem 30 / @rem 0;
      line-height: 74 / @rem;
      font-size: 34 / @rem;
      font-weight: 800;
    }
    .radar {
      height: 488 / @rem;
    }
  }
}
</style>
