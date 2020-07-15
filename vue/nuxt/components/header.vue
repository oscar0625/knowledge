<template>
  <el-header id="myHeader" height="60px">
    <div>
      <el-row class="wrapper">
        <el-col :span="12">
          <el-col class="logo" :span="9">
            <nuxt-link to="/">技术课程中心</nuxt-link>
          </el-col>
          <el-col :span="15">
            <el-menu
              mode="horizontal"
              text-color="#ffffff"
              active-text-color="#0379fe"
              :default-active="menuIndex"
              :router="true"
              class="el-menu-demo"
            >
              <el-menu-item index="首页" :route="{ path: '/' }"
                >首页</el-menu-item
              >
              <el-menu-item index="课程" :route="{ path: '/course' }"
                >课程</el-menu-item
              >
            </el-menu>
          </el-col>
        </el-col>
        <el-col :span="12">
          <el-col class="search" :span="10" :offset="7">
            <el-input
              v-model="keysText"
              placeholder="输入课程名称"
              suffix-icon="el-icon-search"
              @keydown.enter.native="handleSearch"
            >
            </el-input>
          </el-col>
          <el-col class="login" :span="6" :offset="1">
            <template v-if="isLogin">
              <div>
                {{ userName | lengthFilter(7) }}
              </div>
            </template>
            <template v-else>
              <nuxt-link :to="{ path: '/login', query: { path: $route.path } }"
                >登录</nuxt-link
              >
              <span>|</span>
              <nuxt-link
                :to="{ path: '/register', query: { path: $route.path } }"
                >注册</nuxt-link
              >
            </template>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {
      menuIndex: "",
      menuList: [
        {
          name: "课程",
          reg: /course/
        }
      ],
      keysText: "",
      isLogin: false,
      userName: "这是我的用户名"
    };
  },
  watch: {
    $route: "showMenu"
  },
  created() {
    this.showMenu();
  },
  methods: {
    showMenu() {
      const { path } = this.$route;
      if (path === "/") {
        this.menuIndex = "首页";
        return;
      }
      this.menuList.some((item) => {
        const bool = item.reg.test(path);
        if (bool) {
          this.menuIndex = item.name;
          return true;
        }
      });
    },
    handleSearch() {
      const value = this.keysText.trim();
      if (value) {
        // 关键字改变 页面query改变
        this.redirectByPath("/course", { keysText: value });
      }
      this.keysText = "";
    }
  }
};
</script>

<style lang="less">
@font-face {
  font-family: "庞门正道";
  src: url("../assets/font/PANGMENZHENGDAO.TTF");
}
#myHeader {
  padding: 0;
  color: #fff;
  background: @envColor1;
  > div {
    height: 60px;
    line-height: 60px;
  }
  .logo {
    font-size: 26px;
    font-family: "庞门正道";
  }
  .el-menu-demo {
    border-bottom: none;
    height: 60px;
    background: transparent;
    .el-menu-item {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      background: transparent;
      &:hover {
        background: #2f2f2f;
      }
    }
  }
  .search {
    .el-input {
      .el-input__inner {
        color: #fff;
        border-width: 2px;
        border-radius: 20px;
        background: transparent;
      }
      .el-input__suffix {
        font-size: 20px;
      }
    }
  }
  .login {
    font-size: 16px;
    text-align: right;
    letter-spacing: 3px;
    a:hover {
      color: @mainColor;
    }
    div {
      color: @mainColor;
      letter-spacing: 0px;
    }
  }
}
</style>
