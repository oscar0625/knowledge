<template>
  <div class="expert-list">
    <ul>
      <li v-for="item in dataList" :key="item.id">
        <a :href="`/expertInfo?id=${item.id}`" :target="isBlank">
          <div
            class="photo"
            :style="`background-image: url('${item.imgUrl}');`"
          ></div>
          <div class="other">
            <div class="title fn-text-ellipsis card-link-icon">
              {{ item.name }}
            </div>
            <div class="detail">
              {{ item.description | lengthFilter(30) }}
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ExpertList",
  props: {
    dataList: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="less">
.expert-list {
  overflow: hidden;
  li {
    margin-bottom: 30 / @rem;
    border-radius: 20 / @rem;
    background: #ffffff;

    > a {
      display: flex;
      padding: 20 / @rem;
    }

    .photo {
      flex: 0 0 auto;
      width: 168 / @rem;
      height: 168 / @rem;
      margin-right: 30 / @rem;
      border-radius: 14 / @rem;
      background-size: cover;
      background-position: center;
    }
    .other {
      flex: 1;
      .title {
        line-height: 64 / @rem;
        font-size: 34 / @rem;
        font-weight: 800;
      }

      .detail {
        overflow: hidden;
        max-height: 84 / @rem;
        padding-top: 7 / @rem;
        line-height: 42 / @rem;
        font-size: 28 / @rem;
        color: #666666;
      }
    }
  }
}
</style>
