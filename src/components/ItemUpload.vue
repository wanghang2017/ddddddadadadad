<template>
  <div class="item-upload">
    <div class="upload-title">
      <span class="title-neccesarry" v-if="validator.required">*</span>
      {{text}}
    </div>
    <div class="upload-content">
      <div v-for="(file,index) in fileList" :key="index" class="img-container">
        <img :src="file.url" class="upload-img" />
      </div>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :file-list="fileList"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "itemUpload",
  props: {
    text: String,
    column: String,
    tips: String,
    validator: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.item-upload {
  padding: 0.5em;
  background: #fff;
  .title-neccesarry {
    color: red;
    font-size: 1em;
  }
  span {
    width: 6em;
    text-align: left;
  }
  .upload-title {
    text-align: left;
    margin-bottom: 1em;
  }
}
.upload-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .img-container {
    width: 3em;
    height: 3em;
    // overflow: hidden;
    margin-right: 1em;
    img {
      width: 100%;
      height: auto;
    }
  }

  .img-container::after {
    content: "X";
    width: 0.5em;
    height: 0.5em;
    text-align: center;
    background: #f1f1f1;
    position: absolute;
    top: -50%;
    right: -50%;
  }
}
.avatar-uploader {
  width: 3em;
  height: 3em;
  overflow: hidden;
  .el-upload {
    width: 100%;
    height: 100%;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  background: #f1f1f1;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>