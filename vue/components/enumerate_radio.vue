<template>
  <el-radio-group :value="value" :class="customStyle" @input="updateValue">
    <el-radio
      v-for="(item, key) in list"
      :key="key"
      :label="item.code"
      :border="customStyle === 'card'"
      >{{ item.description }}</el-radio
    >
  </el-radio-group>
</template>

<script>
export default {
  name: "enumerateRadio", //数据枚举的公共组件 radio方式
  props: {
    url: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    defaultValue: {
      type: String,
      default: ""
    },
    customStyle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$axios.get(this.url).then(res => {
        //设定默认值
        if (this.$props.defaultValue) {
          res.dataList.some(item => {
            if (item.description === this.$props.defaultValue) {
              this.$emit("input", item.code);
              return true;
            }
          });
        }
        return (this.list = res.dataList);
      });
    },
    updateValue(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="less" scoped>
.el-radio-group {
  /deep/ .el-radio {
    margin-right: 10px;
  }
  //风格一 card
  &.card {
    /deep/ .el-radio {
      .el-radio__input {
        // display: none;
      }
    }
  }
}
</style>
