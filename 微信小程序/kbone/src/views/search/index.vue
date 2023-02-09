<template>
  <div class="search-page">
    <my-header>搜索</my-header>
    <div class="search__head">
      <search-input @search="handleSearch" :isHomepage="false" />
      <div class="search__tab">
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
    <div class="search__content">
      <my-filter :filterSource="filterSource" @confirm="handleFilter" />
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
            <template v-if="currentType === 'techAch'">
              <tech-ach-list :dataList="queryResult" />
            </template>
            <template v-if="currentType === 'prodAch'">
              <prod-ach-list :dataList="queryResult" />
            </template>
            <template v-if="currentType === 'demand'">
              <demand-list :dataList="queryResult" />
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
import MyFilter from "@/common/my_filter";
import noData from "@/common/no_data";
import TechAchList from "@/common/resource/tech_ach_list";
import ProdAchList from "@/common/resource/prod_ach_list";
import DemandList from "@/common/resource/demand_list";
export default {
  name: "SearchPage",
  components: {
    Backtop,
    SearchInput,
    MyFilter,
    noData,
    TechAchList,
    ProdAchList,
    DemandList
  },
  data() {
    return {
      // 是否显示返回顶部
      showBack: false,
      isLoading: true,
      // 类型
      currentType: "",
      tabTypes: {
        techAch: {
          name: "技术成果",
          apiUrl: "getTechAchlist"
        },
        prodAch: {
          name: "产品成果",
          apiUrl: "getProdAchlist"
        },
        demand: {
          name: "企业需求",
          apiUrl: "getDemlist"
        }
      },
      // 过滤条件枚举
      filterSource: [
        {
          name: "领域",
          checkedObj: {},
          option: []
        },
        {
          name: "地区",
          checkedObj: {},
          option: []
        }
      ],
      // 是否还有数据可以进行下拉加载
      canLoadNextPage: false,
      // 筛选条件
      queryCondition: {
        name: "",
        city: [],
        technologykeyword: [],
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      queryResult: []
    };
  },
  created() {
    // 加载领域
    this.loadFilterSource();
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
    const { type = "techAch" } = this.$route.params;
    const { keywords = "" } = this.$route.query;
    this.currentType = type;
    this.queryCondition.name = keywords;
    this.loadList();
  },
  methods: {
    // 加载筛选数据
    loadFilterSource() {
      Promise.all([
        this.$api("complex", "getField", {}),
        this.$api("complex", "getArea", {})
      ])
        .then(([{ dataList: fieldDatas }, { dataList: areaDatas }]) => {
          this.filterSource = [fieldDatas, areaDatas].map((option, i) => {
            return {
              ...this.filterSource[i],
              option
            };
          });
        })
        .catch(function (reason) {
          console.log(reason);
        });
    },
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
      this.queryCondition.name = keywords;
      this.queryCondition.pageIndex = 1;
      this.loadList();
    },
    // 确认领域
    handleFilter() {
      // console.log({ ...this.filterSource[0].checkedObj });
      // console.log({ ...this.filterSource[1].checkedObj });
      const fnc = (obj) => {
        return Object.keys(obj)
          .filter((key) => {
            return obj[key];
          })
          .map((item) => {
            return item * 1;
          });
      };
      this.queryCondition.technologykeyword = fnc(
        this.filterSource[0].checkedObj
      );
      this.queryCondition.city = fnc(this.filterSource[1].checkedObj);
      this.queryCondition.pageIndex = 1;
      this.loadList();
    },
    // 加载数据
    loadList(clear = true) {
      this.isLoading = true;
      this.showWXLoading({ type: "nav" });
      this.$api(
        this.currentType === "demand" ? "demand" : "achievement",
        this.tabTypes[this.currentType].apiUrl,
        this.queryCondition
      ).then((res) => {
        this.hideWXLoading({ type: "nav" });
        const { pageIndex, pageSize } = this.queryCondition;
        this.canLoadNextPage = pageIndex * pageSize < res.count;
        this.total = res.count;
        if (clear) {
          this.queryResult = res.data;
        } else {
          this.queryResult.push.apply(this.queryResult, res.data);
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
.search-page {
  min-height: 100vh;
  background: #f7f7f7;
  .search__head {
    background-color: #fff;
    .search__tab {
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
  .search__content {
    // 筛选组件的mask根据此定位
    position: relative;
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
