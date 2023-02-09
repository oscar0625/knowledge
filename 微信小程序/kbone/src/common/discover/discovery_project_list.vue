<template>
  <div class="discovery-project-list">
    <ul>
      <li v-for="item in dataList" :key="item.id">
        <a :href="`/projectInfo?id=${item.id}`" :target="isBlank">
          <div class="title fn-text-ellipsis">
            {{ item.name }}
          </div>
          <div class="detail">
            <span
              :class="{
                ing: item.itemDateState === 2
              }"
              >{{ itemDateStateName[item.itemDateState] }}</span
            >
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DiscoveryProjectList",
  props: {
    dataList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      itemDateStateName: {
        1: "未开始申报",
        2: "正在申报中",
        3: "申报结束"
      }
    };
  }
};
</script>

<style lang="less">
.discovery-project-list {
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
      line-height: 50 / @rem;
      font-size: 34 / @rem;
      font-weight: 800;
      color: #000000;
    }
    .detail {
      border-top: 1 / @rem dashed #f2f2f2;
      margin-top: 22 / @rem;
      line-height: 85 / @rem;
      span {
        font-size: 28 / @rem;
        color: #999999;
        &.ing {
          color: #fa9b15;
        }
      }
    }
  }
}
</style>
