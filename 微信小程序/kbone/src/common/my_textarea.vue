<template>
  <div class="my-textarea">
    <wx-textarea
      class="wx-textarea"
      :auto-height="true"
      :value="value"
      :placeholder="placeholder"
      placeholder-class="wx-textarea-placeholder"
      :maxlength="maxlength"
      @input="$emit('change', $event.detail.value)"
      @confirm="$emit('confirm')"
    />
    <div class="num">{{ value.length }} / {{ maxlength }}</div>
  </div>
</template>

<script>
export default {
  name: "MyTextarea",
  props: {
    value: {
      type: String,
      require: true
    },
    maxlength: {
      type: Number,
      default: 140
    },
    placeholder: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less">
.my-textarea {
  position: relative;
  padding: 27 / @rem 20 / @rem 63 / @rem;
  border-radius: 10 / @rem;
  background-color: #f7f7f7;
  .wx-textarea {
    width: 100%;
    min-height: 324 / @rem;
    font-size: 30 / @rem;
  }
  .wx-textarea-placeholder {
    color: #999999;
  }
  .num {
    position: absolute;
    right: 30 / @rem;
    bottom: 27 / @rem;
    line-height: 36 / @rem;
    font-size: 28 / @rem;
    color: #999999;
  }
}
</style>
