<template>
  <el-radio-group :value="value" @input="updateValue">
    <el-radio v-for="(item, key) in list" :key="key" :label="item.value">{{
      item.name
    }}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: "EnumerateRadio", // 数据枚举的公共组件 radio方式
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
      this.$axios.get(this.url).then((res) => {
        // 设定默认值
        if (this.$props.defaultValue) {
          res.enumList.some((item) => {
            if (item.name === this.$props.defaultValue) {
              this.$emit("input", item.value);
              return true;
            }
          });
        }
        return (this.list = res.enumList);
      });
    },
    updateValue(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="less"></style>
