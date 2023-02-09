<template>
  <div class="store-dem-list">
    <ul>
      <li
        v-for="item in dataList"
        :key="item.id"
        :class="{
          'failure-data': item.status === 2
        }"
      >
        <a :href="`/demandInfo?id=${item.reqId}`" :target="isBlank">
          <div class="title">
            <h4 class="fn-text-ellipsis">
              {{ item.name }}
            </h4>
          </div>
          <div class="detail">
            <div
              class="field"
              :style="`
              background-image: url(${
                createFieldImg(item.imSpecialFieldIdName).a
              });
            `"
            >
              {{ item.imSpecialFieldIdName }}
            </div>
            <div class="validity">有限期剩{{ item.validate }}天</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { createFieldImg } from "@/utils/public";
export default {
  name: "StoreDemList",
  props: {
    dataList: {
      type: Array,
      required: true
    }
  },
  methods: {
    createFieldImg
  }
};
</script>

<style lang="less">
.store-dem-list {
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
      .field,
      .validity {
        padding-left: 40 / @rem;
        line-height: 40 / @rem;
        font-size: 28 / @rem;
        font-weight: 500;
        color: #666666;
        background-repeat: no-repeat;
        background-position: 0 center;
      }
      .field {
        background-size: auto 34 / @rem;
      }
      .validity {
        background-size: auto 30 / @rem;
        background-image: url("~@/assets/images/validity_icon.png");
      }
    }
  }
}
</style>
