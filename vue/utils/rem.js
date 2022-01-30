export default {
  data() {
    return {
      // rem参数
      rem: 0,
      displayWidth: 0,
      displayHeight: 0
    };
  },
  computed: {
    // 当前页面容器尺寸
    containerSize() {
      return {
        width: this.displayWidth,
        height: this.displayHeight
      };
    }
  },
  methods: {
    //根据设计稿宽高 设置rem 设置rem参数及监听
    initRem(designWidth = 1920, designHeight = 1080) {
      let setRemUnit;

      // 自定义宽高
      const { width, height } = this.$route.query;

      // 判断当前是自定义宽高模式还是采用视口响应模式
      // 自定义宽高模式
      if (width && height) {
        const ratio = width / height;
        // 原始设计稿宽高比
        const designRatio = designWidth / designHeight;
        // 如大于原始设计稿长宽比 以高度设置rem
        if (ratio > designRatio) {
          // set 1rem = viewHeight / 10
          setRemUnit = () => {
            // 设置rem
            document.documentElement.style.fontSize = height / 10 + "px";
            // 还需手动修改mixins.less-> @rem的值
            // 设置js使用的rem参数
            this.rem = height / designHeight;
          };
        }
        // 否则以宽度设置rem
        else {
          // set 1rem = viewWidth / 10
          setRemUnit = () => {
            // 设置rem
            document.documentElement.style.fontSize = width / 10 + "px";
            // 设置js使用的rem参数
            this.rem = width / designWidth;
          };
        }
        //显示的宽高
        this.displayWidth = width + "px";
        this.displayHeight = height + "px";
      }
      // 视口响应模式
      else {
        // set 1rem = viewWidth / 10
        setRemUnit = () => {
          const dw = document.documentElement.clientWidth;
          // 设置rem
          document.documentElement.style.fontSize = dw / 10 + "px";
          // 设置js使用的rem参数
          this.rem = dw / designWidth;
        };
        //显示的宽高
        this.displayWidth = "10rem";
        this.displayHeight = (designHeight / designWidth) * 10 + "rem";
      }

      // rem初始化设置
      setRemUnit();

      // 监听
      const isPersisted = e => {
        if (e.persisted) {
          setRemUnit();
        }
      };
      window.addEventListener("resize", setRemUnit);
      window.addEventListener("pageshow", isPersisted);
      // Destroy
      this.$once("hook:beforeDestroy", function() {
        window.removeEventListener("resize", setRemUnit);
        window.removeEventListener("pageshow", isPersisted);
      });
    }
  }
};
