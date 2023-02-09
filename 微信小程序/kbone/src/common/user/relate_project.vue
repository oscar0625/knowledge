<template>
  <div v-if="visible">
    <wx-animation ref="relateProject" class="relate-project-dialog">
      <div class="mask" @click="hideContent"></div>
      <div class="relate-project-dialog__content">
        <div class="name">
          <h2>关联工程</h2>
          <p>
            请选择要关联的数据或直接<span @click="completeRelate"
              >点击跳过</span
            >
          </p>
        </div>
        <div class="list">
          <template v-if="queryResult.length > 0">
            <wx-scroll-view
              ref="wx-scroll-view-y"
              class="wx-scroll-view-y"
              :scroll-y="true"
            >
              <ul>
                <li
                  v-for="item in queryResult"
                  :key="item.id"
                  @click="loadRelateData(item.id)"
                >
                  {{ item.name | lengthFilter(20) }}
                </li>
              </ul>
            </wx-scroll-view>
          </template>
          <template v-else>
            <no-data type="issue" class="nodata" />
          </template>
        </div>
      </div>
    </wx-animation>
  </div>
</template>

<script>
import noData from "@/common/no_data";
export default {
  name: "RelateProject",
  components: {
    noData
  },
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    dataType: {
      type: String,
      required: true
    },
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 关联类型
      type: {
        achievement: 1,
        demand: 2
      },
      // 加载数据
      queryCondition: {
        createBy: "",
        state: -1,
        dateOrder: 0,
        pageIndex: 1,
        pageSize: 10000
      },
      queryResult: []
    };
  },
  computed: {
    dockingType() {
      return this.type[this.dataType];
    }
  },
  watch: {
    visible: "showContent"
  },
  created() {
    this.loadList();
  },
  methods: {
    // 如果 visible 为 true 则显示
    showContent() {
      this.$nextTick(() => {
        if (this.visible) {
          this.animShowElement(this.$refs.relateProject, "animate__fadeIn");
        }
      });
    },
    // 隐藏内容 并将 visible 置为 false
    hideContent() {
      return new Promise((resolve, reject) => {
        this.animHideElement(
          this.$refs.relateProject,
          "animate__fadeOut",
          () => {
            this.$emit("update:visible", false);
            resolve();
          }
        );
      });
    },
    // 获取用户发布的成果/需求/专利
    loadList() {
      this.$api(this.dataType, "getIssueList", this.queryCondition).then(
        (res) => {
          this.queryResult = res.dataList.filter((item) => {
            return item.state !== "3";
          });
        }
      );
    },
    loadRelateData(id) {
      this.showWXLoading({
        title: "关联数据中",
        mask: true
      });
      this.$api("project", "relateData", {
        dockingType: this.dockingType,
        id: this.projectId,
        relationId: id
      }).then((res) => {
        this.hideWXLoading();
        if (res.code === 0) {
          this.completeRelate();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 完成关联或点击跳过后执行
    completeRelate() {
      this.hideContent().then(() => {
        this.$emit("complete", true);
      });
    }
  }
};
</script>

<style lang="less">
.relate-project-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  --animate-duration: 400ms;

  .mask {
    position: absolute;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .relate-project-dialog__content {
    position: absolute;
    z-index: 100;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    border-radius: 30 / @rem 30 / @rem 0 / @rem 0 / @rem;
    .name {
      padding: 40 / @rem 0;
      text-align: center;
      h2 {
        line-height: 58 / @rem;
        font-size: 40 / @rem;
      }
      p {
        color: #666666;
        > span {
          color: @mainColor;
          padding-left: 10 / @rem;
        }
      }
    }
    .list {
      overflow: hidden;
      width: 690 / @rem;
      padding-bottom: 33 / @rem;
      margin: 0 auto;
      .wx-scroll-view-y {
        width: 710 / @rem;
        // width: 100%;
        height: 325 / @rem;
      }
      ul {
        li {
          line-height: 50 / @rem;
          text-align: center;
          font-size: 30 / @rem;
        }
      }
      .nodata {
        height: 325 / @rem;
      }
    }
  }
}
</style>
