<template>
  <div class="dem-list">
    <ul>
      <li
        v-for="item in dataList"
        :key="item.id"
        :class="{
          'failure-data': item.state === 3
        }"
      >
        <a :href="`/demandInfo?id=${item.id}`" :target="isBlank">
          <div class="title fn-text-ellipsis card-link-icon">
            {{ item.name }}
          </div>
          <div class="detail">
            <div
              class="field"
              :style="`
              background-image: url(${createFieldImg(item.fieldName).a});
            `"
            >
              {{ item.fieldName }}
            </div>
            <div class="validity">有限期剩{{ item.date }}天</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { createFieldImg } from "@/utils/public";
export default {
  name: "DemList",
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
.dem-list {
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
      span {
        display: inline-block;
        width: 120 / @rem;
        margin-right: 30 / @rem;
        border-radius: 4 / @rem;
        vertical-align: 3 / @rem;
        line-height: 33 / @rem;
        text-align: center;
        font-weight: normal;
        font-size: 24 / @rem;
        color: #ffffff;
        background: linear-gradient(90deg, #0c40d4, #245bf5);
        opacity: 0.9;
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
