<template>
  <div class="project-list">
    <ul>
      <li
        v-for="item in dataList"
        :key="item.id"
        :class="{
          'failure-data': item.state === 3
        }"
      >
        <a
          :href="`/userDockingInfo/${dataType}?id=${item.id}`"
          :target="isBlank"
        >
          <div
            :class="{
              title: true,
              start: item.projectStatus === 0
            }"
          >
            <span>{{ item.name | lengthFilter(10) }}</span>
            <div
              :class="{
                status: true,
                success: item.projectStatus === 1,
                error: item.projectStatus === 2
              }"
            >
              {{ item.projectStatusName }}
            </div>
          </div>
          <div class="detail">
            <span>发布时间:{{ item.createTime | dateFilterSpace }}</span>
            <span>更新时间:{{ item.lastUpdateTime | dateFilterSpace }}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  props: {
    dataList: {
      type: Array,
      require: true
    },
    dataType: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="less">
.project-list {
  overflow: hidden;
  ul {
    padding-bottom: 30 / @rem;
    li {
      margin-top: 30 / @rem;
      border-radius: 20 / @rem;
      background: #ffffff;
      > a {
        display: block;
        padding: 0 30 / @rem 30 / @rem;
      }

      .title {
        display: flex;
        align-items: center;
        padding: 25 / @rem 0 25 / @rem 48 / @rem;
        line-height: 44 / @rem;
        font-size: 34 / @rem;
        font-weight: 800;
        color: #000000;
        background-image: url("~@/assets/images/docking_icon_end.png");
        background-size: 34 / @rem auto;
        background-repeat: no-repeat;
        background-position: 0 center;
        &.start {
          background-image: url("~@/assets/images/docking_icon_start.png");
        }
        .status {
          flex: none;
          margin-left: 15 / @rem;
          padding: 0 15 / @rem;
          line-height: 38 / @rem;
          font-size: 24 / @rem;
          color: @mainColor;
          border-radius: 6 / @rem;
          background-color: rgba(12, 64, 212, 0.1);
          &.success {
            color: #2dcb95;
            background-color: rgba(45, 203, 149, 0.1);
          }
          &.error {
            color: #d91717;
            background-color: rgba(217, 23, 23, 0.1);
          }
        }
      }

      .detail {
        display: flex;
        justify-content: space-between;
        margin-top: 48 / @rem;
        line-height: 1;
        font-size: 26 / @rem;
        color: #666666;
      }
    }
  }
}
</style>
