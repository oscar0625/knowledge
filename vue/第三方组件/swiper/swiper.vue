<template>
  <swiper ref="mySwiper" :options="swiperOption">
    <swiper-slide v-for="(item, index) in carouselData" :key="index">
      <a :href="item.linkURL">
        <img :src="item.imgURL" :alt="item.title" />
      </a>
    </swiper-slide>
    <!-- 分页 -->
    <div slot="pagination" class="swiper-pagination"></div>
    <!-- 前进后退 -->
    <div slot="button-prev" class="swiper-button-prev"></div>
    <div slot="button-next" class="swiper-button-next"></div>
  </swiper>
</template>

<script>
/*
 * vue-awesome-swiper
 * see https://www.swiper.com.cn/api/
 *     https://github.com/surmon-china/vue-awesome-swiper
 *     https://github.surmon.me/vue-awesome-swiper/
 * 兼容ie11
 *     "vue-awesome-swiper": "^3.1.3",
 *     "swiper": "^4.5.1",
 */

export default {
  name: "MySwiper",
  props: {
    // option相关
    autoplay: {
      type: [Boolean, Object],
      default: true
    },
    loop: {
      type: Boolean,
      default: false
    },
    effect: {
      type: String,
      default: "fade"
    }
  },
  data() {
    const { autoplay, loop, effect } = this.$props;
    return {
      swiperOption: {
        autoplay,
        loop,
        effect,
        allowTouchMove: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        on: {
          slideChangeTransitionStart: () => {
            console.log(this.swiper.realIndex);
          },
          tap: () => {
            console.log(this.swiper.clickedIndex);
          }
        }
      },
      carouselData: [
        {
          title: "第一个",
          imgURL: "http://www.zgcjm.org/web/images/default_ptjs.jpg",
          linkURL: "http://www.zgcjm.org/"
        },
        {
          title: "第二个",
          imgURL: "http://www.zgcjm.org/web/images/issueCompanyBanner.jpg",
          linkURL: "http://www.zgcjm.org/"
        }
      ]
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>

<style lang="less">
.swiper-container {
  width: 100%;
  height: 100%;
  .swiper-slide {
    > a,
    .el-image {
      display: block;
      height: 100%;
    }
  }
}
</style>
