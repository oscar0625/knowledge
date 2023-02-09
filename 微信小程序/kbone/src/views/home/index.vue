<template>
  <div class="homepage">
    <my-header bgColor="#264aec" fontColor="#fff"
      >国家机器人与智能制造</my-header
    >
    <div class="homepage__banner">
      <search-input @search="goSearch" />
    </div>
    <div class="homepage__content wrapper">
      <!-- 数据统计 -->
      <div class="statistics">
        <div class="name">数据统计</div>
        <wx-swiper
          class="wx-swiper"
          :autoplay="true"
          :interval="5000"
          :duration="500"
          :vertical="true"
        >
          <wx-swiper-item v-for="item in statistics" :key="item.name">
            <div class="count">
              {{ item.name }}总数 <span>{{ item.targetValue }} </span>条
            </div>
          </wx-swiper-item>
        </wx-swiper>
      </div>
      <!-- 找技术 -->
      <ul class="find">
        <li v-for="item in findList" :key="item.name">
          <a :href="item.url" :target="isBlank">
            <div class="icon"></div>
            <div class="detail">
              <h3>{{ item.name }}</h3>
              <p>{{ item.engName }}</p>
            </div>
          </a>
        </li>
      </ul>
      <!-- 入驻 -->
      <div class="settled"></div>
      <!-- 推荐 -->
      <div class="recommend">
        <div class="tab">
          <div class="left">
            <span
              v-for="(item, index) in dataTypes"
              :key="index"
              :class="{
                active: dataIndex === index
              }"
              @click="handleTab(index)"
              >{{ item.name }}</span
            >
          </div>
          <div class="right">
            <a href="/resource" class="more" :target="isBlank">更多</a>
          </div>
        </div>
        <div class="content">
          <template v-if="dataIndex === 0">
            <tech-ach-list :dataList="queryResult" />
          </template>
          <template v-if="dataIndex === 1">
            <prod-ach-list :dataList="queryResult" />
          </template>
          <template v-if="dataIndex === 2">
            <demand-list :dataList="queryResult" />
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
import TechAchList from "@/common/resource/tech_ach_list";
import ProdAchList from "@/common/resource/prod_ach_list";
import DemandList from "@/common/resource/demand_list";
export default {
  name: "Homepage",
  components: {
    Backtop,
    SearchInput,
    TechAchList,
    ProdAchList,
    DemandList
  },
  data() {
    return {
      // 是否显示返回顶部
      showBack: false,
      statistics: [
        {
          currentValue: 0,
          targetValue: 564,
          name: "科技成果"
        },
        {
          currentValue: 0,
          targetValue: 298756,
          name: "企业需求"
        },
        {
          currentValue: 0,
          targetValue: 523,
          name: "合作机构"
        },
        {
          currentValue: 0,
          targetValue: 3264,
          name: "专家资源"
        },
        {
          currentValue: 0,
          targetValue: 298997,
          name: "科技活动"
        },
        {
          currentValue: 0,
          targetValue: 32538,
          name: "政策资源"
        }
      ],
      findList: [
        {
          name: "找技术",
          engName: "Find technology",
          url: "/resource"
        },
        {
          name: "找服务",
          engName: "Find service",
          url: "javascript:;"
        },
        {
          name: "找市场",
          engName: "Find market",
          url: "javascript:;"
        },
        {
          name: "找专家",
          engName: "Find an expert",
          url: "/resource/expert"
        }
      ],
      dataIndex: 0,
      dataTypes: [
        {
          name: "技术成果",
          apiUrl: "getTechAchlist"
        },
        {
          name: "产品成果",
          apiUrl: "getProdAchlist"
        },
        {
          name: "企业需求",
          apiUrl: "getDemlist"
        }
      ],
      // 是否还有数据可以进行下拉加载
      canLoadNextPage: false,
      queryCondition: {
        pageIndex: 1,
        pageSize: 10
      },
      queryResult: []
    };
  },
  created() {
    // 选项卡部分页面 因为页面常驻不会反复触发 created 生命周期
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
    // this.onshow(() => {
    //   this.queryCondition.pageIndex = 1;
    //   this.loadList();
    // });
  },
  methods: {
    goSearch(keywords) {
      this.redirectByPathBlank("/search", { keywords });
    },
    handleTab(index) {
      if (this.dataIndex === index) return;
      this.dataIndex = index;
      this.queryResult = [];
      this.queryCondition.pageIndex = 1;
      this.loadList();
    },
    loadList(clear = true) {
      this.showWXLoading({ type: "nav" });
      this.$api(
        "homepage",
        this.dataTypes[this.dataIndex].apiUrl,
        this.queryCondition
      ).then((res) => {
        this.hideWXLoading({ type: "nav" });
        const { pageIndex, pageSize } = this.queryCondition;
        this.canLoadNextPage = pageIndex * pageSize < res.count;
        if (clear) {
          this.queryResult = res.dataList;
        } else {
          this.queryResult.push.apply(this.queryResult, res.dataList);
        }
        // 如果是添加数据则显示返回
        this.showBack = !clear;
      });
    }
  }
};
</script>

