<template>
  <div class="discover-page wrapper">
    <my-header bgColor="#f7f7f7">发现</my-header>
    <div class="activity">
      <div class="common-title">
        <span class="name">创新活动</span>
        <a class="more" href="/activityList" :target="isBlank">更多</a>
      </div>
      <wx-swiper
        class="wx-swiper"
        :indicator-dots="true"
        indicator-color="#ffffff"
        indicator-active-color="#1f56ef"
        :circular="true"
      >
        <wx-swiper-item v-for="item in activityList" :key="item.id">
          <activity-list-item
            :info="item"
            :showApply="item.statusName == '报名中'"
            @apply="handleActApply"
          />
        </wx-swiper-item>
      </wx-swiper>
    </div>
    <div class="card">
      <a class="left" href="/projectList" :target="isBlank"></a>
      <div class="right">
        <a href="/policyList" :target="isBlank">
          <h4>读政策</h4>
          <p>点击查看</p>
        </a>
        <a href="/newsList" :target="isBlank">
          <h4>阅资讯</h4>
          <p>点击查看</p>
        </a>
      </div>
    </div>
    <div class="project">
      <div class="common-title">
        <span class="name">热推项目</span>
      </div>
      <ul class="list">
        <li v-for="(item, index) in projectList" :key="index">
          <div class="title">
            <h4>{{ item.title }}</h4>
            <a
              href="javascript:;"
              @click="
                handleProApply({
                  itemName: item.title,
                  typeName: item.type
                })
              "
              >立即申报</a
            >
          </div>
          <div class="detail">
            <p v-for="line in item.list" :key="line" v-html="line"></p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 活动报名 -->
    <activity-apply
      :visible.sync="showActivityApply"
      :dataId="activityApplyId"
    />
    <!-- 项目申报 -->
    <project-apply
      :visible.sync="showProjectApply"
      :projectDetail="projectDetail"
    />
  </div>
</template>

<script>
import ActivityListItem from "@/common/discover/activity_list_item";
import ActivityApply from "@/common/discover/activity_apply";
import ProjectApply from "@/common/discover/project_apply";
export default {
  name: "DiscoverPage",
  components: {
    ActivityListItem,
    ActivityApply,
    ProjectApply
  },
  data() {
    return {
      activityList: [],
      activityApplyId: "",
      showActivityApply: false,
      projectList: [
        {
          type: "资质认定类",
          title: "高新技术企业",
          list: [
            "企业所得税优惠<b>10%</b>",
            "研发费用可以用来抵税，并且抵税比例比普通的企业高<b>75%</b>",
            "固定资产加速折旧"
          ]
        },
        {
          type: "资质认定类",
          title: "国家级科技企业孵化器认定",
          list: ["免征房产税和城镇土地使用税", "对于服务取得的收入，免征增值税"]
        },
        {
          type: "资质认定类",
          title: "国家专精特新 “小巨人”认定",
          list: [
            "资金扶持<b>200万/年</b>，在有效期3年内资金支持共<b>600万</b>",
            "颁发“国家专精特新小巨人”企业证书",
            "“一企一策”给予帮助"
          ]
        },
        {
          type: "资质认定类",
          title: "北京市中小企业公共服务示范平台",
          list: [
            "支持金额最高可达<b>200万</b>",
            "提供技术研发支持、知识产权、成果转化等服务",
            "提供上云用云、数字化智能化改造等服务，助力企业提质增效"
          ]
        },
        {
          type: "专项类",
          title: "中关村国家自主创新示范区重大前沿项目与创新平台建设",
          list: [
            "第一年最高支持额度可达<b>1000万元</b>",
            "第二年最高支持额度可达<b>2000万元</b>",
            "第三年最高支持额度可达<b>3000万元</b>",
            "连续支持不超过3年"
          ]
        },
        {
          type: "专项类",
          title: "北京市科技成果转化平台建设专项、中关村科技服务平台专项",
          list: ["最高可获得支持资金<b>200万元</b>"]
        },
        {
          type: "专项类",
          title: "中关村颠覆性技术研发和成果转化项目",
          list: [
            "第一年支持金额最高可达<b>200万元</b>",
            "第二年支持金额最高可达<b>500万元</b>",
            "第三年支持金额最高可达<b>500万元</b>"
          ]
        },
        {
          type: "人才团队类",
          title: "北京市高精尖产业发展资金管理办法",
          list: [
            "贷款贴息：分年度贴息，单个企业每年贴息额最高不超过<b>1000万元</b>",
            "保险补贴：分年度安排，最高不超过3年，单个企业年度补贴金额不超过<b>1000万元</b>",
            "融资租赁补贴：分年度安排，最高不超过3年，年度补贴金额不超过<b>1000万元</b>"
          ]
        },
        {
          type: "人才团队类",
          title: "北京市中小企业发展专项资金",
          list: [
            "支持中小企业提升创新能力及专业化水平，优化创新创业环境",
            "支持完善中小企业公共服务体系，促进中小企业开展合作交流",
            "支持中小企业融资服务体系建设，促进中小企业融资",
            "其他促进中小企业发展的工作"
          ]
        }
      ],
      projectDetail: {},
      showProjectApply: false
    };
  },
  created() {
    // 选项卡部分页面 因为页面常驻不会反复触发 created 生命周期
    this.onpulldownrefresh(() => {
      this.loadData();
    });
    this.loadData();
  },
  methods: {
    // 获取数据
    loadData() {
      this.showWXLoading({ type: "nav" });
      return Promise.all([
        this.$api("information", "getActivityRecommend", {})
      ]).then(([{ dataList: activityList }]) => {
        this.hideWXLoading({ type: "nav" });
        this.activityList = activityList;
      });
    },
    // 活动报名
    handleActApply(id) {
      this.activityApplyId = id;
      this.showActivityApply = true;
    },
    // 项目申报
    handleProApply(params) {
      this.projectDetail = params;
      this.showProjectApply = true;
    }
  }
};
</script>

