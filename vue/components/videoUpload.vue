<template>
  <div class="video-upload">
    <el-upload
      :class="{ disabled: uploadDisabled }"
      ref="videoUpload"
      :action="action"
      :headers="{ Authorization }"
      :show-file-list="true"
      list-type="text"
      :accept="accept"
      :limit="numLimit"
      :auto-upload="true"
      :file-list="fileList"
      :before-upload="upLoadBefore"
      :on-progress="uploadProgress"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-exceed="exceed"
      :on-remove="remove"
    >
      <el-button type="primary" :loading="loading">{{ text }}</el-button>
    </el-upload>
    {{ uploadDisabled }}
    <el-alert
      :title="`上传视频大小不能超过${this.sizeLimit}GB!`"
      type="warning"
      v-if="showAlert"
    >
    </el-alert>
  </div>
</template>

<script>
export default {
  name: "videoUpload",
  props: {
    url: {
      type: String,
      required: true
    },
    fileList: {
      type: Array,
      required: true
    },
    text: {
      type: String,
      default: "上传课程文件"
    },
    accept: {
      type: String,
      default: "video/*"
    },
    sizeLimit: {
      type: Number,
      default: 2 //GB
    },
    numLimit: {
      type: Number,
      default: 1
    },
    showAlert: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const DOMAIN =
      process.env.NODE_ENV === "development"
        ? process.env.VUE_APP_DEV_DOMAIN
        : process.env.VUE_APP_DOMAIN;
    return {
      action: DOMAIN + this.url,
      Authorization: "Bearer " + this.$cookies.get("token"),
      loading: false
    };
  },
  computed: {
    //判读当前图片已经到限制数量
    uploadDisabled() {
      return this.fileList.length >= this.numLimit;
    }
  },
  methods: {
    //触发numLimit
    exceed() {
      this.$message.error(`最多只能上传${this.numLimit}个视频`);
    },
    //删除已经上传或者正在上传中的
    remove(file, fileList) {
      this.loading = false;
      this.updateFileList(fileList);
    },
    //更新fileList
    updateFileList(fileList) {
      // console.log(fileList);
      this.$emit("update:fileList", fileList);
    },
    //上传之前验证
    upLoadBefore(file) {
      const verificationType =
          file.type.includes("video") || this.accept.includes(file.type),
        verificationSize = file.size / 1024 / 1024 / 1024 < this.sizeLimit,
        verificationName =
          file.name.match(/\./g).length < 2 && file.name.search(/\s/) === -1;
      if (!verificationName) {
        this.$message.error("上传的视频名称中不能含有 点字符 或 空格字符");
      }
      if (!verificationType) {
        this.$message.error("上传的视频类型有误");
      }
      if (!verificationSize) {
        this.$message.error(`上传视频大小不能超过${this.sizeLimit}GB!`);
      }
      return verificationName && verificationType && verificationSize;
    },
    uploadProgress() {
      this.loading = true;
    },
    //成功调取接口 返回后台给的状态
    uploadSuccess(res, file, fileList) {
      this.loading = false;
      //判断是否真正成功
      if (res.code === 0) {
        this.updateFileList(fileList);
      } else {
        //服务器没响应成功 从fileList中删除当前的file
        fileList.some((item, index) => {
          if (Object.is(item, file)) {
            fileList.splice(index, 1);
            return true;
          }
        });
        this.$message.error(res.message);
        if (res.code === 1003) {
          this.redirectByPath("/");
        }
      }
    },
    //调取接口失败
    uploadError(error) {
      this.loading = false;
      // 状态码判断
      switch (error.status) {
        case 401:
          this.$message.error("登录信息失效，请重新登录");
          this.redirectByPath("/");
          break;
        case 404:
          this.$message.error("请求的资源不存在");
          break;
        default:
          this.$message.error(error.message);
      }
    },
    //手动取消上传
    abort() {
      this.loading = false;
      //取消上传
      this.$refs.videoUpload.abort();
    }
  }
};
</script>

<style lang="less" scoped>
.video-upload {
  //当前图片已经到限制数量隐藏
  /deep/ .disabled .el-upload--text {
    display: none;
    visibility: hidden;
  }
  .el-alert {
    margin-top: 10px;
    line-height: normal;
  }
}
</style>
