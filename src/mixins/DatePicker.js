const DatePicker = {
  data() {
    return {};
  },
  methods: {
    // 日期约束
    beginDate(key) {
      const self = this;
      return {
        disabledDate(time) {
          const date = self.ruleForm[key];
          //开始时间不选时，结束时间最大值小于等于当天
          //如果结束时间不为空，则小于结束时间
          return (
            time.getTime() < Date.now() - 8.64e7 ||
            (date && date.getTime() < time.getTime())
          );
        }
      };
    },
    processDate(key) {
      const self = this;
      return {
        disabledDate(time) {
          const date = self.ruleForm[key];
          if (date && date.toDateString() !== time.toDateString()) {
            //如果开始时间不为空，则结束时间大于开始时间
            return date && date.getTime() > time.getTime();
          }
        }
      };
    }
  }
};

export default DatePicker;
