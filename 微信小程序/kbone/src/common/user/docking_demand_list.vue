<template>
  <div class="docking-dem-list">
    <ul>
      <li
        v-for="item in dataList"
        :key="item.id"
        :class="{
          'failure-data': item.state === 3
        }"
      >
        <a :href="`/demandInfo?id=${item.relationId}`" :target="isBlank">
          <div class="title">
            <h4 class="fn-text-ellipsis">
              {{ item.reqName }}
            </h4>
            <!-- <div class="edit">
              <a
                v-if="noStatus"
                href="javascript:;"
                class="el-icon-close"
                @click="handleDelete(item.relationId)"
              ></a>
            </div> -->
          </div>
          <div class="detail">
            <div class="match">
              匹配度：<span>{{ item.matchingDegree }} </span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DockingDemList",
  props: {
    dataList: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="less">
.docking-dem-list {
  overflow: hidden;
  li {
    margin-bottom: 30 / @rem;
    border-radius: 20 / @rem;
    background: #ffffff;

    > a {
      display: block;
      padding: 22 / @rem 30 / @rem 0;
    }

    .title {
      h4 {
        line-height: 50 / @rem;
        font-size: 34 / @rem;
        color: #000000;
        font-weight: 800;
      }
    }
    .detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 85 / @rem;
      border-top: 1 / @rem dashed #f2f2f2;
      margin-top: 22 / @rem;
      .match {
        line-height: 30 / @rem;
        font-size: 28 / @rem;
        font-weight: 500;
        color: #666666;
      }
    }
  }
}
</style>
