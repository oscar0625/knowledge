<template>
  <div>对于某一个请求添加取消的功能</div>
</template>

<script>
import axios from "axios";
//https://segmentfault.com/a/1190000021290514
//https://segmentfault.com/a/1190000022034769
export default {
  data() {
    return {
      cancel: null
    };
  },
  methods: {
    toCancel() {
      this.cancel && this.cancel("取消请求");
    },
    getData() {
      const { CancelToken, isCancel } = axios;
      axios
        .get("/user/12345", {
          cancelToken: new CancelToken(c => (this.cancel = c))
        })
        .then(res => {
          console.log(res);
        })
        .catch(reason => {
          if (isCancel) {
            console.log(reason.message);
          } else {
            console.log(reason);
          }
        })
        .finally(() => {
          this.cancel = null;
        });
    }
  }
};
</script>

<style></style>
