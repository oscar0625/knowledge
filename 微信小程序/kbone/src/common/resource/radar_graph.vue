<template>
  <div class="radar-graph" ref="radarGraph">
    <canvas ref="canvas" type="2d"> </canvas>
  </div>
</template>

<script>
import echarts from "echarts";
import { getChart } from "@/utils/chart";
const systemInfo = process.env.isMiniprogram ? wx.getSystemInfoSync() : {};
/**
 * @private
 * @description 处理颜色渐变
 * @param {array} color 渐变的颜色
 * @param {string} type 渐变的方式 bottom||right 默认自上而下
 * @return {object} echarts所使用的渐变颜色对象
 * @example
 * _linearGradient(['#8e48ee', '#05a7fb'], 'bottom');
 */
function _linearGradient(color, type) {
  const arr = color.slice(0, 2).map(function (item, i) {
    return {
      offset: i,
      color: item
    };
  });
  return type === "right"
    ? new echarts.graphic.LinearGradient(0, 0, 1, 0, arr)
    : new echarts.graphic.LinearGradient(0, 0, 0, 1, arr);
}

export default {
  name: "RadarGraph",
  props: {
    dataset: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      fontSize: this.pxtorem(24),
      fontColor: "#141414",
      lineColor: "rgba(12, 64, 212, 0.2)",
      areaColor: _linearGradient(
        ["rgba(12, 64, 212, 1)", "rgba(36, 91, 245, 1)"],
        "right"
      )
      // dataset: [
      //   {
      //     name: "产业化速度",
      //     value: 8.0,
      //     max: 20.0
      //   },
      //   {
      //     name: "发展速度",
      //     value: 14.0,
      //     max: 20.0
      //   },
      //   {
      //     name: "新兴程度",
      //     value: 10.0,
      //     max: 20.0
      //   },
      //   {
      //     name: "产业化程度",
      //     value: 10.0,
      //     max: 20.0
      //   },
      //   {
      //     name: "技术复杂度",
      //     value: 10.0,
      //     max: 20.0
      //   }
      // ]
    };
  },
  mounted() {
    // 等到整个视图都渲染完毕再执行
    this.$nextTick(() => {
      this.$refs.radarGraph.$$getBoundingClientRect().then((res) => {
        const { width, height } = res;
        getChart(this.$refs.canvas, echarts, {
          width,
          height,
          devicePixelRatio: systemInfo.devicePixelRatio || 1
        }).then(this.initChart);
      });
    });
  },
  methods: {
    initChart(chart) {
      chart.setOption({
        backgroundColor: "transparent",
        color: [this.areaColor],
        textStyle: {
          fontSize: this.fontSize,
          color: this.fontColor
        },
        tooltip: {
          show: false
        },
        radar: {
          shape: "circle",
          radius: "70%",
          startAngle: 90,
          nameGap: 1.5 * this.fontSize,
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [0.4 * this.fontSize, 0.6 * this.fontSize],
            symbolOffset: [0, this.fontSize],
            lineStyle: {
              color: this.lineColor,
              type: "dashed"
            }
          },
          splitLine: {
            lineStyle: {
              color: this.lineColor
            }
          },
          splitArea: {
            show: false
          },
          indicator: this.dataset
        },
        series: [
          {
            name: "评分",
            type: "radar",
            // symbol: "none",
            lineStyle: {
              width: 1,
              type: "dotted"
            },
            areaStyle: {
              opacity: 0.7
            },
            data: [
              {
                name: "评分",
                value: this.dataset.map(function (item) {
                  return item.value;
                })
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style lang="less">
.radar-graph {
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
    cursor: default !important;
  }
}
</style>
