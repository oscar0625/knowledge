<template>
  <el-button type="primary" @click="download" :loading="loading"
    >下载文件</el-button
  >
</template>

<script>
import myAxios from "@/utils/request";
export default {
  name: "download",
  props: {
    url: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: {}
    },
    fileType: {
      type: String,
      default:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    fileSuffix: {
      type: String,
      default:
        ".xlsx"
    },
    fileName: {
      type: String,
      default: "下载文件"
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
      myAxios
        .post(url, params, {
          responseType: "blob"
        })
        .then(res => {
          const type = res.type || "";
          if (type.includes(fileType)) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(res);
            link.download = fileName + Date.now() + fileSuffix;
            link.click();
          }
          if (type.includes("application/json")) {
            let reader = new FileReader();
            reader.onload = e => {
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
