<template>
  <div class="store-dem-list">
    <ul>
      <li
        v-for="item in dataList"
        :key="item.id"
        :class="{
          'failure-data': item.state === '3'
        }"
      >
        <a
          :href="`/${
            item.state === '2' ? 'userIssueDem/modify' : 'demandInfo'
          }?id=${item.id}`"
          :target="isBlank"
        >
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
                createFieldImg(item.specialFieldIdName).a
              });
            `"
            >
              {{ item.specialFieldIdName }}
            </div>
            <div
              :class="{
                audit: true,
                not: item.state === '0',
                success: item.state === '1',
                error: item.state === '2'
              }"
            >
              {{ item.stateName }}
            </div>
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
      .audit {
        padding-left: 40 / @rem;
        line-height: 40 / @rem;
        font-size: 28 / @rem;
        font-weight: 500;
        color: #666666;
        background-size: auto 34 / @rem;
        background-repeat: no-repeat;
        background-position: 0 center;
      }
      .audit {
        padding-left: 0;
        &.not {
          color: @mainColor;
        }
        &.success {
          color: #38b466;
        }
        &.error {
          color: #f23b43;
        }
      }
    }
  }
}
</style>
