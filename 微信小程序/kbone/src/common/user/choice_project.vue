<template>
  <div v-if="visible">
    <wx-animation ref="choiceProject" class="choice-project-dialog">
      <div class="mask" @click="hideContent"></div>
      <div class="choice-project-dialog__content">
        <div class="name">
          <h2>选择工程</h2>
        </div>
        <div class="list">
          <wx-scroll-view
            ref="wx-scroll-view-y"
            class="wx-scroll-view-y"
            :scroll-y="true"
          >
            <ul>
              <li @click="showCreateProject = true">
                <p>创建工程</p>
              </li>
              <li
                v-for="item in projectList"
                :key="item.id"
                @click="handleProject(item)"
              >
                <p>{{ item.name | lengthFilter(6) }}</p>
              </li>
            </ul>
          </wx-scroll-view>
        </div>
      </div>
    </wx-animation>
    <create-project
      :visible.sync="showCreateProject"
      :dataType="dataType"
      @complete="createComplete"
    />
    <relate-project
      :visible.sync="showRelateProject"
      :dataType="dataType"
      :projectId="projectId"
      @complete="relateComplete"
    />
  </div>
</template>

<script>
import CreateProject from "@/common/user/create_project";
import RelateProject from "@/common/user/relate_project";
export default {
  name: "ChoiceProject",
  components: {
    CreateProject,
    RelateProject
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
    dataId: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      // 关联类型
      type: {
        achievement: 1,
        demand: 2
      },
      // 已经创建的工程列表
      projectList: [],
      projectId: "",
      // 创建工程弹框可见性
      showCreateProject: false,
      // 关联工程弹框可见性
      showRelateProject: false
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
  methods: {
    // 如果 visible 为 true 则显示
    showContent() {
      this.$nextTick(() => {
        if (this.visible) {
          this.loadProjectList();
          this.animShowElement(this.$refs.choiceProject, "animate__fadeIn");
        }
      });
    },
    // 隐藏内容 并将 visible 置为 false
    hideContent() {
      return new Promise((resolve, reject) => {
        this.animHideElement(
          this.$refs.choiceProject,
          "animate__fadeOut",
          () => {
            this.$emit("update:visible", false);
            resolve();
          }
        );
      });
    },
    // 加载已经创建的工程列表
    loadProjectList() {
      return this.$api("project", "getUserProjectList", {
        dockingType: this.dockingType,
        pageIndex: 1,
        pageSize: 10000
      }).then((res) => {
        this.projectList = res.projectList;
      });
    },
    // 创建工程完成回调
    createComplete() {
      this.loadProjectList();
    },
    // 点击工程进行对接
    handleProject({ id, relationId }) {
      this.projectId = id;
      // 如果工程已经关联过 直接对接
      if (relationId) {
        this.loadDocking();
      } else {
        // 显示关联工程
        this.showRelateProject = true;
      }
    },
    // 关联操作完成后进行对接
    relateComplete() {
      this.loadDocking();
    },
    // 对接
    loadDocking() {
      this.showWXLoading({
        title: "对接数据中",
        mask: true
      });
      this.$api("project", "dockingProject", {
        dockingType: this.dockingType,
        projectId: this.projectId,
        dockingId: this.dataId
      }).then((res) => {
        this.hideWXLoading();
        this.$message({
          message: res.message,
          type: res.code === 0 ? "success" : "error"
        });
        if (res.code === 0) {
          // 必须隐藏 否则需要手动刷新 loadProjectList 接口
          this.hideContent().then(() => {
            this.$emit("complete", true);
          });
        } else {
          // 失败情况下手动刷新 loadProjectList 接口
          this.loadProjectList();
        }
      });
    }
  }
};
</script>

<style lang="less">
.choice-project-dialog {
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

  .choice-project-dialog__content {
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
        line-height: 44 / @rem;
        color: #666666;
      }
    }
    .list {
      overflow: hidden;
      width: 690 / @rem;
      padding-bottom: 52 / @rem;
      margin: 0 auto;
      .wx-scroll-view-y {
        width: 710 / @rem;
        // width: 100%;
        max-height: 335 / @rem;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 230 / @rem;
          padding: 56 / @rem 0 20 / @rem;
          background-size: 56 / @rem;
          background-repeat: no-repeat;
          background-position: center 0;
          background-image: url("~@/assets/images/choice_project_icon1.png");
          &:first-child {
            background-image: url("~@/assets/images/choice_project_icon2.png");
          }
          p {
            padding: 0 20 / @rem;
            line-height: 54 / @rem;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
