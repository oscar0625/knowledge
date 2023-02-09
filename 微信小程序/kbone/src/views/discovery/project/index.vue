<template>
  <div class="discovery-project-list-page">
    <my-header>项目</my-header>
    <div class="project-list__head">
      <search-input
        @search="handleSearch"
        :isHomepage="false"
        placeholder="搜索感兴趣的项目"
      />
      <div class="wrapper">
        <audimax-tab type="报项目" />
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
                :href="`/projectInfo?id=${item.id}`"
                :target="isBlank"
              >
                <p>{{ item.createTime | dateFilterSpace }}</p>
                <h4 class="fn-text-ellipsis">
                  {{ item.name }}
                </h4>
              </a>
            </wx-swiper-item>
          </wx-swiper>
        </div>
        <div class="tab">申报项目</div>
      </div>
    </div>
    <div class="project-list__content">
      <my-filter-radio :filterSource="filterSource" @confirm="handleFilter" />
      <div class="wrapper">
        <div class="result">
          <template v-if="isLoading === false && queryResult.length === 0">
            <no-data class="nodata" />
          </template>
          <template v-else>
            <discovery-project-list :dataList="queryResult" />
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
import AudimaxTab from "@/common/discover/audimax_tab";
import MyFilterRadio from "@/common/my_filter_radio";
import noData from "@/common/no_data";
import DiscoveryProjectList from "@/common/discover/discovery_project_list";
export default {
  name: "DiscoveryProjectListPage",
  components: {
    Backtop,
    SearchInput,
    AudimaxTab,
    MyFilterRadio,
    noData,
    DiscoveryProjectList
  },
  data() {
    return {
      // 是否显示返回顶部
      showBack: false,
      isLoading: true,
      // 最新数据
      newestList: [],
      // 过滤条件枚举
      filterSource: [
        {
          name: "范围",
          checked: -1,
          init: -1,
          option: []
        },
        {
          name: "申报类型",
          checked: -1,
          init: -1,
          option: []
        },
        {
          name: "区域",
          checked: -1,
          init: -1,
          option: []
        },
        {
          name: "服务类型",
          checked: -1,
          init: -1,
          option: []
        }
      ],
      // 是否还有数据可以进行下拉加载
      canLoadNextPage: false,
      // 筛选条件
      queryCondition: {
        range: -1,
        region: -1,
        serviceType: -1,
        declarationType: -1,
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
      this.$api("policy", "getProjectNewestList", {}).then((res) => {
        this.newestList = res.dataList;
      });
    },
    // 加载筛选数据
    loadFilterSource() {
      Promise.all([
        this.$api("policy", "getProjectRange", {}),
        this.$api("policy", "getProjectDeclaration", {}),
        this.$api("complex", "getArea", {}),
        this.$api("policy", "getProjectService", {})
      ])
        .then(
          ([
            { dataList: rangeDatas },
            { dataList: declarationDatas },
            { dataList: areaDatas },
            { dataList: serviceDatas }
          ]) => {
            this.filterSource = [
              rangeDatas,
              declarationDatas,
              areaDatas,
              serviceDatas
            ].map((option, i) => {
              return {
                ...this.filterSource[i],
                option
              };
            });
          }
        )
        .catch(function (reason) {
          console.log(reason);
        });
    },
    // 修改关键词
    handleSearch(keywords) {
      this.redirectByPathBlank("/discoverySearch/project", { keywords });
    },
    // 确认领域
    handleFilter() {
      // console.log(this.filterSource[0].checked);
      // console.log(this.filterSource[1].checked);
      // console.log(this.filterSource[2].checked);
      // console.log(this.filterSource[3].checked);
      this.queryCondition.range = this.filterSource[0].checked;
      this.queryCondition.declarationType = this.filterSource[1].checked;
      this.queryCondition.region = this.filterSource[2].checked;
      this.queryCondition.serviceType = this.filterSource[3].checked;
      this.queryCondition.pageIndex = 1;
      this.loadList();
    },
    // 加载数据
    loadList(clear = true) {
      this.isLoading = true;
      this.showWXLoading({ type: "nav" });
      this.$api("policy", "getProjectList", this.queryCondition).then((res) => {
        this.hideWXLoading({ type: "nav" });
        const { pageIndex, pageSize } = this.queryCondition;
        this.canLoadNextPage = pageIndex * pageSize < res.count;
        this.total = res.count;
        if (clear) {
          this.queryResult = res.itemModels;
        } else {
          this.queryResult.push.apply(this.queryResult, res.itemModels);
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
.discovery-project-list-page {
  min-height: 100vh;
  background-color: #f7f7f7;
  .project-list__head {
    background-color: #fff;
    .headline {
      padding: 0 31 / @rem 0 118 / @rem;
      border-radius: 20 / @rem;
      background-color: rgba(217, 23, 23, 0.05);
      background-size: auto 62 / @rem;
      background-repeat: no-repeat;
      background-position: 30 / @rem center;
      background-image: url("~@/assets/images/audimax_headline1.png");
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
    .tab {
      padding: 20 / @rem 0 14 / @rem;
      line-height: 94 / @rem;
      font-size: 34 / @rem;
      font-weight: 800;
      color: #000000;
    }
  }
  .project-list__content {
    // 筛选组件的mask根据此定位
    position: relative;
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
