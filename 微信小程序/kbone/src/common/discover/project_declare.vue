<template>
  <div class="project-declare">
    <div class="project-declare__content">
      <wx-button class="share-btn btn" open-type="share">分享</wx-button>
      <div v-if="showApply" class="apply" @click="handleApply">立即申报</div>
    </div>
    <project-apply :visible.sync="showProjectApply" :dataId="dataId" />
  </div>
</template>

<script>
import ProjectApply from "@/common/discover/project_apply";
export default {
  name: "ProjectDeclare",
  components: {
    ProjectApply
  },
  props: {
    showApply: {
      type: Boolean,
      required: true
    },
    dataId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showProjectApply: false
    };
  },
  created() {},
  methods: {
    // 点击报名
    handleApply(id) {
      this.showProjectApply = true;
    }
  }
};
</script>

<style lang="less">
.project-declare {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .project-declare__content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100 / @rem;
    box-shadow: 0 / @rem 0 / @rem 6 / @rem 0 / @rem rgba(0, 0, 0, 0.06);
    background-color: #ffffff;
    .btn {
      width: 44 / @rem;
      padding-top: 52 / @rem;
      line-height: 1;
      font-size: 20 / @rem;
      background-size: 44 / @rem;
      background-repeat: no-repeat;

      &.share-btn {
        padding-left: 0;
        padding-right: 0;
        margin: 0;
        border-radius: 0;
        color: #141414;
        background-color: transparent;
        background-image: url("~@/assets/images/share_icon_a.png");
        &::after {
          display: none;
        }
      }
    }
    .apply {
      width: 366 / @rem;
      height: 80 / @rem;
      border-radius: 40 / @rem;
      line-height: 80 / @rem;
      text-align: center;
      font-size: 28 / @rem;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(90deg, #0c40d4, #245bf5);
    }
  }
}
</style>
