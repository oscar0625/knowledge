<template>
  <div class="user-cer-page" v-show="cerInfo.cerCerStatus !== undefined">
    <my-header>实名认证</my-header>
    <template v-if="cerInfo.cerCerStatus === 0">
      <div class="certification__not">
        <div class="wrapper">
          <div class="explain">
            说明：认证成功后，可在平台发布成果、需求、对接 成果、需求
          </div>
          <section class="per">
            <a href="/userIssuePerCer/addition" :target="isBlank">
              <div class="name">
                <div class="icon"></div>
                <span>个人实名认证</span>
              </div>
              <ul>
                <li>适用个人用户，账号归属于个人；</li>
                <li>认证后，无法进行修改；</li>
                <li>
                  企业主体请尽量避免使用个人认证方式，以免企业人员变动或交接引起不必要的纠纷；
                </li>
              </ul>
            </a>
          </section>
          <section class="com">
            <a href="/userIssueComCer/addition" :target="isBlank">
              <div class="name">
                <div class="icon"></div>
                <span>企业实名认证</span>
              </div>
              <ul>
                <li>
                  适用企业、政府、事业单位、院校、科研院所等，账号归属企业；
                </li>
                <li>认证信息提交后，需等待1-3个工作日，进行人工审核；</li>
                <li>认证后，无法进行修改；</li>
              </ul>
            </a>
          </section>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="certification__start">
        <template v-if="cerTypeName === '个人用户'">
          <div class="status">
            <!-- 认证成功 -->
            <div class="status-success">
              <div class="icon-bg"><div class="icon"></div></div>
              <p>个人实名认证成功</p>
            </div>
          </div>
          <ul class="list">
            <li>
              <span>真实姓名</span>
              <p>{{ cerInfo.cerName }}</p>
              <!-- <a
                :href="`/userIssuePerCer/retrieve?id=${accountId}`"
                :target="isBlank"
              >
              </a> -->
            </li>
            <li>
              <span>联系方式</span>
              <p>13946406276</p>
            </li>
          </ul>
        </template>
        <template v-if="cerTypeName === '企业用户'">
          <div class="status">
            <!-- 认证中 -->
            <div class="status-ing" v-if="cerInfo.cerCerStatus === 1">
              <div class="icon-bg"><div class="icon"></div></div>
              <p>企业实名认证中...</p>
            </div>
            <!-- 认证成功 -->
            <div class="status-success" v-if="cerInfo.cerCerStatus === 2">
              <div class="icon-bg"><div class="icon"></div></div>
              <p>企业实名认证成功</p>
            </div>
            <!-- 认证失败 -->
            <div class="status-error" v-if="cerInfo.cerCerStatus === 3">
              <div class="icon-bg"><div class="icon"></div></div>
              <p>企业实名认证失败</p>
              <div class="re-cer">
                <a
                  :href="`/userIssueComCer/modify?id=${accountId}`"
                  :target="isBlank"
                  >重新提交</a
                >
              </div>
            </div>
          </div>
          <ul class="list">
            <li>
              <span>企业名称</span>
              <p>{{ cerInfo.cerName }}</p>
              <!-- <a
                :href="`/userIssueComCer/retrieve?id=${accountId}`"
                :target="isBlank"
              >
              </a> -->
            </li>
            <li>
              <span>营业执照</span>
              <p>{{ cerInfo.cerCode }}</p>
            </li>
            <li v-if="cerInfo.cerCerStatus === 3">
              <span>失败原因</span>
              <p>{{ cerInfo.certificationReason }}</p>
            </li>
          </ul>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "UserCer",
  data() {
    return {
      cerInfo: {}
    };
  },
  computed: {
    // 认证方式
    cerTypeName() {
      const { userOrCompany } = this.cerInfo;
      let name;
      switch (userOrCompany) {
        case 1:
          name = "个人用户";
          break;
        case 2:
          name = "企业用户";
          break;
      }
      return name;
    },
    // 认证方式对应的id
    accountId() {
      const { userOrCompany, id, companyId } = this.cerInfo;
      let name;
      switch (userOrCompany) {
        case 1:
          name = id;
          break;
        case 2:
          name = companyId;
          break;
      }
      return name;
    }
  },
  watch: {
    "$store.state.info": {
      handler(newValue, oldVue) {
        // 获取用户信息
        this.cerInfo = JSON.parse(JSON.stringify(newValue));
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // 下拉刷新
    this.onpulldownrefresh();
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "实名认证"
    });
    // 获取用户信息
    this.$store.dispatch("getInfo", this);
  },
  methods: {}
};
</script>