<style lang="less">
.homepage {
  min-height: 100vh;
  background: #f4f8fb;
  .homepage__banner {
    height: 375 / @rem;
    background-image: url("~@/assets/images/homepage_banner.jpg");
    background-size: cover;
    background-position: center;
    // background-color: #264aec;
    // background-size: 100% 340 / @rem;
    // background-position: 0 bottom;
    // background-repeat: no-repeat;
  }
  .homepage__content {
    margin-top: -30 / @rem;
    padding-top: 30 / @rem;
    background: #f4f8fb;
    border-radius: 30 / @rem 30 / @rem 0 0;
    .statistics {
      display: flex;
      line-height: 24 / @rem;
      font-size: 24 / @rem;
      letter-spacing: 1 / @rem;
      .name {
        padding-left: 52 / @rem;
        font-weight: 800;
        background-size: auto 20 / @rem;
        background-image: url("~@/assets/images/homepage_statistics.png");
        background-position: 15 / @rem center;
        background-repeat: no-repeat;
      }
      .wx-swiper {
        flex: 1;
        height: 24 / @rem;
        .count {
          text-align: right;
          color: #999999;
          span {
            color: rgba(232, 21, 21, 1);
          }
        }
      }
    }
    .find {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 20 / @rem 0;
      li {
        width: 335 / @rem;
        margin: 10 / @rem 0;
        border-radius: 20 / @rem;
        background: #ffffff;
        &:nth-child(1) .icon {
          background-image: url("~@/assets/images/homepage_statistics_icon1.png");
        }
        &:nth-child(2) .icon {
          background-image: url("~@/assets/images/homepage_statistics_icon2.png");
        }
        &:nth-child(3) .icon {
          background-image: url("~@/assets/images/homepage_statistics_icon3.png");
        }
        &:nth-child(4) .icon {
          background-image: url("~@/assets/images/homepage_statistics_icon4.png");
        }
        > a {
          display: flex;
          padding: 16 / @rem 18 / @rem;
          .icon {
            width: 142 / @rem;
            height: 104 / @rem;
            margin-right: 17 / @rem;
            background-size: cover;
          }
          .detail {
            h3 {
              padding-top: 20 / @rem;
              line-height: 42 / @rem;
              font-size: 30 / @rem;
            }
            p {
              line-height: 30 / @rem;
              font-size: 18 / @rem;
              color: #999999;
            }
          }
        }
      }
    }
    .settled {
      height: 154 / @rem;
      background-size: cover;
      background-image: url("~@/assets/images/homepage_settled.png");
      background-position: center;
    }
    .recommend {
      padding-top: 50 / @rem;
      .tab {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20 / @rem;
        line-height: 54 / @rem;
        .left {
          span {
            position: relative;
            padding-bottom: 5 / @rem;
            margin-right: 50 / @rem;
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
        .right {
          font-size: 24 / @rem;
          color: #999999;
          .more {
            padding-right: 24 / @rem;
            background-size: auto 16 / @rem;
            background-image: url("~@/assets/images/more_icon.png");
            background-position: right 0 center;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
