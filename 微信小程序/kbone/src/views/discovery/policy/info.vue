<template>
  <div class="discovery-policy-list-page" v-if="info">
    <my-header bgColor="#f7f7f7">政策详情</my-header>
    <div class="synthesis">
      <div class="title">{{ info.name }}</div>
      <div class="other">
        <p>
          <i>发布日期：</i>
          <span>{{ info.publishDate | dateFilterSpace }}</span>
        </p>
        <p class="source">
          <i>发文来源：</i>
          <span>{{ info.source }}</span>
        </p>
      </div>

      <div class="statistics">
        <span class="pageview">{{
          info.viewCount > 9999 ? "9999+" : info.viewCount
        }}</span>
        <!-- <span class="collect">256</span>
        <span class="share">256</span> -->
      </div>
    </div>
    <div class="detail wrapper">
      <div class="content rich-text" v-html="tinymceFilter"></div>
    </div>
    <div class="recommend wrapper">
      <div class="name">相关政策推荐</div>
      <ul class="content">
        <li v-for="item in recommendList" :key="item.id">
          <a
            :href="`/policyInfo/${item.type === 1 ? 'notice' : 'explain'}?id=${
              item.id
            }`"
            :target="isBlank"
          >
            <h4 class="fn-text-ellipsis">{{ item.name }}</h4>
            <p>发文日期：{{ item.publishDate | dateFilterSpace }}</p>
          </a>
        </li>
      </ul>
    </div>
    <wx-share />
  </div>
</template>

<script>
import { decode } from "html-entities";
import WxShare from "@/common/wx_share";
export default {
  name: "DiscoveryPolicyListPage",
  components: {
    WxShare
  },
  data() {
    return {
      currentType: "",
      info: null,
      recommendList: []
    };
  },
  computed: {
    tinymceFilter() {
      // 避免解码后影响标签正常解析
      // https://blog.csdn.net/lhy349/article/details/81062558
      return this.info
        ? decode(
            this.info.content
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
      title: "政策详情"
    });
    this.setNavigationBarColor({
      backgroundColor: "f7f7f7"
    });
    const { type } = this.$route.params;
    this.currentType = type;
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
      Promise.all([
        this.$api(
          "policy",
          this.currentType === "notice" ? "getNoticeInfo" : "getExplainInfo",
          {
            id,
            type: 1
          }
        ),
        this.$api(
          "policy",
          this.currentType === "notice"
            ? "getPolicyNoticeInfoRec"
            : "getPolicyExplainInfoRec",
          {
            id
          }
        )
      ]).then(
        ([{ code, message, model: info }, { dataList: recommendList }]) => {
          this.hideWXLoading();
          if (code === 0) {
            this.info = info;
            this.recommendList = recommendList;
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
.discovery-policy-list-page {
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
    .other {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > p {
        display: flex;
        padding: 13 / @rem 0;
        line-height: 40 / @rem;
        i {
          flex: none;
        }
      }
    }

    .statistics {
      display: flex;
      padding-top: 30 / @rem;
      line-height: 1;
      color: #999999;
      span {
        padding: 0 50 / @rem 0 40 / @rem;
        background-size: 26 / @rem;
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
  .detail {
    margin-bottom: 30 / @rem;
    border-radius: 30 / @rem;
    background-color: #ffffff;
    .content {
      padding: 30 / @rem 0;
      font-size: 30 / @rem;
    }
  }
  .recommend {
    margin-bottom: 30 / @rem;
    border-radius: 30 / @rem;
    background-color: #ffffff;
    .name {
      padding-top: 30 / @rem;
      line-height: 76 / @rem;
      font-size: 34 / @rem;
      font-weight: 800;
      color: #000000;
    }
    .content {
      li {
        padding-bottom: 50 / @rem;
        > a {
          display: block;
        }
        h4 {
          line-height: 64 / @rem;
          font-size: 34 / @rem;
          color: #000000;
        }
        p {
          line-height: 56 / @rem;
          color: #666666;
        }
      }
    }
  }
}
</style>
