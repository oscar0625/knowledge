<template>
  <div class="user-information-page">
    <my-header>账号信息</my-header>
    <div class="tltle">基本信息</div>
    <ul class="list">
      <li>
        <span class="key">帐号昵称</span>
        <span class="value">{{ userInfo.cerName || "尚未认证" }}</span>
      </li>
      <li>
        <span class="key">当前身份</span>
        <span class="value">{{ cerTypeName }}</span>
      </li>
      <li>
        <span class="key">实名认证</span>
        <template v-if="userInfo.cerCerStatus === 0">
          <span class="value">实名认证</span>
        </template>
        <template v-if="userInfo.cerCerStatus === 1">
          <span class="value">认证中</span>
        </template>
        <template v-if="userInfo.cerCerStatus === 2">
          <span class="value">已认证</span>
        </template>
        <template v-if="userInfo.cerCerStatus === 3">
          <span class="value">认证失败</span>
        </template>
        <a class="link-icon-mini" href="/userCer" :target="isBlank"></a>
      </li>
      <li>
        <span class="key">联系手机</span>
        <span class="value">{{ userInfo.phoneNumber }}</span>
        <a
          class="link-icon-mini"
          href="javascript:;"
          @click="showPhoneAuth = true"
        ></a>
      </li>
      <li>
        <span class="key">注册方式</span>
        <span class="value">手机号注册</span>
      </li>
    </ul>
    <div class="ewm">
      <my-ewm />
    </div>
    <phone-auth :visible.sync="showPhoneAuth" @complete="phoneAuthComplete" />
    <change-phone
      :visible.sync="showChangePhone"
      @complete="changePhoneComplete"
    />
  </div>
</template>

<script>
import MyEwm from "@/common/my_ewm";
import PhoneAuth from "@/common/user/phone_auth";
import ChangePhone from "@/common/user/change_phone";
export default {
  name: "UserInformation",
  components: {
    MyEwm,
    PhoneAuth,
    ChangePhone
  },
  data() {
    return {
      userInfo: {},
      showPhoneAuth: false,
      showChangePhone: false
    };
  },
  computed: {
    // 认证方式
    cerTypeName() {
      const { userOrCompany } = this.userInfo;
      let name;
      switch (userOrCompany) {
        case 1:
          name = "个人";
          break;
        case 2:
          name = "企业";
          break;
      }
      return name;
    }
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
    // 下拉刷新
    this.onpulldownrefresh();
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: "账号信息"
    });
    // 获取用户信息
    this.$store.dispatch("getInfo", this);
  },
  methods: {
    phoneAuthComplete() {
      this.showChangePhone = true;
    },
    changePhoneComplete() {
      // 获取用户信息
      this.$store.dispatch("getInfo", this);
    }
  }
};
</script>

<style lang="less">
.user-information-page {
  position: relative;
  min-height: 100vh;
  .tltle {
    padding: 30 / @rem 0 0 30 / @rem;
    line-height: 74 / @rem;
    font-size: 34 / @rem;
    font-weight: 800;
    color: #000000;
  }
  .list {
    li {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 0 60 / @rem 0 30 / @rem;
      line-height: 70 / @rem;
      font-size: 30 / @rem;
      color: #666666;
      > a {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .value {
        color: #141414;
      }
    }
  }
  .ewm {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 100 / @rem;
  }
}
</style>
