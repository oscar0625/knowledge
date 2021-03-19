<template>
  <baidu-map
    class="bm-view"
    :center="position"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    @ready="onReady"
  >
    <!-- 平移缩放控件 -->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <!-- 地图类型控件 -->
    <bm-map-type
      :map-types="['BMAP_NORMAL_MAP', 'BMAP_SATELLITE_MAP', 'BMAP_HYBRID_MAP']"
      anchor="BMAP_ANCHOR_TOP_LEFT"
    ></bm-map-type>
    <!-- 创建标注 -->
    <bm-marker
      :position="position"
      animation="BMAP_ANIMATION_BOUNCE"
      @click="infoWindowOpen"
    >
      <!-- 信息窗体 -->
      <bm-info-window
        :show="showWindow"
        @close="infoWindowClose"
        @open="infoWindowOpen"
      >
        <slot></slot>
      </bm-info-window>
    </bm-marker>
  </baidu-map>
</template>

<script>
// https://dafrok.github.io/vue-baidu-map/#/
export default {
  props: {
    position: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      //   position: { lng: 116.288676, lat: 39.951898 },
      zoom: 17,
      showWindow: true
    };
  },
  methods: {
    onReady({ BMap, map }) {
      //   console.log(BMap, map);
      //   this.position.lng = 116.288676;
      //   this.position.lat = 39.951898;
    },
    infoWindowClose(e) {
      this.showWindow = false;
    },
    infoWindowOpen(e) {
      this.showWindow = true;
    }
  }
};
</script>

<style>
.bm-view {
  width: 100%;
  height: 100%;
}
</style>
