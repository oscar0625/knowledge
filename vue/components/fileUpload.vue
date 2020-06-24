<template>
  <div>
    <el-upload
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
  </div>
</template>

<script>
import { storage } from "../utils/public";
export default {
  name: "fileUpload",
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
      default: "文件上传"
    },
    accept: {
      type: String,
      default: ""
    },
    sizeLimit: {
      type: Number,
      default: 2 //MB
    },
    numLimit: {
      type: Number,
      default: 10
    }
  },
  data() {
    const DOMAIN =
      process.env.NODE_ENV === "development"
        ? process.env.VUE_APP_DEV_DOMAIN
        : process.env.VUE_APP_DOMAIN;
    return {
      action: DOMAIN + this.url,
      Authorization: "Bearer " + storage.getSession("token"),
      loading: false
    };
  },
  methods: {
    //触发numLimit
    exceed() {
      this.$message.error(`最多只能上传${this.numLimit}个文件`);
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
          this.accept === "" || this.accept.includes(file.type),
        verificationSize = file.size / 1024 / 1024 < this.sizeLimit;
      if (!verificationType) {
        this.$message.error("上传的文件类型有误");
      }
      if (!verificationSize) {
        this.$message.error(`上传文件大小不能超过${this.sizeLimit}MB!`);
      }
      return verificationType && verificationSize;
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
    }
  }
};
</script>

<style lang="less"></style>
