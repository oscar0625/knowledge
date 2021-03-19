<template>
  <div>
    <el-cascader
      :value="value"
      @input="updateValue"
      :options="REGIONDATA"
      clearable
      style="width:100%;"
    ></el-cascader>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  name: "region", //地区
  props: {
    value: {
      type: String,
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
