<template>
  <div class="user-docking-info-page" v-if="info && queryResult">
    <my-header bgColor="#f7f7f7">{{
      (this.projectTypeName === "achievement" ? "成果" : "需求") + "对接"
    }}</my-header>
    <div class="docking-info__content">
      <div class="tltle">
        {{ info.name }}
      </div>
      <div class="relation">
        <span
          >关联{{ projectTypeName === "achievement" ? "成果" : "需求" }}：</span
        >
        <template v-if="info.relationCode === '--'">
          <span>暂未关联数据</span>
        </template>
        <template v-else>
          <!-- 待续 -->
          <!-- `${projectTypeName}/${info.relationId}` -->
          <a href="" :target="isBlank">{{ info.relationCode }}</a>
        </template>
      </div>
      <div class="status">
        <p>
          工程状态：<span
            :class="{
              in: inStatus,
              out: outStatus
            }"
            >{{ info.projectStatusName }}</span
          >
        </p>
        <template v-if="noStatus && hasValidData">
          <wx-button
            class="wx-button"
            type="primary"
            :disabled="isLoading"
            :loading="isLoading"
            @click="handleStartDocking"
            >开始对接</wx-button
          >
        </template>
        <template v-if="inStatus">
          <wx-button
            class="wx-button"
            type="primary"
            :disabled="isLoading"
            :loading="isLoading"
            @click="handleCloseDocking"
            >关闭对接</wx-button
          >
        </template>
      </div>
    </div>
    <!-- 无数据情况 -->
    <template v-if="!hasData">
      <div class="docking-info__nodata">
        <no-data type="docking" />
      </div>
    </template>
    <template v-else>
      <div class="wrapper">
        <div class="docking-info__data">
          <div
            :class="{
              'docking-info__name': true,
              expansion: dataExpansion
            }"
            @click="handleExpansion('dataExpansion')"
          >
            <h4>{{ dataTypeName === "achievement" ? "成果" : "需求" }}数据</h4>
          </div>
          <div ref="dataExpansion" class="list">
            <template v-if="dataTypeName === 'achievement'">
              <docking-ach-list :dataList="queryResult" />
            </template>
            <template v-if="dataTypeName === 'demand'">
              <docking-demand-list :dataList="queryResult" />
            </template>
          </div>
        </div>

        <div v-if="progressList.length > 0" class="docking-info__docking">
          <div
            :class="{
              'docking-info__name': true,
              expansion: progressExpansion
            }"
            @click="handleExpansion('progressExpansion')"
          >
            <h4>对接进度详情</h4>
          </div>
          <div ref="progressExpansion" class="list">
            <ul>
              <li v-for="item in progressList" :key="item.projectId">
                <h4>
                  <span>{{ item.dockingStatusName }}</span>
                  <span>{{ item.lastUpdateTime }}</span>
                </h4>
                <p>
                  {{ item.description }}
                </p>
                <div class="icon"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import noData from "@/common/no_data";