<style lang="less">
.discover-page {
  min-height: 100vh;
  background-color: #f7f7f7;
  .common-title {
    display: flex;
    justify-content: space-between;
    padding-left: 63 / @rem;
    line-height: 94 / @rem;
    background-size: auto 50 / @rem;
    background-repeat: no-repeat;
    background-position: 0 center;
    .name {
      font-size: 34 / @rem;
      font-weight: 800;
      color: #000000;
    }
    .more {
      padding-right: 24 / @rem;
      font-size: 24 / @rem;
      color: #999999;
      background-size: auto 16 / @rem;
      background-image: url("~@/assets/images/more_icon.png");
      background-position: right 0 center;
      background-repeat: no-repeat;
    }
  }
  .activity {
    .common-title {
      background-image: url("~@/assets/images/discover_page_icon4.png");
    }
    .wx-swiper {
      height: 720 / @rem;
      .wx-swiper-dots {
        .wx-swiper-dot {
          width: 30 / @rem;
          height: 5 / @rem;
          margin: 0 5 / @rem;
          border-radius: 0;
        }
      }
    }
  }
  .card {
    display: flex;
    justify-content: space-between;
    padding: 30 / @rem 0;
    .left {
      width: 335 / @rem;
      height: 335 / @rem;
      background-size: cover;
      background-image: url("~@/assets/images/discover_page_icon1.png");
      background-position: center;
    }
    .right {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      > a {
        box-sizing: border-box;
        width: 335 / @rem;
        height: 159 / @rem;
        padding-left: 172 / @rem;
        border-radius: 20 / @rem;
        background-color: #fff;
        background-size: auto 159 / @rem;
        background-repeat: no-repeat;
        background-position: 6 / @rem center;
        &:nth-child(1) {
          background-image: url("~@/assets/images/discover_page_icon2.png");
        }
        &:nth-child(2) {
          background-image: url("~@/assets/images/discover_page_icon3.png");
        }
        h4 {
          padding-top: 36 / @rem;
          line-height: 49 / @rem;
          font-size: 34 / @rem;
          font-weight: 800;
        }
        p {
          line-height: 39 / @rem;
          font-size: 24 / @rem;
          color: rgba(153, 153, 153, 0.6);
          background-size: auto 16 / @rem;
          background-repeat: no-repeat;
          background-position: right 40 / @rem center;
          background-image: url("~@/assets/images/link_icon1.png");
        }
      }
    }
  }
  .project {
    .common-title {
      background-image: url("~@/assets/images/discover_page_icon5.png");
    }
    .list {
      overflow: hidden;
      li {
        padding: 0 10 / @rem 10 / @rem;
        margin-bottom: 20 / @rem;
        border-radius: 30 / @rem;
        background: #ffffff;
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22 / @rem 0;
          h4 {
            padding: 0 10 / @rem;
            line-height: 50 / @rem;
            font-size: 34 / @rem;
            font-weight: bold;
            color: #000000;
          }
          a {
            flex: none;
            width: 157 / @rem;
            height: 56 / @rem;
            border-radius: 28 / @rem;
            line-height: 56 / @rem;
            text-align: center;
            font-size: 24 / @rem;
            color: #ffffff;
            background: linear-gradient(90deg, #0c40d4, #245bf5);
          }
        }
        .detail {
          min-height: 90 / @rem;
          padding: 20 / @rem 30 / @rem;
          border-radius: 30 / @rem;
          background: #f7f7f7;
          p {
            position: relative;
            padding-left: 20 / @rem;
            line-height: 45 / @rem;
            font-size: 28 / @rem;
            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 18 / @rem;
              width: 8 / @rem;
              height: 8 / @rem;
              background: linear-gradient(90deg, #0c40d4, #245bf5);
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
</style>
