const Form = {
  data() {
    return {};
  },
  created: function() {
   
  },
  methods: {
    // 上传文件
    handlebusinessLicense(res) {
      let formData = new FormData();
      formData.append("file", res.raw);
      this.$Postformat("/file/upload", formData).then(ret => {
        this.imgs.push(ret.data || "");
        this.changeImgsBack();
      });
    },
    // 取消
    formCancel() {
      this.$router.back();
    },
    // 保存
    formSave(formName = "ruleForm") {
      const el = this.$refs[formName];
      el.validate(valid => {
        if (valid) {
          this.doAjax(formName);
        } else {
          this.$message({
            type: "warning",
            message: "请输入必填项"
          });
        }
      });
    },
    // 清空
    doEmpty(formName) {
      const el = this.$refs[formName];
      this.ruleForm = {};
      this.imgs = [];
      el.resetFields();
    }
  }
};

export default Form;
