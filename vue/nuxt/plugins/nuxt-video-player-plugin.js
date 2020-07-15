import Vue from "vue";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";

const VueVideoPlayer = require("vue-video-player/dist/ssr");
// { src: "@/plugins/nuxt-video-player-plugin.js", ssr: false }
Vue.use(VueVideoPlayer);
