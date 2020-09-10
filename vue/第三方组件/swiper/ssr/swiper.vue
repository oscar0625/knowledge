<template>
  <div class="mySwiper">
    <div
      v-swiper:mySwiper="swiperOptions"
    >
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in carouselData"
          :key="index"
          class="swiper-slide swiper-no-swiping"
        >
          <nuxt-link :to="item.courseId">
            <el-image :src="item.imgUrl" :alt="item.name"></el-image>
          </nuxt-link>
        </div>
      </div>
    </div>
    <ul class="pagination" :style="{ right: pRight + 'px' }">
      <li
        v-for="(item, index) in carouselData"
        :key="index"
        :class="{
          'fn-text-ellipsis': true,
          active: swiperIndex === index
        }"
        @click="handTabIndex(index)"
      >
        {{ item.courseName }}
      </li>
    </ul>
  </div>
</template>

<script>
/**
 *  https://github.com/surmon-china/surmon-china.github.io/tree/source/projects/vue-awesome-swiper/nuxt
 **/
export default {
  name: "MySwiper",
  props: {
    // option相关
    autoplay: {
      type: [Boolean, Object],
      default() {
        return {
          delay: 5000
        };
      }
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
      carouselData: [],
      pRight: -10000,
      // 激活的index
      swiperIndex: 0,
      swiperOptions: {
        autoplay,
        loop,
        effect,
        onlyExternal: true, //完全禁止拖动
        on: {
          slideChangeTransitionStart: () => {
            this.onSwiperSlideChangeTransitionStart();
          }
        }
      }
    };
  },
  created() {
    this.getList();
    // 在客户端渲染才能操作dom
    if (process.client) {
      this.createPRight();
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.onresize = () => {
        this.createPRight();
      };
    }
  },
  methods: {
    getList() {
      this.$api("homepage", "getBanner", {}).then((res) => {
        const { bannerInfoList } = res;
        this.carouselData = bannerInfoList || [];
      });
    },
    // 轮播切换触发
    onSwiperSlideChangeTransitionStart() {
      this.swiperIndex = this.mySwiper.activeIndex;
    },
    // 点击切换轮播
    handTabIndex(index) {
      const { loop } = this.$props;
      if (loop) {
        this.mySwiper.slideToLoop(index);
      } else {
        this.mySwiper.slideTo(index);
      }
    },
    // 根据当前视口 计算pRight值
    createPRight() {
      const right = (document.documentElement.clientWidth - 1200) / 2;
      this.pRight = right < 0 ? 0 : right;
    }
  }
};
</script>

<style lang="less" scoped>
.mySwiper {
  position: relative;
  height: 100%;
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
  .pagination {
    position: absolute;
    top: 50px;
    width: 270px;
    height: 220px;
    padding: 20px 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;

    li {
      position: relative;
      padding: 0 10px 0 30px;
      line-height: 44px;
      text-align: left;
      font-size: 16px;
      color: #cccccc;
      cursor: pointer;
      &.active {
        color: #0379fe;
        &::before {
          content: "";
          position: absolute;
          left: 14px;
          top: 15px;
          width: 0;
          height: 0;
          border-right: 8px solid @mainColor;
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
        }
      }
    }
  }
}
</style>
