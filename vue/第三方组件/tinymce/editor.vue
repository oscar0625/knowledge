<template>
  <div>
    <editor :init="tinymceInit" :value="value" @input="updateValue"></editor>
  </div>
</template>
<script>
import "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/icons/default/icons"; //解决5.3.x以上 icons.js报错Unexpected token '<'
// 编辑器插件plugins
import "tinymce/plugins/code";
import "tinymce/plugins/link";
import "tinymce/plugins/advlist";
import "tinymce/plugins/lists";
import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/paste";
import "tinymce/plugins/preview";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/wordcount";
//需要自己下载行高插件http://tinymce.ax-z.cn/more-plugins/lineheight.php
import "tinymce/plugins/lineheight";

export default {
  name: "tinymceEditor",
  components: {
    editor: Editor
  },
  props: {
    value: {
      type: String,
      required: true
    },
    imgUploadUrl: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      default: "image/jpeg,image/png"
    },
    sizeLimit: {
      type: Number,
      default: 2
    }
  },
  data() {
    let handleImgUpload = (blobInfo, success, failure) => {
        let formData = new FormData();
        formData.append("File", blobInfo.blob());
        this.$axios
          .post(this.imgUploadUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            if (res.code === 0) {
              success(res.url);
            } else {
              failure("error");
            }
          })
          .catch(() => {
            failure("error");
          });
      },
      accept = this.$props.accept,
      sizeLimit = this.$props.sizeLimit;
    return {
      content: "",
      tinymceInit: {
        height: 300,
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: `/tinymce/skins/ui/oxide`,
        content_css: `/tinymce/skins/content/default/content.min.css`,

        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        elementpath: false, //禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        paste_data_images: false, // 允许粘贴图像

        menubar: true, // 隐藏最上方menu
        plugins:
          "code link advlist lists image media table paste preview fullscreen wordcount lineheight",
        toolbar: [
          "code undo redo restoredraft | bold italic underline strikethrough forecolor backcolor | lineheight alignleft aligncenter alignright alignjustify | bullist numlist blockquote subscript superscript removeformat",
          " formatselect fontselect fontsizeselect | image media table link unlink | outdent indent| preview fullscreen wordcount "
        ],
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        font_formats:
          "微软雅黑=Microsoft YaHei,sans-serif;黑体=SimHei,sans-serif;楷体=KaiTi,sans-serif;宋体=simsun,sans-serif;新宋体=NSimSun,sans-serif;仿宋体=FangSong,sans-serif;思源黑体=Noto Sans SC,sans-serif;思源宋体=Noto Serif SC,serif;苹果-苹方=PingFang SC,sans-serif;苹果-黑体=Heiti SC,sans-serif;苹果-冬青黑体=Hiragino Sans GB,sans-serif;",
        //上传图片 有2种方式
        images_upload_handler: function(blobInfo, success, failure) {
          const verificationType = accept.includes(blobInfo.blob().type),
            verificationSize = blobInfo.blob().size / 1024 / 1024 < sizeLimit;
          if (!verificationType) {
            return failure("上传的文件类型有误");
          }
          if (!verificationSize) {
            return failure(`上传图片大小不能超过${sizeLimit}MB!`);
          }
          // //1.接上传base64
          // let base64 = "data:image/jpeg;base64," + blobInfo.base64();
          // success(base64);
          //2.先上传到服务器 然后服务器返回路径做保存
          handleImgUpload(blobInfo, success, failure);
        }
      }
    };
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    }
  }
};
</script>
<style>
/* @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC&family=Noto+Serif+SC&display=swap"); */
@import url("~@/assets/css/google_font.css");
</style>
