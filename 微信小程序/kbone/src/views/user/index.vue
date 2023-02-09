<template>
  <div class="user-page">
    <div class="wrapper">
      <div class="user-page__info">
        <!-- @click="getUserProfile" -->
        <div
          class="avatar"
          :style="
            userInfo.imgUrl && `background-image: url('${userInfo.imgUrl}');`
          "
        ></div>
        <div class="other">
          <div class="name">
            <span>{{ userInfo.account }}</span>
            <template v-if="userInfo.cerCerStatus === 1">
              <div class="status warn">认证中</div>
            </template>
            <template v-if="userInfo.cerCerStatus === 2">
              <div class="status success">认证成功</div>
            </template>
            <template v-if="userInfo.cerCerStatus === 3">
              <div class="status error">认证失败</div>
            </template>
          </div>
          <div class="phone">{{ userInfo.phoneNumber }}</div>
        </div>
        <a href="/userInformation" class="link link-icon" :target="isBlank"></a>
      </div>
      <div class="user-page__issue">
        <div class="title">新需求发布</div>
        <ul class="list">
          <li v-for="item in issueList" :key="item.name">
            <a href="javascript:;" @click="handleSkip(item.url)">
              <div :class="`icon ${item.icon}`"></div>
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
      <ul class="user-page__synthesis">
        <li v-for="item in synthesisList" :key="item.name">
          <a :href="item.url" :target="isBlank">
            <div :class="`icon ${item.icon}`"></div>
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
      <ul class="user-page__manage">
        <li class="link-icon-mini" v-for="item in manageList" :key="item.name">
          <a :href="item.url" :target="isBlank">
            <div :class="`icon ${item.icon}`"></div>
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
      <div class="user-page__hotline">咨询电话：010-82318291</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  data() {
    return {
      userInfo: {},
      issueList: [
        {
          name: "发布技术成果",
          icon: "icon1",
          url: "/userIssueTech/addition"
        },
        {
          name: "发布企业需求",
          icon: "icon2",
          url: "/userIssueDem/addition"
        },
        {
          name: "发布产品成果",
          icon: "icon3",
          url: "/userIssueProd/addition"
        }
      ],
      synthesisList: [
        {
          name: "用户认证",
          icon: "icon1",
          url: "/userCer"
        },
        {
          name: "智能匹配",
          icon: "icon2",
          url: "/userMatch"
        },
        {
          name: "消息中心",
          icon: "icon3",
          url: "/userNotificationList"
        }
      ],
      manageList: [
        {
          name: "发布的成果",
          icon: "icon1",
          url: "/userIssueList/achievement"
        },
        {
          name: "发布的需求",
          icon: "icon2",
          url: "/userIssueList/demand"
        },
        {
          name: "对接的成果",
          icon: "icon3",
          url: "/userDockingList/achievement"
        },
        {
          name: "对接的需求",
          icon: "icon4",
          url: "/userDockingList/demand"
        },
        {
          name: "我的收藏",
          icon: "icon5",
          url: "/storeUp"
        },
        {
          name: "关于我们",
          icon: "icon6",
          url: "/aboutUs"
        }
        // {
        //   name: "切换账号",
        //   icon: "icon7",
        //   url: ""
        // }
      ]
    };
  },
  watch: {
    "$store.state.info": {
      handler(newValue, oldVue) {
        // 获取用户信息
        this.userInfo = JSON.parse(JSON.stringify(newValue));
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // 选项卡部分页面 因为页面常驻不会反复触发 created 生命周期
    this.onpulldownrefresh(() => {
      const isLogin = this.checkAuth();
      if (isLogin) {
        this.$store.dispatch("getInfo", this);
      }
    });
    // 获取用户信息
    this.$store.dispatch("getInfo", this);
  },
  methods: {
    handleSkip(url) {
      // 是否验证
      const isCer = this.checkCertificate();
      if (isCer) {
        this.redirectByPathBlank(url);
      }
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res);
        }
      });
    }
  }
};
</script>