<style lang="less">
.user-cer-page {
  .certification__not {
    min-height: 100vh;
    background: #f7f7f7;
    border-radius: 30 / @rem 30 / @rem 0 / @rem 0 / @rem;
    .explain {
      padding: 24 / @rem 0;
      letter-spacing: 3 / @rem;
      line-height: 38 / @rem;
      color: #999999;
    }
    section {
      margin-bottom: 30 / @rem;
      background: #ffffff;
      border-radius: 20 / @rem;
      &.per {
        .name .icon {
          background: linear-gradient(
            90deg,
            rgba(250, 134, 21, 0.15),
            rgba(250, 156, 21, 0.15)
          );
          &::before {
            background-image: url("~@/assets/images/usercer_per.png");
          }
        }
        ul li::before {
          background: linear-gradient(
            90deg,
            rgba(250, 134, 21, 0.9),
            rgba(250, 156, 21, 0.9)
          );
        }
      }
      &.com {
        .name .icon {
          background: linear-gradient(
            90deg,
            rgba(12, 64, 212, 0.15),
            rgba(36, 91, 245, 0.15)
          );
          &::before {
            background-image: url("~@/assets/images/usercer_com.png");
          }
        }
        ul li::before {
          background: linear-gradient(
            90deg,
            rgba(12, 64, 212, 0.9),
            rgba(36, 91, 245, 0.9)
          );
        }
      }
      > a {
        display: block;
        padding: 30 / @rem;
      }
      .name {
        position: relative;
        padding-left: 85 / @rem;
        line-height: 70 / @rem;
        font-size: 34 / @rem;
        font-weight: 800;
        .icon {
          position: absolute;
          left: 0;
          top: 0;
          width: 70 / @rem;
          height: 70 / @rem;
          border-radius: 50%;
          &::before {
            content: "";
            position: absolute;
            top: 15 / @rem;
            left: 15 / @rem;
            width: 40 / @rem;
            height: 40 / @rem;
            background-size: cover;
            background-position: center;
          }
        }
      }
      ul {
        padding: 23 / @rem 0 3 / @rem;
        li {
          position: relative;
          padding-left: 52 / @rem;
          line-height: 42 / @rem;
          font-size: 28 / @rem;
          color: #666666;
          &::before {
            content: "";
            position: absolute;
            left: 30 / @rem;
            top: 17 / @rem;
            width: 8 / @rem;
            height: 8 / @rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .certification__start {
    .status {
      .icon-bg {
        width: 130 / @rem;
        height: 130 / @rem;
        margin: 127 / @rem auto 0;
        border-radius: 50%;
        .icon {
          width: 100%;
          height: 100%;
          background-size: 80 / @rem auto;
          background-position: center center;
          background-repeat: no-repeat;
        }
      }
      p {
        line-height: 120 / @rem;
        text-align: center;
        font-size: 42 / @rem;
        font-weight: 800;
      }
      .re-cer {
        line-height: 45 / @rem;
        text-align: center;
        font-size: 30 / @rem;
        color: @mainColor;
      }
      .status-ing {
        .icon-bg {
          background-color: #fa9b15;
          .icon {
            background-image: url("~@/assets/images/cet_status_ing.png");
          }
        }
        p {
          color: #fa9b15;
        }
      }
      .status-success {
        .icon-bg {
          background-color: #0dc385;
          .icon {
            background-image: url("~@/assets/images/cet_status_success.png");
          }
        }
        p {
          color: #0dc385;
        }
      }
      .status-error {
        .icon-bg {
          background-color: #d91717;
          .icon {
            background-image: url("~@/assets/images/cet_status_error.png");
          }
        }
        p {
          color: #d91717;
        }
      }
    }
    .list {
      padding: 0 40 / @rem;
      margin-top: 40 / @rem;
      border-top: 1 / @rem solid #f7f7f7;
      li {
        display: flex;
        justify-content: space-between;
        padding: 30 / @rem 0;
        border-bottom: 1 / @rem solid #f7f7f7;
        line-height: 48 / @rem;
        font-size: 30 / @rem;
        color: #141414;
        span {
          flex: none;
          margin-right: 40 / @rem;
          color: #666666;
        }
        a {
          color: @mainColor;
        }
      }
    }
  }
}
</style>
