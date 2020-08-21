<template>
  <div>
    <template v-if="type == 'search'">
      <div
        class="no-search-data"
        :style="{
          height: height + 'px',
          'background-color': backgroundColor
        }"
      ></div>
    </template>
    <template v-else>
      <div
        class="no-data"
        :style="{
          height: height + 'px',
          'background-color': backgroundColor
        }"
      ></div>
    </template>
  </div>
</template>

<script>
export default {
  name: "NoData",
  props: {
    height: {
      type: String,
      required: true
    },
    backgroundColor: {
      type: String,
      default: "transparent"
    },
    type: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.no-data {
  background-image: url("~assets/images/no_data.png");
  background-position: center center;
  background-repeat: no-repeat;
}
.no-search-data {
  background-image: url("~assets/images/no_search_data.png");
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
