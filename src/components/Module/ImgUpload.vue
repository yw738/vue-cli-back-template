<template>
  <div>
    <el-upload
      v-if="loading"
      action
      :limit="1"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="uploadFile"
      :file-list="fileList"
      accept=".jpg, .png"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress v-else type="circle" :percentage="percentage" />
    <el-dialog :visible.sync="imgDiaLog" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<!-- 图片上传-->

<script>
import { uploadImgApi } from "@/api/api";

export default {
  data: function() {
    return {
      dialogImageUrl: "",
      imgDiaLog: false,
      fileList: [],
      loading: true,
      percentage: 0
    };
  },
  props: {
    type: {
      type: String,
      default: ""
    },
    msg: {
      type: String,
      default: "word文档类"
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgDiaLog = true;
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    //限制文件上传类型
    beforeUpload(file) {
      console.log(file);
      let fileType = file.type.split("/")[0];
      // uploadImgApi("other", { input: file }).then(res => {
      //   debugger;
      // });
      if (fileType !== "image") {
        elMsg("请上传.png,.jpg格式的文件", "warning");
        return false;
      }
    },
    handleExceed(files, fileList) {
      elMsg("当前限制选择 1 个文件，请删除后继续上传", "warning");
    }, // 上传文件个数超过定义的数量
    imgPreview(file) {
      let that = this;
      return new Promise(resolve => {
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;
        if (/^image/.test(file.type)) {
          // 创建一个reader
          var reader = new FileReader();

          // 将图片将转成 base64 格式
          reader.readAsDataURL(file);

          // 读取成功后的回调
          reader.onloadend = function() {
            // console.log(this.result)//得到的base64 图片
            resolve(this.result);
          };
        }
      });
    }, //异步转base64
    // 上传文件
    async uploadFile(item) {
      this.loading = false;
      const fileObj = item.file;
      let param = new FormData();
      param.append("input", fileObj);
      uploadImgApi("other", param).then(res => {
        let { success, url, urls } = res;
        if (success) {
          if (url == null) {
            // this.$emit("uploadFnCb", urls[0]);
            this.$emit("uploadFnCb", {
              url:urls[0],
              obj:fileObj
            })
            this.fileList = [{ url: urls[0] }];
          } else {
            // this.$emit("uploadFnCb", url);
             this.$emit("uploadFnCb", {
              url:url,
              obj:fileObj
            })
            this.fileList = [{ url: url }];
          }

          // this.$emit("uploadFnCb", url);
          // this.dialogImageUrl = url;
        } else {
          elMsg("上传失败", "error");
        }
        this.percentage = 100;
        setTimeout(() => {
          this.loading = true;
          this.percentage = 0;
        }, 700);
      });
      // let bs64Img = await this.imgPreview(item.file);
      // this.$emit("uploadFnCb", bs64Img);
    },
    //如果有图片 ，在组件开始时需要调用一下init 方法，传入图片来进行回显
    init(url) {
      this.fileList = [];
      url
        ? (this.fileList = [
            {
              url: url
            }
          ])
        : (this.fileList = []);
    }
  },
};
</script>

<style scoped lang='less'>
.uploadImg {
  width: 100%;
  height: 100%;
}
</style>
