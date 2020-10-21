<template>
  <div class="cooperator-swiper">
    <!-- 分页 -->
    <div class="pagination">
      <span
        v-for="(item, index) in carouselData"
        :key="item.name"
        :class="{ active: index === swiperIndex }"
        @click="handTabIndex(index)"
        >{{ item.name }}</span
      >
    </div>
    <div v-swiper:cooperatorSwiper="swiperOptions">
      <div class="swiper-wrapper">
        <div
          v-for="(item, itemIndex) in carouselData"
          :key="item.name"
          class="swiper-slide"
        >
          <ul class="content fn-clear">
            <li
              v-for="(url, urlIndex) in item.list"
              :key="url"
              :class="{
                'fn-left': true,
                animate__animated: true,
                animate__pulse: hoverIndex === itemIndex + '-' + urlIndex
              }"
              @mouseenter="hoverIndex = itemIndex + '-' + urlIndex"
            >
              <img v-lazy="url" />
            </li>
          </ul>
        </div>
      </div>
      <!-- 前进后退 -->
      <div slot="button-prev" class="swiper-button-prev"></div>
      <div slot="button-next" class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CooperatorSwiper",
  props: {
    // option相关
    autoplay: {
      type: [Boolean, Object],
      default() {
        return {
          delay: 3000
        };
      }
    },
    loop: {
      type: Boolean,
      default: false
    },
    effect: {
      type: String,
      default: "side"
    }
  },
  data() {
    const empty = new Array(15).join(",").split(",");
    const { autoplay, loop, effect } = this.$props;
    return {
      carouselData: [
        {
          name: "入孵企业",
          list: empty.map((item, index) => {
            return require(`@/assets/images/starenterprises${index + 1}.jpg`);
          })
        },
        {
          name: "合作企业",
          list: empty.map((item, index) => {
            return require(`@/assets/images/cooperationscope${index + 1}.jpg`);
          })
        },
        {
          name: "服务商",
          list: empty.map((item, index) => {
            return require(`@/assets/images/facilitator${index + 1}.jpg`);
          })
        }
      ],
      // hover的index 字符串形式
      hoverIndex: "",
      // 激活的index
      swiperIndex: 0,
      swiperOptions: {
        autoplay,
        loop,
        effect,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChangeTransitionStart: () => {
            this.onSwiperSlideChangeTransitionStart();
          }
        }
      }
    };
  },
  methods: {
    // 轮播切换触发
    onSwiperSlideChangeTransitionStart() {
      const { realIndex = 0 } = this.cooperatorSwiper || {};
      this.swiperIndex = realIndex;
    },
    // 点击切换轮播
    handTabIndex(index) {
      this.cooperatorSwiper.slideTo(index);
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-button-prev,
.swiper-button-next {
  opacity: 0;
}
.cooperator-swiper {
  .pagination {
    display: flex;
    justify-content: space-between;
    padding: 0 255px;
    border-bottom: 1px solid #d3d3d6;
    margin-bottom: 40px;
    span {
      width: 90px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      &.active {
        background: #ef3e46;
      }
    }
  }
  .swiper-container {
    width: 100%;
    .swiper-slide {
      .content {
        width: 1020px;
        margin: 0 auto;
        li {
          width: 180px;
          height: 65px;
          margin: 0 30px 25px 0;
          &:nth-child(5n) {
            margin-right: 0;
          }
          .img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
      &.swiper-button-disabled {
        opacity: 0.35;
      }
    }
    //修改剪头颜色为 6b6f7a
    .swiper-button-prev,
    .swiper-container-rtl .swiper-button-next {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%236b6f7a'%2F%3E%3C%2Fsvg%3E");
      left: 10px;
      right: auto;
    }
    .swiper-button-next,
    .swiper-container-rtl .swiper-button-prev {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%236b6f7a'%2F%3E%3C%2Fsvg%3E");
      right: 10px;
      left: auto;
    }
  }
}
</style>