<style lang="less">
.user-page {
  min-height: 100vh;
  background-color: #f7f7f7;
  .user-page__info {
    display: flex;
    padding-top: 15 / @rem;
    .avatar {
      flex: none;
      width: 110 / @rem;
      height: 110 / @rem;
      margin-right: 20 / @rem;
      border-radius: 50%;
      background-size: cover;
      background-image: url("~@/assets/images/user_avatar.png");
    }
    .other {
      flex: 1;
      .name {
        display: flex;
        span {
          line-height: 62 / @rem;
          font-size: 42 / @rem;
          font-weight: 800;
        }
        .status {
          align-self: center;
          height: 46 / @rem;
          padding: 0 20 / @rem 0 50 / @rem;
          margin-left: 18 / @rem;
          border-radius: 23 / @rem;
          line-height: 46 / @rem;
          font-size: 24 / @rem;
          background-color: rgba(255, 255, 255, 0.6);
          background-repeat: no-repeat;
          background-size: auto 30 / @rem;
          background-position: 12 / @rem center;
          &.warn {
            color: #fa9615;
            background-image: url("~@/assets/images/certification_warn_icon.png");
          }
          &.success {
            color: #0dc385;
            background-image: url("~@/assets/images/certification_success_icon.png");
          }
          &.error {
            color: #d91717;
            background-image: url("~@/assets/images/certification_error_icon.png");
          }
        }
      }
      .phone {
        line-height: 48 / @rem;
        font-size: 28 / @rem;
      }
    }
    .link {
      flex: none;
      width: 50 / @rem;
    }
  }
  .user-page__issue {
    height: 267 / @rem;
    margin-top: 50 / @rem;
    background-size: cover;
    background-position: center;
    background-image: url("~@/assets/images/userpage_issue.png");
    .title {
      line-height: 78 / @rem;
      text-align: center;
      font-size: 30 / @rem;
      font-weight: bold;
      color: #1d5feb;
    }
    .list {
      display: flex;
      justify-content: space-evenly;
      li {
        a {
          display: block;
          .icon {
            width: 74 / @rem;
            height: 74 / @rem;
            margin: 20 / @rem auto;
            border-radius: 50%;
            background-color: rgba(49, 129, 234, 0.5);
            background-repeat: no-repeat;
            background-size: 56 / @rem auto;
            background-position: center center;
            &.icon1 {
              background-image: url("~@/assets/images/userpage_issue_icon1.png");
            }
            &.icon2 {
              background-image: url("~@/assets/images/userpage_issue_icon2.png");
            }
            &.icon3 {
              background-image: url("~@/assets/images/userpage_issue_icon3.png");
            }
          }
          span {
            line-height: 1;
            color: #ffffff;
          }
        }
      }
    }
  }
  .user-page__synthesis {
    display: flex;
    justify-content: space-evenly;
    height: 155 / @rem;
    margin-top: 30 / @rem;
    border-radius: 30 / @rem;
    background-color: rgba(255, 255, 255, 1);
    // background-repeat: no-repeat;
    // background-size: 100% 50/@rem;
    background-image: linear-gradient(
      180deg,
      rgba(12, 64, 212, 0.08) 0%,
      rgba(36, 91, 245, 0.08) 100%
    );
    li {
      a {
        display: block;
        .icon {
          width: 60 / @rem;
          height: 60 / @rem;
          margin: 27 / @rem auto 14 / @rem;
          background-repeat: no-repeat;
          background-size: 60 / @rem auto;
          background-position: center center;
          &.icon1 {
            background-image: url("~@/assets/images/userpage_synthesis_icon1.png");
          }
          &.icon2 {
            background-image: url("~@/assets/images/userpage_synthesis_icon2.png");
          }
          &.icon3 {
            background-image: url("~@/assets/images/userpage_synthesis_icon3.png");
          }
        }
        span {
          line-height: 1;
        }
      }
    }
  }
  .user-page__manage {
    margin-top: 30 / @rem;
    border-radius: 30 / @rem;
    background-color: #ffffff;

    li {
      padding: 0 30 / @rem;
      a {
        display: flex;
        border-bottom: 1 / @rem solid #f7f7f7;
        .icon {
          flex: none;
          align-self: center;
          width: 46 / @rem;
          height: 46 / @rem;
          margin-right: 28 / @rem;
          background-size: 46 / @rem auto;
          &.icon1 {
            background-image: url("~@/assets/images/userpage_manage_icon1.png");
          }
          &.icon2 {
            background-image: url("~@/assets/images/userpage_manage_icon2.png");
          }
          &.icon3 {
            background-image: url("~@/assets/images/userpage_manage_icon3.png");
          }
          &.icon4 {
            background-image: url("~@/assets/images/userpage_manage_icon4.png");
          }
          &.icon5 {
            background-image: url("~@/assets/images/userpage_manage_icon5.png");
          }
          &.icon6 {
            background-image: url("~@/assets/images/userpage_manage_icon6.png");
          }
          &.icon7 {
            background-image: url("~@/assets/images/userpage_manage_icon7.png");
          }
        }
        span {
          line-height: 108 / @rem;
          font-size: 30 / @rem;
        }
      }
    }
  }
  .user-page__hotline {
    padding-bottom: 15 / @rem;
    line-height: 86 / @rem;
    text-align: center;
    color: #999999;
  }
}
</style>
