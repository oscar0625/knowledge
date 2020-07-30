<template>
  <div>
    <client-only>
      <full-page ref="myFullpage" :options="options">
        <div class="section">
          <button class="next" @click="myFullpage.api.moveSectionDown()">
            Next
          </button>
          Section 1
        </div>
        <div class="section">
          <button class="prev" @click="myFullpage.api.moveSectionUp()">
            Prev
          </button>
          Section 2
        </div>
        <div class="section fp-auto-height">
          Section 3
        </div>
      </full-page>
    </client-only>
  </div>
</template>

<script>
/**
 *  vue/nuxt配置文档： https://github.com/alvarotrigo/vue-fullpage.js
 *  option/方法介绍： https://github.com/alvarotrigo/fullPage.js/tree/master/lang/chinese#fullpagejs
 *
 *  常见问题
 *  1.licenseKey报错
 *    去vue-fullpage.js中删掉代码
 *  2.创建更小或更大的 section
 *    fp-auto-height
 *  3.懒加载
 *    <img data-src="image.png">
 *  */

export default {
  name: "Demo",
  layout: "onlyContent",
  data() {
    return {
      options: {
        verticalCentered: false, // 关闭垂直居中
        anchors: ["page1", "page2", "page3"], // 定义要在每个 section 的 URL 上显示的锚链接
        sectionsColor: ["#41b883", "#ff5f45", "#0798ec"], // 为每个 section 定义 CSS background-color 属性。
        scrollBar: false, // 确定是否使用站点的滚动条 默认 false
        easingcss3: "ease-out" // 用于垂直和水平滚动的过渡效果
      }
    };
  },
  computed: {
    myFullpage() {
      return this.$refs.myFullpage;
    }
  },
  mounted() {
    this.delayInit();
  },
  methods: {
    // 延迟初始化 <full-page ref="fullpage" :options="options" :skip-init="true">
    delayInit() {
      this.myFullpage.init();
    }
  }
};
</script>

<style></style>
