<template>
  <div class="discovery-news-list-page">
    <my-header>资讯</my-header>
    <div class="news-list__head">
      <search-input
        @search="handleSearch"
        :isHomepage="false"
        placeholder="搜索感兴趣的咨询"
      />
      <div class="wrapper">
        <audimax-tab type="阅资讯" />
        <div class="headline">
          <wx-swiper
            class="wx-swiper"
            :autoplay="true"
            :circular="true"
            :vertical="true"
          >
            <wx-swiper-item v-for="item in newestList" :key="item.id">
              <a
                class="headline__list"
                :href="`/newsInfo?id=${item.id}${
                  item.industryType === 3 ? '&type=notice' : ''
                }`"
                :target="isBlank"
              >
                <p>{{ item.createTime | dateFilterSpace }}</p>
                <h4 class="fn-text-ellipsis">
                  {{ item.title }}
                </h4>
              </a>
            </wx-swiper-item>
          </wx-swiper>
        </div>
        <div class="discovery-news__tab">
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
    </div>
    <div class="news-list__content wrapper">
      <div class="result">
        <template v-if="isLoading === false && queryResult.length === 0">
          <no-data class="nodata" />
        </template>
        <template v-else>
          <discovery-news-list
            :dataList="queryResult"
            :simplify="currentType === 'notice'"
            :currentType="currentType"
          />
        </template>
      </div>
    </div>
    <backtop v-if="showBack" />
  </div>
</template>

<script>
import Backtop from "@/common/backtop";
import SearchInput from "@/common/search_input";
import AudimaxTab from "@/common/discover/audimax_tab";
import noData from "@/common/no_data";
import DiscoveryNewsList from "@/common/discover/discovery_news_list";
export default {
  name: "DiscoveryNewsListPage",
  components: {
    Backtop,
    SearchInput,
    AudimaxTab,
    noData,
    DiscoveryNewsList
  },
  data() {
    return {
      // 是否显示返回顶部
      showBack: false,
      isLoading: true,
      // 最新数据
      newestList: [],
      // 类型
      currentType: "notice",
      tabTypes: {
        notice: {
          name: "通知公告",
          apiUrl: "getNoticeList",
          params: {}
        },
        platform: {
          name: "平台新闻",
          apiUrl: "getNewsList",
          params: { type: 1 }
        },
        industry: {
          name: "行业新闻",
          apiUrl: "getNewsList",
          params: { type: 2 }
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
    // 加载最新
    this.loadNewestList();
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
    // 加载最新的数据
    loadNewestList() {
      this.$api("information", "getNewsNewestList", {}).then((res) => {
        this.newestList = res.dataList;
      });
    },
    // 修改关键词
    handleSearch(keywords) {
      this.redirectByPathBlank("/discoverySearch/news", { keywords });
    },
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
      const { apiUrl, params } = this.tabTypes[this.currentType];
      this.$api("information", apiUrl, {
        ...this.queryCondition,
        ...params
      }).then((res) => {
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
.discovery-news-list-page {
  min-height: 100vh;
  background-color: #f7f7f7;
  .news-list__head {
    background-color: #fff;
    .headline {
      padding: 0 31 / @rem 0 118 / @rem;
      border-radius: 20 / @rem;
      background-color: rgba(217, 23, 23, 0.05);
      background-size: auto 62 / @rem;
      background-repeat: no-repeat;
      background-position: 30 / @rem center;
      background-image: url("~@/assets/images/audimax_headline3.png");
      .wx-swiper {
        height: 100 / @rem;
        .headline__list {
          display: block;
          padding: 9 / @rem 0;
          p {
            line-height: 39 / @rem;
            font-size: 24 / @rem;
            color: #999999;
          }
          h4 {
            line-height: 43 / @rem;
            font-size: 28 / @rem;
          }
        }
      }
    }
    .discovery-news__tab {
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
  .news-list__content {
    padding-top: 30 / @rem;
    margin-top: -30 / @rem;
    border-radius: 30 / @rem 30 / @rem 0 0;
    background-color: #f7f7f7;
    .result {
      .nodata {
        padding-top: 140 / @rem;
      }
    }
  }
}
</style>
