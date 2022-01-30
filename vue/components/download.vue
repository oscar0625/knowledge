<template>
  <el-button
    :type="buttonType"
    icon="el-icon-download"
    :loading="loading"
    @click="download"
  >
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
    params: {
      type: [Object, Array],
      default() {
        return {};
      }
    },
    buttonType: {
      type: String,
      default: "primary"
    },
    fileType: {
      type: String,
      default:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    fileSuffix: {
      type: String,
      default: ".xlsx"
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
          const type = res.type;
          if (fileType.includes(type)) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(res);
            link.download = fileName + Date.now() + fileSuffix;
            link.click();
          } else if (type.includes("application/json")) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = JSON.parse(e.target.result);
              if (result.code === 1003) {
                this.redirectByPath("/login", { path: this.$route.path });
              } else {
                this.$message.error(result.message);
              }
            };
            reader.readAsText(res);
          }
          this.loading = false;
        });
    }
  }
};
</script>

<style></style>
