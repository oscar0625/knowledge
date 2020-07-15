<template>
  <el-button :type="buttonType" :loading="loading" @click="download">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: "Download",
  props: {
    url: {
      type: String,
      required: true
    },
    buttonType: {
      type: String,
      default: "primary"
    },
    params: {
      type: Object,
      default() {
        return {};
      }
    },
    fileType: {
      type: String,
      default:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    fileSuffix: {
      type: String,
      default: ".txt"
    },
    fileName: {
      type: String,
      default: "文件"
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    download() {
      const { url, params, fileType, fileSuffix, fileName } = this.$props;
      this.loading = true;
      this.$axios
        .post(url, params, {
          responseType: "blob"
        })
        .then((res) => {
          const type = res.type || "";
          if (type.includes(fileType)) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(res);
            link.download = fileName + Date.now() + fileSuffix;
            link.click();
          }
          if (type.includes("application/json")) {
            const reader = new FileReader();
            reader.onload = (e) => {
              this.$message.error(JSON.parse(e.target.result).message);
            };
            reader.readAsText(res);
          }
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less"></style>
