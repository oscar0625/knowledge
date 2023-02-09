<template>
  <div class="my-nodata">
    <template v-if="type === 'issue'">
      <div class="no-issue-data">
        <div class="icon"></div>
        <p class="text">
          <slot>您暂时还没发布数据！</slot>
        </p>
      </div>
    </template>
    <template v-else-if="type === 'docking'">
      <div class="no-docking-data">
        <div class="icon"></div>
        <p class="text">
          <slot>您暂时还没对接数据！</slot>
        </p>
      </div>
    </template>
    <template v-else-if="type === 'collect'">
      <div class="no-collect-data">
        <div class="icon"></div>
        <p class="text">
          <slot>您暂时还没收藏数据！</slot>
        </p>
      </div>
    </template>
    <template v-else>
      <div class="no-data">
        <div class="icon"></div>
        <p class="text">
          <slot>未匹配到数据！</slot>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "NoData",
  props: {
    type: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less">
.my-nodata {
  .icon {
    width: 270 / @rem;
    height: 270 / @rem;
    margin: 0 auto;
    background-size: cover;
    background-position: center center;
  }
  .text {
    line-height: 52 / @rem;
    text-align: center;
    color: #666666;
  }
  .no-data {
    .icon {
      background-image: url("~@/assets/images/no_data.png");
    }
  }
  .no-issue-data {
    .icon {
      background-image: url("~@/assets/images/no_issue_data.png");
    }
  }
  .no-docking-data {
    .icon {
      background-image: url("~@/assets/images/no_docking_data.png");
    }
  }
  .no-collect-data {
    .icon {
      background-image: url("~@/assets/images/no_collect_data.png");
    }
  }
}
</style>
