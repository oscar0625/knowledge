<template>
  <div class="discovery-policy-list">
    <ul>
      <li v-for="item in dataList" :key="item.id">
        <a
          :href="`/policyInfo/${
            currentType ? currentType : item.type === 1 ? 'notice' : 'explain'
          }?id=${item.id}`"
          :target="isBlank"
        >
          <div class="title fn-text-ellipsis">
            {{ item.name }}
          </div>
          <div class="detail">
            <span>时间：{{ item.publishDate | dateFilterSpace }}</span>
            <span>来源：{{ item.source | lengthFilter(10) }}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DiscoveryPolicyList",
  props: {
    dataList: {
      type: Array,
      required: true
    },
    currentType: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less">
.discovery-policy-list {
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 85 / @rem;
      border-top: 1 / @rem dashed #f2f2f2;
      margin-top: 22 / @rem;
      span {
        line-height: 30 / @rem;
        font-size: 28 / @rem;
        font-weight: 400;
        color: #999999;
        // color: #fa9b15;
      }
    }
  }
}
</style>
