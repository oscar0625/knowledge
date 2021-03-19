<template>
  <div
    v-video-player:myVideoPlayer="playerOptions"
    class="video-player vjs-custom-skin"
    :playsinline="true"
    @timeupdate="onPlayerTimeupdate($event)"
    @ready="playerReadied"
    @contextmenu.prevent
  ></div>
</template>

<script>
/*
 * see https://github.com/surmon-china/vue-video-player/tree/master/examples/nuxt-ssr-example
 */

// videojs hotkeys plugin
import "videojs-hotkeys";
export default {
  name: "VideoPlaying",
  props: {
    videoURL: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      playerOptions: {}
    };
  },
  watch: {
    videoURL: "createOption",
    visible: "pauseVideo"
  },
  created() {
    if (process.client) {
      this.createOption();
    }
  },
  methods: {
    // 创建playerOptions
    createOption() {
      const url = this.$props.videoURL;
      this.playerOptions = {
        // width: 500,
        height: window.innerHeight,
        // aspectRatio: "16:9", // 设置视频为固定比例（例如"16:9"或"4:3"），将按此比例缩放以适应其容器。 width height fluid 将无效
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        language: "zh-CN",
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        sources: [
          {
            type: "video/mp4", // 类型
            src: url // 视频地址
          }
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      };
    },
    // 关闭后暂停视频
    pauseVideo(val) {
      if (!val) {
        this.myVideoPlayer.pause();
      }
    },
    // listen event
    // 视频的时间改变就触发
    onPlayerTimeupdate() {
      // console.log("player Timeupdate!", player.currentTime());
    },
    // player is ready
    playerReadied(player) {
      // console.log("example player 1 readied", player);
      // 设置热键
      player.hotkeys({
        volumeStep: 0.1, // 音量步数
        seekStep: 10, // 时间步数
        enableModifiersForNumbers: false,
        fullscreenKey(event, player) {
          // override fullscreen to trigger when pressing the F key or Ctrl+Enter
          return event.which === 70 || (event.ctrlKey && event.which === 13);
        }
      });
      player.currentTime(0);
    }
  }
};
</script>

<style></style>
