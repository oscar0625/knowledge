<template>
  <div class="discovery-policy-list-page">
    <my-header>政策</my-header>
    <div class="policy-list__head">
      <search-input
        @search="handleSearch"
        :isHomepage="false"
        placeholder="搜索感兴趣的政策"
      />
      <div class="wrapper">
        <audimax-tab type="读政策" />
        <div class="headline">
          <wx-swiper
            class="wx-swiper"
            :autoplay="true"
            :circular="true"
            :vertical="true"
          >
            <wx-swiper-item v-for="item in newestList" :key="item.id">
              <a
                :href="`/policyInfo/${
                  item.type === 1 ? 'notice' : 'explain'
                }?id=${item.id}`"
                class="headline__list"
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
        <div class="discovery-policy__tab">
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
    <div class="policy-list__content">
      <my-filter-radio :filterSource="filterSource" @confirm="handleFilter" />
      <div class="wrapper">
        <div class="result">
          <template v-if="isLoading === false && queryResult.length === 0">
            <no-data class="nodata" />
          </template>
          <template v-else>
            <discovery-policy-list
              :dataList="queryResult"
              :currentType="currentType"
            />
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
import DiscoveryPolicyList from "@/common/discover/discovery_policy_list";
export default {
  name: "DiscoveryPolicyListPage",
  components: {
    Backtop,
    SearchInput,
    AudimaxTab,
    MyFilterRadio,
    noData,
    DiscoveryPolicyList
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
          name: "政策文件",
          apiUrl: "getNoticeList"
        },
        explain: {
          name: "政策解读",
          apiUrl: "getExplainList"
        }
      },
      // 过滤条件枚举
      filterSource: [
        {
          name: "范围",
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
          name: "需求",
          checked: -1,
          init: -1,
          option: []
        },
        {
          name: "时间",
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
        directionSecond: -1,
        timeOption: -1,
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
      this.$api("policy", "getPolicyNewestList", {}).then((res) => {
        this.newestList = res.dataList;
      });
    },
    // 加载筛选数据
    loadFilterSource() {
      Promise.all([
        this.$api("policy", "getPolicyRange", {}),
        this.$api("complex", "getArea", {}),
        this.$api("policy", "getPolicyDirection", {}),
        this.$api("policy", "getPolicyTime", {})
      ])
        .then(
          ([
            { dataList: rangeDatas },
            { dataList: areaDatas },
            { dataList: directionDatas },
            { dataList: timeDatas }
          ]) => {
            this.filterSource = [
              rangeDatas,
              areaDatas,
              directionDatas,
              timeDatas
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
      this.redirectByPathBlank("/discoverySearch/policy", { keywords });
    },
    // 修改类型
    handleType(type) {
      if (this.currentType === type) return;
      this.currentType = type;
      this.queryResult = [];
      this.queryCondition.pageIndex = 1;
      this.loadList();
    },
    // 确认领域
    handleFilter() {
      // console.log(this.filterSource[0].checked);
      // console.log(this.filterSource[1].checked);
      // console.log(this.filterSource[2].checked);
      // console.log(this.filterSource[3].checked);
      this.queryCondition.range = this.filterSource[0].checked;
      this.queryCondition.region = this.filterSource[1].checked;
      this.queryCondition.directionSecond = this.filterSource[2].checked;
      this.queryCondition.timeOption = this.filterSource[3].checked;
      this.queryCondition.pageIndex = 1;
      this.loadList();
    },
    // 加载数据
    loadList(clear = true) {
      this.isLoading = true;
      this.showWXLoading({ type: "nav" });
      this.$api(
        "policy",
        this.tabTypes[this.currentType].apiUrl,
        this.queryCondition
      ).then((res) => {
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
.discovery-policy-list-page {
  min-height: 100vh;
  background-color: #f7f7f7;
  .policy-list__head {
    background-color: #fff;
    .headline {
      padding: 0 31 / @rem 0 118 / @rem;
      border-radius: 20 / @rem;
      background-color: rgba(217, 23, 23, 0.05);
      background-size: auto 62 / @rem;
      background-repeat: no-repeat;
      background-position: 30 / @rem center;
      background-image: url("~@/assets/images/audimax_headline2.png");
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
    .discovery-policy__tab {
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
  .policy-list__content {
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
