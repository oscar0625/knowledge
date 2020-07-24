<template>
  <div class="third-page">
    <div class="section-title">
      <h1>产业数据</h1>
      <p>SERVICE CAPABILITY</p>
    </div>
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china";
/**
 * npm install echarts --save
 */
export default {
  data() {
    return {
      myChart: null,
      option: null
    };
  },
  mounted() {
    this.createOption();
    this.draw({ target: this.$refs.map, option: this.option });
  },
  methods: {
    // 创建option
    createOption() {
      const colors = ["#ff0018", "rgba(0,252,255,0.3)", "#0bd6d8"];
      // 基地
      const bases = [
        {
          name: "西三旗",
          value: [116.329255, 40.053096]
        },
        {
          name: "人工智能",
          value: [116.346527, 39.976757]
        },
        {
          name: "青龙桥",
          value: [116.267514, 40.008699]
        },
        {
          name: "石家庄",
          value: [114.444372, 38.07615]
        },
        {
          name: "唐山",
          value: [118.089931, 39.558409]
        },
        {
          name: "三河",
          value: [116.832967, 39.959964]
        },
        {
          name: "重庆",
          value: [106.527103, 29.523732]
        },
        {
          name: "成都",
          value: [104.066143, 30.573095]
        },
        {
          name: "佛山",
          value: [113.122717, 23.028762]
        }
      ];
      // 大区
      const regions = [
        {
          name: "京津冀协同<br>发展示范区",
          value: [114.1021, 39.988909, 200]
        },
        {
          name: "成渝双城<br>经济圈",
          value: [105.263599, 29.939707, 150]
        },
        {
          name: "粤港澳<br>大湾区",
          value: [113.122717, 23.028762, 100]
        }
      ];
      // 连线的起点和终点
      const points = [
        {
          start: "西三旗",
          end: "重庆"
        },
        {
          start: "重庆",
          end: "青龙桥"
        },
        {
          start: "青龙桥",
          end: "成都"
        },
        {
          start: "成都",
          end: "人工智能"
        },
        {
          start: "人工智能",
          end: "佛山"
        },
        {
          start: "佛山",
          end: "石家庄"
        },
        {
          start: "石家庄",
          end: "三河"
        },
        {
          start: "三河",
          end: "唐山"
        },
        {
          start: "唐山",
          end: "西三旗"
        }
      ];
      // 处理生成连线数据
      const baseMap = new Map();
      bases.map((item) => {
        const { name, value } = item;
        baseMap.set(name, value);
      });
      // 连线
      const ligatures = points.map((item) => {
        const { start, end } = item;
        return {
          coords: [baseMap.get(start), baseMap.get(end)]
        };
      });

      this.option = {
        backgroundColor: "transparent", // 整体背景
        geo: {
          map: "china", // 中国地图
          roam: false, // 是否开启平移和缩放
          zoom: 1.2,
          scaleLimit: {
            min: 1
          },
          label: {
            // 控制省份名
            normal: {
              // 正常模式
              show: false
            },
            emphasis: {
              // hover模式
              show: false
            }
          },
          itemStyle: {
            // 控制省份区域（省份块）
            normal: {
              areaColor: "rgba(45,54,77,0.9)",
              borderColor: "#8b97ad"
            },
            emphasis: {
              areaColor: "rgba(45,54,77,1)"
            }
          }
        },
        tooltip: {
          backgroundColor: "transparent",
          position: "top",
          trigger: "item",
          formatter(res) {
            // 导航框内容  可以写标签哦！！！
            if (/大区/.test(res.seriesName)) {
              return `<div class="regions-box">${res.name}</div>`;
            }
          }
        },
        series: [
          {
            name: "基地",
            type: "effectScatter",
            coordinateSystem: "geo",
            symbolSize: 5,
            effectType: "ripple", // 特效类型，目前只支持涟漪特效'ripple'。
            showEffectOn: "render", // 配置何时显示特效。'render' 绘制完成后显示特效。
            rippleEffect: {
              scale: 6,
              // 涟漪特效相关配置。
              brushType: "fill"
            },
            progressive: 0, // 不启用渐进式渲染  因为数据量在3000-10000有问题
            label: {
              // 每个点的信息
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: colors[0],
                shadowBlur: 2,
                shadowColor: colors[0]
              }
            },
            data: bases,
            zlevel: 3
          },
          {
            name: "大区",
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize(val) {
              return val[2];
            },
            progressive: 0, // 不启用渐进式渲染  因为数据量在3000-10000有问题
            label: {
              // 每个点的信息
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: colors[1],
                shadowBlur: 2,
                shadowColor: colors[1]
              }
            },
            data: regions,
            hoverAnimation: false,
            zlevel: 1
          },
          {
            name: "连线",
            type: "lines",
            coordinateSystem: "geo",
            effect: {
              // 线的运行特效
              show: true,
              period: 4,
              // 运行时间
              symbol: "triangle",
              // 头的形状
              symbolSize: 3,
              // 头的大小
              trailLength: 0.3,
              // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
              color: colors[2]
            },
            progressive: 0,
            lineStyle: {
              normal: {
                color: colors[2],
                width: 0.5,
                curveness: 0.2
              }
            },
            data: ligatures,
            zlevel: 2
          }
        ]
      };
    },
    // 绘制函数
    draw({ target, option }) {
      if (this.myChart) {
        this.myChart.clear();
        this.myChart.dispose();
      }
      this.myChart = echarts.init(target);
      this.myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="less">
//第三屏
.third-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("~assets/images/home_map_bg.png") no-repeat;
  background-size: cover;
  .section-title {
    position: absolute !important;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
  }
  #map {
    position: absolute;
    z-index: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;

    .regions-box {
      width: 106px;
      height: 60px;
      padding-top: 7px;
      text-align: center;
      white-space: normal;
      font-weight: bold;
      color: #ffc917;
      background: url("~assets/images/regions_box.png") no-repeat;
    }
  }
}
</style>
