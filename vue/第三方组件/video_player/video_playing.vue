<template>
  <div>
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @ready="playerReadied"
      @loadeddata="onPlayerLoadeddata($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
    >
    </video-player>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
/*
 * vue-video-player
 * see https://github.com/surmon-china/vue-video-player
 *     https://docs.videojs.com/tutorial-options.html
 *     https://docs.videojs.com/tutorial-vue.html
 * 一、尺寸设置方式
 *      1. width height 固定尺寸
 *      2. fluid: true  当true时，player将拥有流体大小，将按视频原始比例缩放以适应其容器。 width height 将无效
 *      3. aspectRatio: "16:9"  设置视频为固定比例（例如"16:9"或"4:3"），将按此比例缩放以适应其容器。 width height fluid 将无效
 */

export default {
  name: "videoPlaying",
  data() {
    return {
      playerOptions: {
        // width: 300,
        // height: 150,
        // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。width height 将无效
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        language: "zh-CN",
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        sources: [
          {
            type: "video/mp4", // 类型
            src: "http://vjs.zencdn.net/v/oceans.mp4" // url地址
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
      }
    };
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log("player play!", player);
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    onPlayerEnded(player) {
      console.log("player ended!", player);
    },
    //视频的时间改变就触发
    onPlayerTimeupdate(player) {
      console.log("player Timeupdate!", player.currentTime());
    },
    // player is ready  按照触发的顺序排序
    playerReadied(player) {
      // seek to 10s
      console.log("example player 1 readied", player);
      player.currentTime(10);
      // console.log('example 01: the player is readied', player)
    },
    onPlayerLoadeddata(player) {
      console.log("player Loadeddata!", player);
    },
    onPlayerCanplay(player) {
      console.log("player Canplay!", player);
    },
    onPlayerCanplaythrough(player) {
      console.log("player Canplaythrough!", player);
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player; //自定义播放
    }
  },
  components: {
    videoPlayer
  }
};
</script>

<style></style>
