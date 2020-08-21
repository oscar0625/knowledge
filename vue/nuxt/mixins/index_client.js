import "./polyfill";
import Vue from "vue";
import { WOW } from "wowjs";

Vue.mixin({
  methods: {
    // 初始化wowjs
    wowInstance() {
      return new WOW({
        animateClass: "animate__animated",
        live: false
      });
    }
  }
});
