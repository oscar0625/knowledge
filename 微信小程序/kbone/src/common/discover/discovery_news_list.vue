<template>
  <div class="discovery-news-list">
    <ul>
      <li
        :class="simplify ? 'simplify' : 'complex'"
        v-for="item in dataList"
        :key="item.id"
      >
        <a
          :href="`/newsInfo?id=${item.id}${
            currentType === 'notice' || item.industryType === '3'
              ? '&type=notice'
              : ''
          }`"
          :target="isBlank"
        >
          <div
            v-if="!simplify"
            class="picture"
            :style="`background-image: url('${item.imgUrl}');`"
          ></div>
          <div class="wrapper">
            <div class="title fn-text-ellipsis">
              {{ item.title }}
            </div>
            <div class="detail">
              <span
                >时间：{{
                  (item.publishTime || item.publishDate) | dateFilterSpace
                }}</span
              >
              <span
                >来源：{{
                  (item.newsSource || item.source) | lengthFilter(10)
                }}</span
              >
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DiscoveryNewsList",
  props: {
    dataList: {
      type: Array,
      required: true
    },
    simplify: {
      type: Boolean,
      default: false
    },
    currentType: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less">
.discovery-news-list {
  overflow: hidden;
  li {
    background: #ffffff;
    > a {
      display: block;
    }
    .title {
      line-height: 50 / @rem;
      font-size: 34 / @rem;
      font-weight: 800;
      color: #000000;
    }
  }

  .simplify {
    &:first-child {
      border-radius: 20 / @rem 20 / @rem 0 0;
    }
    &:last-child {
      margin-bottom: 30 / @rem;
      border-radius: 0 0 20 / @rem 20 / @rem;
    }
    .title {
      padding-top: 32 / @rem;
    }

    .detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70 / @rem;
      padding-bottom: 20 / @rem;
      border-bottom: 1 / @rem dashed #f2f2f2;
      span {
        line-height: 30 / @rem;
        color: #666666;
      }
    }
  }
  .complex {
    margin-bottom: 30 / @rem;
    border-radius: 0 0 30 / @rem 30 / @rem;

    .picture {
      position: relative;
      height: 385 / @rem;
      border-radius: 30 / @rem 30 / @rem 0 0;
      background-size: cover;
      background-position: center;
    }

    .title {
      padding-top: 22 / @rem;
    }

    .detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 82 / @rem;
      span {
        line-height: 30 / @rem;
      }
    }
  }
}
</style>
