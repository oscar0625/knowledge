<template>
  <div class="map">
    <div class="target" ref="target"></div>
    <!-- 地区筛选 -->
    <ul class="area">
      <li
        v-for="(v, k) in area"
        :key="k"
        @click="handleTab('place', v)"
        :class="place === v ? 'active' : ''"
      >
        {{ k }}
      </li>
    </ul>
    <!-- 其他筛选 -->
    <div class="filter">
      <ul class="legend">
        <li
          v-for="item in legends"
          :key="item.name"
          @click="handleTab('legend', item.name)"
        >
          <i
            :style="`background-color: ${item.color};`"
            :class="{
              disable: legend === '全部' ? false : legend !== item.name
            }"
          ></i
          ><span>{{ item.name }}</span>
        </li>
      </ul>
      <ul class="field">
        <li
          :class="place === 'three' ? 'hd' : ''"
          v-for="(value, key) in place === 'three' ? hdField : allField"
          :key="value"
          @click="handleTab('field', key)"
        >
          <i
            :class="{
              disable: field === '全部' ? false : field !== key
            }"
          ></i
          ><span>{{ key }}</span>
        </li>
      </ul>
    </div>
    <!-- 加载效果 -->
    <div class="loading" v-show="isLoading">
      <a-spin :spinning="isLoading">
        <a-icon
          slot="indicator"
          type="loading-3-quarters"
          :style="`font-size: ${5 * commonFont}px;color: #00c3ff;`"
          spin
        />
      </a-spin>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    position: {
      type: String,
      required: true
    },
    commonFont: {
      type: Number,
      required: true
    }
  },
  data() {
    // geos配置
    const [areaColor, borderColor, shadowColor] = [
      "rgba(13, 61, 185,0.8)",
      "#0A2877",
      "rgb(13, 61, 185,0.3)"
    ];
    return {
      graph: null,
      dataset: null,
      // 地区
      area: {
        全国: "one",
        北京: "two",
        海淀: "three"
      },
      place: this.position,
      // 切换地区生成geo
      geos: {
        one: {
          map: "china", //中国地图
          roam: true, //是否开启平移和缩放
          zoom: 1.3,
          scaleLimit: {
            min: 1
          },
          silent: true, //不响应和触发鼠标事件。
          label: {
            //控制省份名
            show: false
          },
          emphasis: {
            label: {
              //控制省份名
              show: false
            }
          },
          itemStyle: {
            //控制省份区域（省份块）
            areaColor,
            borderColor,
            borderWidth: 2,
            shadowColor,
            shadowBlur: 10
          }
        },
        two: {
          map: "北京", //中国地图
          roam: true, //是否开启平移和缩放
          center: ["116.45", "40.28"],
          zoom: 1.2,
          scaleLimit: {
            min: 1
          },
          silent: true, //不响应和触发鼠标事件。
          label: {
            //控制省份名
            show: false
          },
          emphasis: {
            label: {
              //控制省份名
              show: false
            }
          },
          itemStyle: {
            //控制省份区域（省份块）
            areaColor,
            borderColor,
            borderWidth: 2,
            shadowColor,
            shadowBlur: 10
          }
        },
        three: {
          map: "北京", //中国地图
          roam: true, //是否开启平移和缩放
          center: ["116.225", "40.02"],
          zoom: 7,
          scaleLimit: {
            min: 6.7
          },
          silent: true, //不响应和触发鼠标事件。
          label: {
            //控制省份名
            show: false
          },
          emphasis: {
            label: {
              //控制省份名
              show: false
            }
          },
          itemStyle: {
            opacity: 0
          },
          regions: [
            {
              //海淀
              name: "海淀区",
              itemStyle: {
                areaColor,
                borderColor,
                borderWidth: 2,
                shadowColor,
                shadowBlur: 10,
                shadowOffsetX: 1,
                shadowOffsetY: 1,
                opacity: 1
              }
            }
          ]
        }
      },
      geo: null,
      //领域
      allField: {
        全部: 0,
        海洋: 5,
        太空: 7,
        生物: 2,
        新能源: 1,
        网络空间: 23,
        人工智能: 104
      },
      hdField: {
        全部: 0,
        仿真系统: 69,
        集成电路及核心传感器: 70,
        大数据及人工智能: 37,
        新材料: 120,
        光电装备: 68,
        通用航空与卫星应用: 66,
        网络与信息安全: 65,
        高端海洋装备: 67
      },
      field: "全部",
      // 根据位置和领域创建的series
      series: null,
      // 图例
      legends: [
        {
          name: "全部",
          color: "#3D74FF"
        },
        {
          name: "创新型企业",
          color: "#D69E26"
        },
        {
          name: "参J潜力企业",
          color: "#00C3FF"
        },
        {
          name: "**资质企业",
          color: "#D428A5"
        },
        {
          name: "实验室",
          color: "#8D3DF5"
        },
        {
          name: "创新服务机构",
          color: "#D9532A"
        }
      ],
      legend: "全部",
      // loading效果
      isLoading: false
    };
  },
  mounted() {
    this.load();
    this.judgePlace();
  },
  methods: {
    // 点击切换地区领域图例触发
    handleTab(key, value) {
      //在没有获取实时数据情况下 不允许切换地区和领域 但可以切换图例
      if (!this.dataset && key !== "legend") return;
      // 如果重复忽略此次操作
      if (this[key] === value) return;
      // 修改值
      this[key] = value;
      // 开启加载效果
      this.isLoading = true;
      // 延迟执行 后续判断 为了加载效果明显
      setTimeout(() => {
        const name = "judge" + key.slice(0, 1).toUpperCase() + key.slice(1);
        this[name]();
      }, 20);
    },
    load() {
      Promise.all([
        this.$api("home", "homeMap1", {}),
        this.$api("home", "homeMap2", {}),
        this.$api("home", "homeMap3", {})
      ]).then(
        ([
          { dataList: companyinfo },
          { dataList: laboratory },
          { dataList: organization }
        ]) => {
          this.worker({
            companyinfo,
            laboratory,
            organization
          });
        }
      );
    },
    worker(dataObj) {
      //处理数据
      const webWK = new Worker("/worker.js");
      //发送消息
      webWK.postMessage(dataObj);
      //添加监听事件
      webWK.onmessage = e => {
        console.log(e.data);
        this.dataset = e.data;
        // window.oscar={
        //     companyData:e.data[1].companyData[0],
        //     sysData:e.data[1].sysData[0],
        //     organization:e.data[1].organization[0],
        //     ligature:e.data[1].ligature[0],
        // };
        //停止线程
        webWK.terminate();
      };
    },
    //判断位置
    judgePlace() {
      this.geo = this.geos[this.place];
      this.field = "全部";
      return this.createData();
    },
    //创建当前情况下采用的数据源 是离线还是获取的数据
    createData() {
      // 如果采用的是离线数据 直接进入创建series
      if (!this.dataset) {
        return this.createSeries(require("@/utils/offline/OfflineData2.json"));
      } else {
        return this.judgeField();
      }
    },
    //判断领域
    judgeField() {
      const { companyData, sysData, organization, ligature } = this.dataset[
        this.place
      ];
      //如果是海淀采用8大领域 全国采用6大领域
      const id =
        this.place === "three"
          ? this.hdField[this.field]
          : this.allField[this.field];
      return this.createSeries({
        companyData: companyData[id],
        sysData: sysData[id],
        organization: organization[id],
        ligature: ligature[id]
      });
    },
    //根据数据创建series
    createSeries(data) {
      console.log(data);
      // 数据
      const { companyData, sysData, organization, ligature } = data;
      // 图表参数
      const colors = this.legends.slice(1).map(x => x.color);
      const circleSize = 20;
      // 图表配置
      const series = [
        {
          name: "创新型企业",
          type: "scatter",
          coordinateSystem: "geo",
          symbolSize: circleSize / 2,
          progressive: 0,
          large: true,
          label: {
            show: false
          },
          itemStyle: {
            color: colors[0]
          },
          data: companyData["创新型企业"],
          zlevel: 5
        },
        {
          name: "创新型企业hover",
          type: "effectScatter",
          coordinateSystem: "geo",
          symbolSize: circleSize,
          rippleEffect: {
            brushType: "stroke"
            // scale: 4
          },
          progressive: 0,
          label: {
            show: false
          },
          itemStyle: {
            color: "#ffc917",
            shadowBlur: 2,
            shadowColor: "#ffc917"
          },
          data: companyData["创新型企业hover"],
          zlevel: 10
        },
        {
          name: "参J潜力企业",
          type: "scatter",
          coordinateSystem: "geo",
          symbolSize: circleSize / 2,
          progressive: 0,
          label: {
            //每个点的信息
            show: false
          },
          itemStyle: {
            color: colors[1]
          },
          data: companyData["参J潜力企业"],
          zlevel: 6
        },
        {
          name: "**资质企业",
          type: "scatter",
          coordinateSystem: "geo",
          // symbol: "image://./web/images/series5.png",
          // symbolKeepAspect: true,
          symbolSize: circleSize / 2,
          progressive: 0,
          label: {
            //每个点的信息
            show: false
          },
          itemStyle: {
            color: colors[2]
          },
          data: companyData["**资质企业"],
          zlevel: 7
        },
        {
          name: "实验室",
          type: "scatter",
          coordinateSystem: "geo",
          symbol: "pin",
          symbolSize: circleSize,
          progressive: 0,
          label: {
            show: false
          },
          itemStyle: {
            color: colors[3]
          },
          data: sysData,
          zlevel: 8
        },
        {
          name: "创新服务机构",
          type: "scatter",
          coordinateSystem: "geo",
          // symbol: "image://./web/images/series6.png",
          // symbolKeepAspect: false,
          symbolSize: circleSize / 2,
          progressive: 0,
          label: {
            //每个点的信息
            show: false
          },
          itemStyle: {
            color: colors[4]
          },
          data: organization,
          zlevel: 9
        },
        {
          name: "连线",
          type: "lines",
          coordinateSystem: "geo",
          effect: {
            //线的运行特效
            show: true,
            period: 4,
            //运行时间
            symbol: "triangle",
            //头的形状
            symbolSize: 3,
            //头的大小
            trailLength: 0.3,
            //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
            color: colors[0]
          },
          progressive: 0,
          lineStyle: {
            color: colors[0],
            width: 0.5,
            curveness: 0.2
          },
          data: ligature,
          zlevel: 1
        }
      ];
      this.series = series;
      return this.judgeLegend();
    },
    //判断当前图例
    judgeLegend() {
      const cur = this.series.filter(item => {
        return item.name.includes(this.legend);
      });
      return this.createOption(cur.length === 0 ? this.series : cur);
    },
    // 创建option
    createOption(series) {
      const basicSize = this.commonFont;
      // option
      const option = {
        backgroundColor: "transparent",
        textStyle: {
          fontSize: basicSize,
          color: "#A6BFFF"
        },
        geo: this.geo,
        tooltip: {
          className: "echarts-tooltip",
          trigger: "item",
          formatter: function(res) {
            if (/企业/.test(res.seriesName)) {
              return (
                '<div style="padding:0 ' +
                basicSize * 0.5 +
                "px; font-size: " +
                basicSize +
                'px;"><p >' +
                res.data.ne +
                "</p></div>"
              );
            } else if (/实验室/.test(res.seriesName)) {
              return (
                '<div style="padding:0 ' +
                basicSize * 0.5 +
                "px; font-size: " +
                basicSize +
                'px;"><p >' +
                res.data.labName +
                "</p></div>"
              );
            } else if (/服务机构/.test(res.seriesName)) {
              return (
                '<div style="padding:0 ' +
                basicSize * 0.5 +
                "px; font-size: " +
                basicSize +
                'px;"><p >' +
                res.data.name +
                "</p></div>"
              );
            }
          }
        },
        series
      };
      return this.createInstance(option);
    },
    //实例化 graph
    createInstance(option) {
      // 销毁
      this.destroyInstance();
      this.graph = echarts.init(this.$refs.target);
      this.graph.setOption(option, true);
      // 移除loading
      this.isLoading = false;
      // 修改全局positon
      this.$store.commit("updatePositon", this.place);
    },
    // 销毁实例
    destroyInstance() {
      if (this.graph) {
        this.graph.clear();
        this.graph.dispose();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.map {
  position: relative;
  height: 100%;

  .target {
    height: 100%;
  }
  // 地区筛选
  .area {
    position: absolute;
    right: 30 / @rem;
    bottom: 140 / @rem;
    z-index: 1;
    li {
      box-sizing: border-box;
      width: 63 / @rem;
      height: 30 / @rem;
      border: 1 / @rem solid @assistColor;
      margin-top: 10 / @rem;
      border-radius: 15 / @rem;
      line-height: 30 / @rem;
      text-align: center;
      font-size: @smallFS;
      color: @assistColor;
      cursor: pointer;
      &.active {
        border-color: #3d74ff;
        color: #ffffff;
        background: rgba(61, 116, 255, 0.3);
      }
    }
  }
  // 其他筛选
  .filter {
    position: absolute;
    left: 67 / @rem;
    bottom: 20 / @rem;
    z-index: 1;
    font-size: @smallFS;
    color: @assistColor;
    .field,
    .legend {
      display: flex;
      li {
        padding: 7 / @rem 0;
        margin-right: 2em;
        line-height: 1em;
        cursor: pointer;
        i {
          box-sizing: border-box;
          display: inline-block;
          width: 1em;
          height: 1em;
          border-radius: 50%;
          margin-right: 0.5em;
          background-color: #3d74ff;
          vertical-align: middle;
          &.disable {
            border: 1 / @rem solid @assistColor;
            background-color: transparent !important;
          }
        }
      }
    }
    .field {
      flex-wrap: wrap;
      li {
        &.hd:nth-child(6) {
          margin-left: 5.5em;
        }
      }
    }
    .legend {
      padding-bottom: 10 / @rem;
    }
  }
  //加载效果
  .loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgba(50, 50, 50, 0.5);
    .ant-spin {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
