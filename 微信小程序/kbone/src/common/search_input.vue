<template>
  <div class="search-input">
    <div class="wrapper">
      <div
        :class="{
          top: true,
          'is-homepage': isHomepage
        }"
      >
        <wx-input
          class="wx-input"
          :value="keywords"
          :placeholder="placeholder"
          placeholder-class="wx-input-placeholder"
          maxlength="20"
          @input="keywords = $event.detail.value"
          @confirm="$emit('search', keywords)"
        />
        <wx-icon
          class="wx-icon"
          type="search"
          :size="pxtorem(28)"
          :color="isHomepage ? '#ffffff' : '#666666'"
        />
      </div>
    </div>
    <div class="hot" v-if="isHomepage">
      <div class="name">热门搜索</div>
      <div class="content">
        <wx-scroll-view class="wx-scroll-view-x" :scroll-x="true">
          <div class="words">
            <span
              v-for="(item, index) in hotword"
              :key="index"
              @click="handleHotword(item)"
              >{{ item }}</span
            >
          </div>
        </wx-scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    // 是否是首页
    isHomepage: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "搜索感兴趣的成果\需求"
    }
  },
  data() {
    return {
      keywords: "",
      hotword: []
    };
  },
  created() {
    const { keywords = "" } = this.$route.query;
    this.keywords = keywords;
    if (this.isHomepage) {
      this.loadWords();
    }
  },
  methods: {
    handleHotword(keywords) {
      this.$emit("search", keywords);
    },
    // 加载热词
    loadWords() {
      this.$api("homepage", "getHotWord", {}).then((res) => {
        this.hotword = res.dataList.slice(0, 10);
      });
    }
  }
};
</script>

<style lang="less">
.search-input {
  padding-top: 18 / @rem;
  .top {
    position: relative;
    &.is-homepage {
      .wx-input {
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.15);
      }
      .wx-input-placeholder {
        color: #ffffff;
      }
    }
    .wx-input {
      box-sizing: border-box;
      width: 100%;
      height: 72 / @rem;
      padding: 0 20 / @rem 0 80 / @rem;
      border-radius: 36 / @rem;
      line-height: 72 / @rem;
      font-size: 28 / @rem;
      color: #141414;
      background-color: #f7f7f7;
    }
    .wx-input-placeholder {
      color: rgba(153, 153, 153, 0.5);
    }
    .wx-icon {
      position: absolute;
      left: 30 / @rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .hot {
    display: flex;
    padding: 20 / @rem 0 0 30 / @rem;
    .name {
      box-sizing: border-box;
      width: 160 / @rem;
      padding-left: 40 / @rem;
      line-height: 38 / @rem;
      font-weight: 800;
      font-size: 24 / @rem;
      color: #ffffff;
      background-size: auto 26 / @rem;
      background-image: url("~@/assets/images/hot.png");
      background-position: 10 / @rem center;
      background-repeat: no-repeat;
    }
    .content {
      // 隐藏滚动条问题
      // 尝试子元素可滚动，宽度比视窗宽度略宽，右边有 padding。然后父元素限制横向滚动，宽度为视窗宽度，overflow hidden。
      overflow: hidden;
      width: 560 / @rem;
      height: 38 / @rem;
      .wx-scroll-view-x {
        height: auto;
        .words {
          display: flex;
          padding-bottom: 20 / @rem;
          span {
            flex: none;
            padding: 0 20 / @rem;
            margin-right: 20 / @rem;
            border-radius: 19 / @rem;
            line-height: 38 / @rem;
            font-size: 24 / @rem;
            color: rgba(255, 255, 255, 0.6);
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
  }
}
</style>
