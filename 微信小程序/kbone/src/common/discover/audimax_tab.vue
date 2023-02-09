<template>
  <div class="audimax-tab">
    <a
      :class="{
        active: item.name === type
      }"
      v-for="item in tabs"
      :key="item.name"
      :href="item.url"
      >{{ item.name }}</a
    >
  </div>
</template>

<script>
export default {
  name: "AudimaxTab",
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tabs: [
        {
          name: "读政策",
          url: "/policyList"
        },
        {
          name: "报项目",
          url: "/projectList"
        },
        {
          name: "阅资讯",
          url: "/newsList"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.audimax-tab {
  display: flex;
  justify-content: space-evenly;
  > a {
    position: relative;
    padding: 138 / @rem 0 40 / @rem;
    line-height: 1;
    background-size: auto 80 / @rem;
    background-repeat: no-repeat;
    background-position: center 40 / @rem;
    &:nth-child(1) {
      background-image: url("~@/assets/images/audimax_tab_icon1.png");
    }
    &:nth-child(2) {
      background-image: url("~@/assets/images/audimax_tab_icon2.png");
    }
    &:nth-child(3) {
      background-image: url("~@/assets/images/audimax_tab_icon3.png");
    }
    &.active {
      pointer-events: none;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 0;
        height: 0;
        border-bottom: 23 / @rem solid rgba(217, 23, 23, 0.05);
        border-left: 25 / @rem solid transparent;
        border-right: 25 / @rem solid transparent;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
