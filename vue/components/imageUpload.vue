<template>
  <div class="image-upload">
    <!-- 头部插槽 -->
    <slot name="header"></slot>
    <el-upload
      :class="{ disabled: uploadDisabled }"
      :action="action"
      :headers="{ Authorization }"
      :show-file-list="true"
      list-type="picture-card"
      :accept="accept"
      :limit="numLimit"
      :auto-upload="true"
      :file-list="fileList"
      :multiple="multiple"
      :before-upload="upLoadBefore"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-exceed="exceed"
      :on-remove="remove"
    >
      <i class="el-icon-picture"></i>
      <h4>点击选择图片</h4>
      <p v-if="multiple">可选多个图片进行上传</p>
    </el-upload>
    <!-- 默认插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "imageUpload",
  props: {
    url: {
      type: String,
      required: true
    },
    fileList: {
      type: Array,
      required: true
    },
    accept: {
      type: String,
      default: "image/jpeg,image/png"
    },
    multiple: {
      type: Boolean,
      default: true
    },
    sizeLimit: {
      type: Number,
      default: 2
    },
    numLimit: {
      type: Number,
      default: 1
    }
  },
  data() {
    const DOMAIN =
      process.env.NODE_ENV === "development"
        ? process.env.VUE_APP_DEV_DOMAIN
        : process.env.VUE_APP_DOMAIN;
    return {
      action: DOMAIN + this.url,
      Authorization: this.$cookies.get("token")
    };
  },
  computed: {
    // 判读当前图片已经到限制数量
    uploadDisabled() {
      return this.fileList.length >= this.numLimit;
    }
  },
  methods: {
    // 触发numLimit
    exceed() {
      this.$message.error(`最多只能上传${this.numLimit}张图片`);
    },
    // 删除已经上传或者正在上传中的
    remove(file, fileList) {
      this.updateFileList(fileList);
    },
    // 更新fileList
    updateFileList(fileList) {
      // console.log(fileList);
      this.$emit("update:fileList", fileList);
    },
    // 上传之前验证
    upLoadBefore(file) {
      const verificationType = this.accept.includes(file.type);
      const verificationSize = file.size / 1024 / 1024 < this.sizeLimit;
      if (!verificationType) {
        this.$message.error("上传的图片类型有误");
      }
      if (!verificationSize) {
        this.$message.error(`上传图片大小不能超过${this.sizeLimit}MB!`);
      }
      return verificationType && verificationSize;
    },
    // 成功
    uploadSuccess(res, file, fileList) {
      // 判断是否真正成功
      if (res.code === 0) {
        this.updateFileList(fileList);
      } else {
        // 服务器没响应成功 从fileList中删除当前的file
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
    // 失败
    uploadError(error) {
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

<style lang="less" scoped>
.image-upload {
  //当前图片已经到限制数量隐藏
  /deep/ .disabled .el-upload--picture-card {
    display: none;
    visibility: hidden;
  }
  /deep/ .el-upload {
    position: relative;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    line-height: normal;
    cursor: pointer;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
    .el-icon-picture {
      font-size: 34px;
      line-height: 70px;
      padding-top: 20px;
    }
    > h4 {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      line-height: 30px;
    }
    > p {
      font-size: 10px;
      color: #cccccc;
    }
  }

  /deep/ .el-alert {
    margin-top: 10px;
    line-height: normal;
  }
}
</style>
