<template>
  <div class="my-filter">
    <div class="content">
      <div class="top">
        <div
          v-for="(item, index) in filterSource"
          :key="item.name"
          @click="handleExpansion(index)"
          :class="{
            active: currentExpansionIndex === index,
            checked: item.checked !== item.init
          }"
        >
          <span>{{ item.name }}</span>
          <b></b>
        </div>
      </div>
      <div class="bottom">
        <section
          ref="filterBottomItem"
          v-for="item in filterSource"
          :key="item.name"
        >
          <div class="wrapper">
            <ul>
              <li
                v-for="son in item.option"
                :key="son.code"
                @click="handleItem(item, son.code)"
                :class="{
                  checked: item.checked === son.code
                }"
              >
                {{ son.description }}
              </li>
            </ul>
            <!-- v-if="item.option.length > 0" -->
            <div class="btn">
              <span @click="handleReset(item)">重置</span>
              <span @click="handleConfirm">确定</span>
            </div>
          </div>
        </section>
      </div>
    </div>
    <wx-animation ref="mask" class="mask"></wx-animation>
  </div>
</template>

<script>
export default {
  name: "MyFilter",
  props: {
    filterSource: {
      type: Array,
      required: true
    }
  },
  // filterSource: [
  //   {
  //     name: "范围",
  //     checked: -1,
  //     init: -1,
  //     option: []
  //   }
  // ],
  data() {
    return {
      // 展开动画是否在执行中
      isExpansionAnimating: false,
      // 当前处于展开状态的索引
      currentExpansionIndex: -1
    };
  },
  methods: {
    // 点击某一项
    handleItem(item, code) {
      item.checked = code;
      this.$forceUpdate();
    },
    // 点击重置
    handleReset(item) {
      item.checked = item.init;
      this.$forceUpdate();
      this.handleConfirm();
    },
    // 点击确认
    handleConfirm() {
      this.$emit("confirm");
      this.handleExpansion(this.currentExpansionIndex);
    },
    // 点击展开
    handleExpansion(index) {
      // console.log("点击生效");

      // 展开动画正在执行中 防止快速点击
      if (this.isExpansionAnimating) return;
      this.isExpansionAnimating = true;

      // 目标元素
      const ele = this.$refs.filterBottomItem[index];
      // 如果目标元素已经处于展开状态则执行收起操作
      if (this.currentExpansionIndex === index) {
        // console.log("执行收起操作" + Date.now());
        this.animHideElement(this.$refs.mask, "animate__fadeOut");
        this.zoomout({
          ele,
          cbk: () => {
            // console.log("收起动画完成" + Date.now());
            this.isExpansionAnimating = false;
          }
        });
        this.currentExpansionIndex = -1;
      } else {
        // 如果当前没有元素被展开 直接展开目标元素
        if (this.currentExpansionIndex === -1) {
          // console.log("执行展开操作" + Date.now());
          this.animShowElement(this.$refs.mask, "animate__fadeIn");
          this.zoomin({
            ele,
            cbk: () => {
              // console.log("展开动画完成" + Date.now());
              this.isExpansionAnimating = false;
            }
          });
        } else {
          // 先收起当前被展开的元素 再展开目标元素
          // console.log("执行切换操作" + Date.now());
          const currentEle =
            this.$refs.filterBottomItem[this.currentExpansionIndex];
          this.zoomout({
            ele: currentEle,
            duration: 200,
            cbk: () => {
              // console.log("切换：收起动画完成" + Date.now());
              this.zoomin({
                ele,
                cbk: () => {
                  // console.log("切换：展开动画完成" + Date.now());
                  this.isExpansionAnimating = false;
                }
              });
            }
          });
        }
        this.currentExpansionIndex = index;
      }
    }
    // handleExpansion1() {
    //   if (this.asd) {
    //     console.log("执行展开操作" + Date.now());
    //     this.animShowElement(this.$refs.mask, "animate__fadeIn", () => {
    //       console.log("展开动画完成" + Date.now());
    //     });
    //   } else {
    //     console.log("执行收起操作" + Date.now());
    //     this.animHideElement(this.$refs.mask, "animate__fadeOut", () => {
    //       console.log("收起动画完成" + Date.now());
    //     });
    //   }
    //   this.asd = !this.asd;
    // },
  }
};
</script>

<style lang="less">
.my-filter {
  .content {
    position: relative;
    z-index: 100;
    height: 86 / @rem;
    .top {
      display: flex;
      justify-content: space-evenly;
      height: 100%;
      border-radius: 30 / @rem 30 / @rem 0 0;
      background-color: #f7f7f7;
      > div {
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
        padding: 0 24 / @rem;
        color: #141414;
        transition: all 0.3s;
        &.checked {
          color: @mainColor;
        }
        &.active {
          color: @mainColor;
          b {
            border-bottom: 8 / @rem solid @mainColor;
            transform: translateY(-50%) rotate(180deg);
          }
        }
        b {
          position: absolute;
          top: 50%;
          right: 0;
          width: 0;
          height: 0;
          border-left: 7 / @rem solid transparent;
          border-right: 7 / @rem solid transparent;
          border-bottom: 8 / @rem solid #666666;
          transform: translateY(-50%) rotate(0);
          transition: all 0.3s;
        }
      }
    }
    .bottom {
      section {
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        height: 0;
        border-radius: 0 0 30 / @rem 30 / @rem;
        background-color: #f7f7f7;
        .wrapper {
          padding-bottom: 40 / @rem;
        }
        ul {
          padding: 10 / @rem 0;
          li {
            line-height: 100 / @rem;
            text-align: center;
            font-size: 28 / @rem;
            color: #999999;
            &.checked {
              color: @mainColor;
            }
          }
        }
        .btn {
          display: flex;
          width: 570 / @rem;
          margin: 0 auto;
          border-radius: 40 / @rem;
          border: 1 / @rem solid #0000ff;
          background-size: auto 80 / @rem;
          background-image: url("~@/assets/images/filter_btn.png");
          background-repeat: no-repeat;
          background-position: right 0 center;
          span {
            flex: 1;
            line-height: 80 / @rem;
            text-align: center;
            color: @mainColor;
            font-weight: 500;
            &:last-child {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .mask {
    display: none;
    position: absolute;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 30 / @rem 30 / @rem 0 0;
    background-color: rgba(0, 0, 0, 0.3);
    --animate-duration: 400ms;
  }
}
</style>
