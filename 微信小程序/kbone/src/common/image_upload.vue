<template>
  <div class="my-imageupload">
    <mp-uploader
      ext-class="mp-uploader"
      :size-type="['compressed', 'original']"
      :max-size="sizeLimit * 1024 * 1024"
      :max-count="numLimit"
      :files="fileList"
      :select="onSelectFile"
      :upload="onUplaodFile"
      @delete="remove"
      @success="uploadSuccess"
      @fail="uploadError"
    ></mp-uploader>
  </div>
</template>

<script>
export default {
  name: "MyImageupload",
  props: {
    url: {
      type: String,
      required: true
    },
    fileList: {
      type: Array,
      required: true
    },
    sizeLimit: {
      type: Number,
      default: 10
    },
    numLimit: {
      type: Number,
      default: 5
    }
  },
  data() {
    const DOMAIN = process.env.VUE_APP_DOMAIN;
    return {
      action: DOMAIN + this.url,
      Authorization: this.$cookies.get("token")
    };
  },
  methods: {
    // base64 转为Blob
    base64ToBlob(base64Data) {
      const dataArr = base64Data.split(","); // 根据,来分隔
      const imageType = dataArr[0].match(/:(.*?);/)[1]; // 获取文件类型。使用正则捕获 image/jpeg
      const textData = window.atob(dataArr[1]); // 使用atob() 将base64 转为文本文件
      const arrayBuffer = new ArrayBuffer(textData.length); // 创建一个二进制数据缓冲区，可以理解为一个数组
      const uint8Array = new Uint8Array(arrayBuffer); // 创建一个类型化数组对象，可以理解为上面的数组的成员，给这个对象赋值就会放到上面的数组中。
      for (let i = 0; i < textData.length; i++) {
        uint8Array[i] = textData.charCodeAt(i); // 将文本文件转为UTF-16的ASCII, 放到类型化数组对象中
      }
      return [new Blob([arrayBuffer], { type: imageType }), imageType.slice(6)]; // 返回两个值，一个Blob对象，一个图片格式（如jpeg）
    },
    onSelectFile(files) {
      // console.log("select files", files);
      // 返回false可以阻止某次文件上传
    },
    // 开始上传
    onUplaodFile(files) {
      // console.log("upload files", files);
      const { tempFilePaths } = files;
      return new Promise((resolve, reject) => {
        // 小程序传
        if (process.env.isMiniprogram) {
          wx.uploadFile({
            url: this.action,
            filePath: tempFilePaths[0],
            name: "file",
            header: {
              Authorization: this.Authorization
            },
            success({ data }) {
              const res = JSON.parse(data);
              if (res.code === 0) {
                resolve({ urls: res.dataList });
              } else {
                reject({ url: tempFilePaths[0] });
              }
            },
            fail() {
              reject({ url: tempFilePaths[0] });
            }
          });
        } else {
          // web传
          const [imageBlob, imageType] = this.base64ToBlob(tempFilePaths[0]);
          const formData = new FormData();
          formData.append("file", imageBlob, `${Date.now()}.${imageType}`); // 添加到表单，传入文件名
          this.$axios
            .post(this.url, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then((res) => {
              if (res.code === 0) {
                resolve({ urls: res.dataList });
              } else {
                reject({ url: tempFilePaths[0] });
              }
            })
            .catch((res) => {
              reject({ url: tempFilePaths[0] });
            });
        }
      });
    },
    // 成功
    uploadSuccess(e) {
      this.updateFileList(this.fileList.concat(e.detail.urls));
    },
    // 失败
    uploadError(e) {
      const { error, type } = e.detail;
      let message;
      switch (type) {
        case 1:
          message = "图片超过限制";
          break;
        case 2:
          message = "选择图片失败";
          break;
        case 3:
          message = "图片上传失败";
          this.updateFileList(
            this.fileList.concat([
              {
                url: e.detail.error.url,
                error: true
              }
            ])
          );
          break;
      }
      this.$message.error(message);
    },
    // 删除
    remove(e) {
      const { index } = e.detail;
      const cp = JSON.parse(JSON.stringify(this.fileList));
      cp.splice(index, 1);
      this.updateFileList(cp);
    },
    // 更新fileList
    updateFileList(fileList) {
      this.$emit("change", fileList);
    }
  }
};
</script>

<style lang="less">
.my-imageupload {
  .mp-uploader {
    .weui-uploader__hd {
      display: none;
      padding-bottom: 0;
    }
    .weui-uploader__files {
      .weui-uploader__file {
        width: 96 / @rem;
        height: 96 / @rem;
        margin-right: 8 / @rem;
        margin-bottom: 8 / @rem;
      }
    }
    .weui-uploader__input-box {
      width: 96 / @rem;
      height: 96 / @rem;
      margin-right: 8 / @rem;
      margin-bottom: 8 / @rem;
      &::before {
        width: 2 / @rem;
        height: 32 / @rem;
      }
      &::after {
        width: 32 / @rem;
        height: 2 / @rem;
      }
    }
  }
}
</style>
