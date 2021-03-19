<template>
  <el-select
    :value="value"
    @input="updateValue"
    :placeholder="placeholder"
    :clearable="!unclearable"
    style="width:100%;"
  >
    <el-option
      v-for="(item, key) in list"
      :key="key"
      :label="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "enumerate", //数据枚举的公共组件
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
    },
    unclearable: {
      type: Boolean,
      default: false
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
      this.$axios.get(this.url).then(res => {
        //设定默认值
        if (this.$props.defaultValue) {
          res.dataList.some(item => {
            if (item.name === this.$props.defaultValue) {
              this.$emit("input", item.id);
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

<style lang="less"></style>