import dockingDemandList from "@/common/user/docking_demand_list";
import dockingAchList from "@/common/user/docking_ach_list";
export default {
  name: "UserDockingInfo",
  components: { noData, dockingDemandList, dockingAchList },
  data() {
    return {
      // 控制展开与否
      dataExpansion: true,
      progressExpansion: true,
      // 展开动画是否在执行中
      isExpansionAnimating: false,
      // 工程类型
      projectTypeName: "",
      // 数据类型 成果对需求 需求对成果
      dataTypeName: "",
      isLoading: false,
      info: null,
      queryResult: null,
      progressList: []
    };
  },
  computed: {
    hasData() {
      return Array.isArray(this.queryResult) && this.queryResult.length > 0;
    },
    // 如果有有效的数据
    hasValidData() {
      return (
        Array.isArray(this.queryResult) &&
        this.queryResult.some((item) => item.state !== 3)
      );
    },
    // 0-未对接，1-对接中，2-对接关闭
    noStatus() {
      return this.info.projectStatus === 0;
    },
    inStatus() {
      return this.info.projectStatus === 1;
    },
    outStatus() {
      return this.info.projectStatus === 2;
    }
  },
  created() {
    // 下拉刷新
    this.onpulldownrefresh();

    const { type } = this.$route.params;
    this.projectTypeName = type;
    this.dataTypeName = type === "achievement" ? "demand" : "achievement"; // 需求工程对接成果 成果工程对接需求
    // 设置选项卡名
    this.setNavigationBarTitle({
      title: (this.projectTypeName === "achievement" ? "成果" : "需求") + "对接"
    });
    this.setNavigationBarColor({
      backgroundColor: "f7f7f7"
    });

    // 加载数据
    this.showWXLoading({
      title: "加载中",
      mask: true
    });
    Promise.all([this.loadProjectInfo(), this.loadDockingList()]).then(() => {
      this.hideWXLoading();
    });
  },
  methods: {
    // 点击收缩/展开
    handleExpansion(target) {
      const ele = this.$refs[target];
      // 展开动画正在执行中 防止快速点击
      if (this.isExpansionAnimating) return;
      this.isExpansionAnimating = true;
      if (this[target]) {
        this.zoomout({
          ele,
          cbk: () => {
            this[target] = false;
            this.isExpansionAnimating = false;
          },
          duration: 500
        });
      } else {
        this.zoomin({
          ele,
          cbk: () => {
            this[target] = true;
            this.isExpansionAnimating = false;
          },
          duration: 500
        });
      }
    },
    // 开始工程对接
    handleStartDocking() {
      this.isLoading = true;
      const { id } = this.$route.query;
      return this.$api("project", "startDocking", {
        id
      }).then((res) => {
        this.isLoading = false;

        this.$message({
          message: res.message,
          type: res.code === 0 ? "success" : "error"
        });
        if (res.code === 0) {
          this.loadProjectInfo();
        }
      });
    },
    // 关闭工程对接
    handleCloseDocking() {
      this.isLoading = true;
      const { id } = this.$route.query;
      return this.$api("project", "closeDocking", {
        id
      }).then((res) => {
        this.isLoading = false;
        this.$message({
          message: res.message,
          type: res.code === 0 ? "success" : "error"
        });
        if (res.code === 0) {
          this.loadProjectInfo();
        }
      });
    },
    // 加载工程数据接口
    loadProjectInfo() {
      const { id } = this.$route.query;
      return this.$api("project", "getProjectInfo", {
        id
      }).then(({ project: info, dataList: progressList }) => {
        this.info = info;
        this.progressList = progressList;
      });
    },
    // 加载工程对接的信息
    loadDockingList() {
      const { id } = this.$route.query;
      return this.$api(
        "project",
        this.dataTypeName === "achievement"
          ? "getAchProjectInfo"
          : "getDemProjectInfo",
        {
          id
        }
      ).then(({ dataList: queryResult }) => {
        this.queryResult = queryResult;
      });
    }
    // // 删除工程中的成果或需求
    // handleDelete(dockingId) {
    //   const { id } = this.$route.query;
    //   this.$api("project", "deleleDateInProject", {
    //     projectId: id,
    //     dockingId
    //   }).then((res) => {
    //     this.$message({
    //       message: res.message,
    //       type: res.code === 0 ? "success" : "error"
    //     });
    //     if (res.code === 0) {
    //       this.loadDockingList();
    //     }
    //   });
    // }
  }
};
</script>
<style lang="less">
.user-docking-info-page {
  overflow: hidden;
  min-height: 100vh;
  background-color: #f7f7f7;
  .docking-info__name {
    position: relative;
    line-height: 84 / @rem;
    font-size: 34 / @rem;
    font-weight: 800;
    color: #000000;
    &.expansion {
      &::after {
        transform: rotate(180deg);
      }
    }
    &::after {
      content: "";
      top: 29 / @rem;
      right: 0;
      position: absolute;
      width: 26 / @rem;
      height: 26 / @rem;
      background-image: url("~@/assets/images/icon_down.png");
      background-size: cover;
      background-position: center;
      transition: transform 0.5s;
    }
  }
  .docking-info__content {
    padding: 35 / @rem 30 / @rem 30 / @rem;
    margin-top: 20 / @rem;
    border-radius: 30 / @rem;
    background: #ffffff;
    .tltle {
      line-height: 72 / @rem;
      font-size: 42 / @rem;
      font-weight: 800;
      color: #000000;
    }
    .relation {
      line-height: 56 / @rem;
      a {
        color: @mainColor;
      }
    }
    .status {
      display: flex;
      justify-content: space-between;
      > p {
        line-height: 66 / @rem;
        span {
          color: @mainColor;
          &.in {
            color: #38b466;
          }
          &.out {
            color: #f23b43;
          }
        }
      }
      .wx-button {
        width: 216 / @rem;
        height: 66 / @rem;
        margin: 0;
        line-height: 66 / @rem;
        border-radius: 33 / @rem;
        font-size: 28 / @rem;
        font-weight: bold;
        color: #ffffff;
        background-color: transparent;
        background-image: linear-gradient(90deg, #0c40d4, #245bf5);
        &::after {
          display: none;
        }
      }
    }
  }
  .docking-info__nodata {
    padding-top: 140 / @rem;
  }
  .docking-info__data {
    padding-top: 25 / @rem;
    .list {
      overflow: hidden;
      // height: 0;
      padding-top: 5 / @rem;
    }
  }
  .docking-info__docking {
    .list {
      overflow: hidden;
      // height: 0;
      padding-top: 15 / @rem;
      ul {
        li {
          position: relative;
          padding: 0 0 30 / @rem 56 / @rem;
          &:first-child {
            h4 {
              font-weight: 800;
              color: @mainColor;
              span:last-child {
                font-weight: 400;
                color: @mainColor;
              }
            }
            .icon {
              background-color: @mainColor;
            }
          }
          .icon {
            position: absolute;
            top: 10 / @rem;
            left: 0;
            width: 30 / @rem;
            height: 30 / @rem;
            border-radius: 50%;
            background-color: #cccccc;
            background-image: url("~@/assets/images/icon_user.png");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 18 / @rem;
          }
          h4 {
            font-size: 30 / @rem;
            font-weight: 400;
            color: #666666;
            line-height: 50 / @rem;
            span:last-child {
              padding-left: 30 / @rem;
              font-size: 24 / @rem;
              color: #999999;
            }
          }
          p {
            line-height: 46 / @rem;
            font-size: 26 / @rem;
            font-weight: 400;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
