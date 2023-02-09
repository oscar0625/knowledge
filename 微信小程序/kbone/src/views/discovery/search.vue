<template>
  <div class="discovery-search-page">
    <my-header>搜索</my-header>
    <div class="discovery-search__head">
      <search-input
        @search="handleSearch"
        :isHomepage="false"
        :placeholder="placeholder"
      />
      <div class="discovery-search__tab">
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
    <div class="discovery-search__content">
      <div class="wrapper">
        <div class="statistics">
          已为您搜索到<span>{{ total }}</span
          >条
        </div>
        <div class="result">
          <template v-if="isLoading === false && queryResult.length === 0">
            <no-data class="nodata" />
          </template>
          <template v-else>
            <template v-if="currentType === 'policy'">
              <discovery-policy-list :dataList="queryResult" />
            </template>
            <template v-if="currentType === 'project'">
              <discovery-project-list :dataList="queryResult" />
            </template>
            <template v-if="currentType === 'news'">
              <discovery-news-list :dataList="queryResult" :simplify="true" />
            </template>
          </template>
        </div>
      </div>
    </div>
    <backtop v-if="showBack" />
  </div>
</template>

<script>
import Backtop from "@/common/backtop";
import SearchInput from "@/common/search_input";
import noData from "@/common/no_data";
import DiscoveryPolicyList from "@/common/discover/discovery_policy_list";
import DiscoveryProjectList from "@/common/discover/discovery_project_list";
import DiscoveryNewsList from "@/common/discover/discovery_news_list";

export default {
  name: "DiscoverySearchPage",
  components: {
    Backtop,
    SearchInput,
    noData,
    DiscoveryPolicyList,
    DiscoveryProjectList,
    DiscoveryNewsList
  },
  data() {
    return {
      // 是否显示返回顶部
      showBack: false,
      isLoading: true,
      // 类型
      currentType: "policy",
      tabTypes: {
        policy: {
          name: "政策",
          params: {
            type: 4,
            dataType: 1
          }
        },
        project: {
          name: "项目",
          params: {
            type: 4,
            dataType: 2
          }
        },
        news: {
          name: "资讯",
          params: {
            type: 3,
            dataType: 2
          }
        }
      },
      // 是否还有数据可以进行下拉加载
      canLoadNextPage: false,
      // 筛选条件
      queryCondition: {
        keyWord: "",
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      queryResult: []
    };
  },
  computed: {
    placeholder() {
      return "搜索感兴趣的" + this.tabTypes[this.currentType].name;
    }
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
    const { type } = this.$route.params;
    const { keywords = "" } = this.$route.query;
    this.currentType = type;
    this.queryCondition.keyWord = keywords;
    this.loadList();
  },
  methods: {
    // 修改类型
    handleType(type) {
      if (this.currentType === type) return;
      this.currentType = type;
      this.queryResult = [];
      this.queryCondition.pageIndex = 1;
      this.loadList();
    },
    // 修改关键词
    handleSearch(keywords) {
      this.queryCondition.keyWord = keywords;
      this.queryCondition.pageIndex = 1;
      this.loadList();
    },
    // 加载数据
    loadList(clear = true) {
      this.isLoading = true;
      this.showWXLoading({ type: "nav" });
      this.$api("homepage", "searchGlobal", {
        ...this.queryCondition,
        ...this.tabTypes[this.currentType].params
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
.discovery-search-page {
  min-height: 100vh;
  background: #f7f7f7;
  .discovery-search__head {
    background-color: #fff;
    .discovery-search__tab {
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
  .discovery-search__content {
    // 筛选组件的mask根据此定位
    position: relative;
    padding-top: 30 / @rem;
    margin-top: -30 / @rem;
    border-radius: 30 / @rem 30 / @rem 0 0;
    background-color: #f7f7f7;
    .statistics {
      margin-bottom: 30 / @rem;
      border-radius: 16 / @rem;
      line-height: 66 / @rem;
      text-align: center;
      background-color: #fff;
      span {
        padding: 0 15 / @rem;
        font-size: 34 / @rem;
        color: #d91717;
      }
    }
    .result {
      .nodata {
        padding-top: 140 / @rem;
      }
    }
  }
}
</style>
