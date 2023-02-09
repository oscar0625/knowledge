<template>
  <div class="enumerate-selector">
    <div class="enumerate-selector-picker" @click="showDialog">
      <span :class="value === '' && 'enumerate-selector-placeholder'">
        {{ labelName }}
      </span>
    </div>
    <div v-if="visible" class="enumerate-selector-dialog">
      <wx-animation ref="mask" class="mask" @click="hideDialog"></wx-animation>
      <wx-animation ref="content" class="enumerate-selector-dialog__content">
        <div class="enumerate-selector-dialog__btn">
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
              v-for="(item, index) in dataList"
              :key="item.code"
              :class="{
                item: true,
                active: pickerIndex[0] === index
              }"
            >
              {{ item.description }}
            </div>
          </wx-picker-view-column>
        </wx-picker-view></wx-animation
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "EnumerateSelector",
  props: {
    url: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
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
      dataList: [],
      pickerIndex: [0]
    };
  },
  computed: {
    labelName() {
      if (this.value === "") {
        return this.placeholder;
      } else {
        let name = "";
        this.dataList.some((item, index) => {
          if (item.code === this.value) {
            name = item.description;
            return true;
          }
        });
        return name;
      }
    }
  },
  created() {
    this.load();
  },
  methods: {
    // 初始化时 重新设置默认的 pickerIndex
    initPickerIndex(code) {
      let indexs = [0];
      this.dataList.some((item, index) => {
        if (item.code === code) {
          indexs = [index];
          return true;
        }
      });
      this.pickerIndex = indexs;
    },
    // 加载枚举数据
    load() {
      this.$axios.get(this.url).then((res) => {
        const { dataList } = res;
        this.dataList = dataList;
        // 如果value初始状态下有值
        if (this.value !== "") {
          this.initPickerIndex(this.value);
        } else {
          // 否则 监听一次value接下来的改变（仅一次）
          // 注意 其实这里如果只是进行添加 没有修改时的读写时 是不需要进行监听 这样会多执行一次 但是感觉可以接受 没必要再添加一个参数进行区分
          const unwatch = this.$watch("value", (newValue) => {
            this.initPickerIndex(newValue);
            unwatch();
          });
        }
      });
    },
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
      this.pickerIndex = e.detail.value;
    },
    indexToCode() {
      const [i] = this.pickerIndex;
      return this.dataList[i].code;
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
.enumerate-selector {
  height: 100%;
  .enumerate-selector-picker {
    display: flex;
    align-items: center;
    height: 100%;
    .enumerate-selector-placeholder {
      color: #999999;
    }
  }

  .enumerate-selector-dialog {
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

    .enumerate-selector-dialog__content {
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 45%;
      background: #ffffff;
      border-radius: 30 / @rem 30 / @rem 0 0;
      --animate-duration: 400ms;

      .enumerate-selector-dialog__btn {
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
