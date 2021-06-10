import Vue from "vue";
import moment from "moment";

Vue.filter("moment", time =>
  time ? moment(time).format("YYYY-MM-DD HH:mm:ss") : "--"
);
Vue.filter("momentWu", time =>
  time ? moment(time).format("YYYY-MM-DD HH:mm:ss") : "无"
);
Vue.filter("momentDate", time =>
  time ? moment(time).format("YYYY-MM-DD") : ""
);
Vue.filter("momentMM", time =>
  time ? moment(time).format("MM-DD HH:mm") : ""
);
Vue.filter("momentMMdd", time =>
  time ? moment(time).format("YYYY年MM月DD号 HH:mm:ss") : ""
);
