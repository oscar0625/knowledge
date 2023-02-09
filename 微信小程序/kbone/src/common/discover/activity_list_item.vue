<template>
  <div class="activity-list__item">
    <a :href="`/activityInfo?id=${info.actId || info.id}`" :target="isBlank">
      <div class="picture" :style="`background-image: url('${info.imgUrl}');`">
        <div class="act-type">{{ info.actTypeName }}</div>
        <div class="online">
          {{ info.actFormName }}
        </div>
        <div class="bottom">
          <div class="view-count">
            {{ info.viewCount > 9999 ? "9999+" : info.viewCount }}次
          </div>
        </div>
      </div>
      <div class="detail wrapper">
        <div class="title">
          {{ info.title | lengthFilter(30) }}
        </div>
        <div class="time">
          <span>{{ info.startTime }}</span>
          <i>-</i>
          <span>{{ info.endTime }}</span>
        </div>
        <template v-if="!hideApply">
          <template v-if="showApply">
            <wx-button
              class="btn"
              type="primary"
              @click.stop="handleApply(info.actId || info.id)"
              >立即报名</wx-button
            >
          </template>
          <template v-else>
            <wx-button class="btn btn-close" type="primary" :disabled="true"
              >已截止</wx-button
            >
          </template>
        </template>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "ActivityListItem",
  props: {
    info: {
      type: Object,
      required: true
    },
    showApply: {
      type: Boolean,
      required: true
    },
    hideApply: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    handleApply(id) {
      this.$emit("apply", id);
    }
  }
};
</script>

<style lang="less">
.activity-list__item {
  > a {
    display: block;
  }
  .picture {
    position: relative;
    height: 385 / @rem;
    border-radius: 30 / @rem 30 / @rem 0 0;
    background-size: cover;
    background-position: center;
    .act-type {
      position: absolute;
      top: 30 / @rem;
      left: 30 / @rem;
      padding: 0 10 / @rem;
      border-radius: 4 / @rem;
      line-height: 33 / @rem;
      font-size: 24 / @rem;
      color: #ffffff;
      background: linear-gradient(90deg, #fa8615, #fa9c15);
    }
    .online {
      position: absolute;
      top: 30 / @rem;
      right: 30 / @rem;
      padding: 0 15 / @rem;
      border-radius: 6 / @rem;
      line-height: 33 / @rem;
      font-size: 24 / @rem;
      color: #ffffff;
      background-color: rgba(0, 0, 0, 0.35);
    }
    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      width: 100%;
      padding-left: 30 / @rem;
      line-height: 64 / @rem;
      color: #ffffff;
      background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.25),
        rgba(0, 0, 0, 0)
      );

      .view-count {
        padding-left: 40 / @rem;
        background-size: 24 / @rem;
        background-position: 0 center;
        background-repeat: no-repeat;
        background-image: url("~@/assets/images/pageview_icon_white.png");
      }
    }
  }
  .detail {
    padding-bottom: 35 / @rem;
    background-color: #fff;
    border-radius: 0 0 30 / @rem 30 / @rem;
    .title {
      overflow: hidden;
      padding-top: 22 / @rem;
      height: 100 / @rem;
      line-height: 50 / @rem;
      font-size: 34 / @rem;
      font-weight: 800;
      color: #000000;
    }
    .time {
      overflow: hidden;
      height: 60 / @rem;
      line-height: 60 / @rem;
      padding-left: 40 / @rem;
      background-size: auto 24 / @rem;
      background-repeat: no-repeat;
      background-position: 0 center;
      background-image: url("~@/assets/images/validity_icon_black.png");
      i {
        padding: 0 10 / @rem;
      }
    }
    .btn {
      width: 330 / @rem;
      height: 66 / @rem;
      margin-top: 15 / @rem;
      border-radius: 33 / @rem;
      line-height: 66 / @rem;
      font-size: 28 / @rem;
      font-weight: bold;
      background-color: transparent;
      background-image: linear-gradient(90deg, #0c40d4, #245bf5);
      box-shadow: 2 / @rem 5 / @rem 15 / @rem 0 rgba(13, 65, 213, 0.35);
      &::after {
        display: none;
      }
      &.btn-close {
        background-color: #e5e5e5;
        background-image: none;
        box-shadow: 2 / @rem 5 / @rem 15 / @rem 0 rgba(176, 176, 176, 0.35);
      }
    }
  }
}
</style>
