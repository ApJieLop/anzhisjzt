const UploadPic = {
  data() {
    return {
      imgs: []
    };
  },
  methods: {
    // 刷新
    Refresh() {
      this.$refresh();
    },
    // 图片
    requestMine() {
      return false;
    },
    beforePictureUpload(file) {
      const isLt2M = file.size / 1024 / 1024 > 5;
      if (isLt2M) this.$message.error("上传图片大小不能超过 5MB!");
      return !isLt2M;
    },
    handlePicturePreview(file) {
      this.$handleBigImg(file.url, true);
    },
    handlePictureChange(file, fileList) {
      this.imgs = fileList;
      if (typeof this.changeImgsBack === "function") {
        this.changeImgsBack();
      }
      return false;
    },
    handlePicturePreviews(index) {
      this.$handleBigImg(this.imgs[index], true);
    },
    delImgsPic(index) {
      this.imgs.splice(index, 1);
      if (typeof this.changeImgsBack === "function") {
        this.changeImgsBack();
      }
    }
  }
};

export default UploadPic;
