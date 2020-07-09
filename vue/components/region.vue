<template>
  <div>
    <el-cascader
      :value="value"
      :options="REGIONDATA"
      clearable
      style="width: 100%;"
      @input="updateValue"
    ></el-cascader>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  name: "Region", // 地区
  props: {
    value: {
      type: [String, Boolean],
      required: true
    }
  },
  data() {
    return {
      REGIONDATA: regionData
    };
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="less"></style>
