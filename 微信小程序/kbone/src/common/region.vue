<template>
  <div class="region-selector">
    <div class="region-selector-picker" @click="showDialog">
      <span :class="value.length === 0 && 'region-selector-placeholder'">
        {{ addressName }}
      </span>
    </div>
    <div v-if="visible" class="region-selector-dialog">
      <wx-animation ref="mask" class="mask" @click="hideDialog"></wx-animation>
      <wx-animation ref="content" class="region-selector-dialog__content">
        <div class="region-selector-dialog__btn">
          <span @click="hideDialog">取消</span>
          <span @click="handleConfrim" class="active">确定</span>
        </div>

        <wx-picker-view
          :value="pickerIndex"
          class="wx-picker-view"
          indicator-class="wx-picker-select"
          mask-class="wx-picker-mask"
          @change="changePicker"
        >
          <wx-picker-view-column class="wx-picker-view-column">
            <div
              v-for="(item, index) in provinceList"
              :key="item.value"
              :class="{
                item: true,
                active: pickerIndex[0] === index
              }"
            >
              {{ item.label }}
            </div>
          </wx-picker-view-column>
          <wx-picker-view-column class="wx-picker-view-column">
            <div
              v-for="(item, index) in cityList"
              :key="item.value"
              :class="{
                item: true,
                active: pickerIndex[1] === index
              }"
            >
              {{ item.label }}
            </div>
          </wx-picker-view-column>
          <wx-picker-view-column class="wx-picker-view-column">
            <div
              v-for="(item, index) in districtList"
              :key="item.value"
              :class="{
                item: true,
                active: pickerIndex[2] === index
              }"
            >
              {{ item.label }}
            </div>
          </wx-picker-view-column>
        </wx-picker-view></wx-animation
      >
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";

export default {
  name: "RegionSelector",
  props: {
    value: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false,
      regionOptions: [],
      pickerIndex: []
    };
  },
  computed: {
    addressName() {
      const [provinceCode, cityCode, districtCode] = this.value;
      return this.value.length === 3
        ? CodeToText[provinceCode] +
            "-" +
            CodeToText[cityCode] +
            "-" +
            CodeToText[districtCode]
        : this.placeholder;
    },
    provinceList() {
      return this.regionOptions;
    },
    cityList() {
      return this.provinceList[this.pickerIndex[0]].children;
    },
    districtList() {
      return this.cityList[this.pickerIndex[1]].children;
    }
  },
  created() {
    let indexs = [0, 0, 0];

    // 如果value有值
    if (this.value.length === 3) {
      const [provinceCode, cityCode, districtCode] = this.value;
      // regionData.some((province, pi) => {
      //   if (province.value === provinceCode) {
      //     return true;
      //   }
      // });
      const fnc = (arr, target, cbk) => {
        arr.some((item, index) => {
          if (item.value === target) {
            cbk(index, item.children);
            return true;
          }
        });
      };
      // 遍历获取对应的index
      fnc(regionData, provinceCode, (pi, city) => {
        fnc(city, cityCode, (ci, district) => {
          fnc(district, districtCode, (di) => {
            indexs = [pi, ci, di];
          });
        });
      });
    }

    this.pickerIndex = indexs;
    this.regionOptions = regionData;
  },
  methods: {
    // 显示dialog
    showDialog() {
      this.visible = true;
      this.$nextTick(() => {
        this.animShowElement(this.$refs.mask, "animate__fadeIn");
        this.animateCSS({
          element: this.$refs.content,
          animationName: "animate__fadeInUp",
          cbk: () => {}
        });
      });
    },
    // 隐藏dialog
    hideDialog() {
      this.animateCSS({
        element: this.$refs.content,
        animationName: "animate__fadeOutDown",
        cbk: () => {}
      });
      this.animHideElement(this.$refs.mask, "animate__fadeOut", () => {
        this.visible = false;
      });
    },
    // 切换选择
    changePicker(e) {
      const [p, c, d] = this.pickerIndex;
      const [np, nc, nd] = e.detail.value;
      let res;
      // 新老值比较
      if (np !== p) {
        // 改变了省
        res = [np, 0, 0];
      } else {
        if (nc !== c) {
          // 改变了市
          res = [np, nc, 0];
        } else {
          res = [np, nc, nd];
        }
      }
      this.pickerIndex = res;
    },
    indexToCode() {
      const [p, c, d] = this.pickerIndex;
      return [
        this.provinceList[p].value,
        this.cityList[c].value,
        this.districtList[d].value
      ];
    },
    // 点击确定
    handleConfrim() {
      const value = this.indexToCode();
      this.$emit("change", value);
      this.hideDialog();
    }
  }
};
</script>

<style lang="less">
.region-selector {
  height: 100%;
  .region-selector-picker {
    display: flex;
    align-items: center;
    height: 100%;
    .region-selector-placeholder {
      color: #999999;
    }
  }

  .region-selector-dialog {
    overflow: hidden;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      --animate-duration: 400ms;
    }

    .region-selector-dialog__content {
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 45%;
      background: #ffffff;
      border-radius: 30 / @rem 30 / @rem 0 0;
      --animate-duration: 400ms;

      .region-selector-dialog__btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 16%;
        padding: 0 50 / @rem;
        border-bottom: 1 / @rem solid #f2f2f2;
        font-size: 30 / @rem;
        font-weight: bold;
        color: #999999;
        .active {
          color: @mainColor;
        }
      }

      .wx-picker-view {
        width: 100%;
        height: 80%;
        .wx-picker-select {
          z-index: 0;
          height: 20%;
          background: #f7f7f7;
          // width: 80%;
          // margin-left: 10%;
          // border-top: 1 / @rem solid transparent;
          // border-bottom: 1 / @rem solid transparent;
          // border-image: linear-gradient(
          //     to right,
          //     rgba(12, 64, 212, 0) 0%,
          //     rgba(12, 64, 212, 1) 50%,
          //     rgba(12, 64, 212, 0) 100%
          //   )
          //   1;
        }
        .wx-picker-mask {
          // // 去掉默认的蒙层渐变背景色
          // background: none !important;
          // z-index: 0;
        }
        .wx-picker-view-column {
          font-size: 28 / @rem;
          color: #999999;
          .item {
            display: flex;
            justify-content: center;
            align-items: center;
            &.active {
              color: #141414;
            }
          }
        }
      }
    }
  }
}
</style>
