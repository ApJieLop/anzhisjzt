import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCropper from 'vue-cropper'
import "./plugins/install";
import Moment from 'moment'//导入文件
Vue.use(VueCropper)
// 赵金福 - 私人的方法
import sFunction from './utils/requireFunction'
Vue.prototype.zF = sFunction
// 时间戳转 - 年-月-日 时：分：秒
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;      
  // new Date(1542274800000).Format('yy-MM-dd hh:mm:ss');  // 用法
}
// var options = {
//   whiteList: {
//     a: ['href', 'style'],
//     img: ['src', 'alt'],
//   },
//   stripIgnoreTag: true, // 去掉不在白名单上的标签   true：去掉不在白名单上的标签
//   stripIgnoreTagBody: ['script', 'style'], // 去掉不在白名单上的标签及标签体   ['tag1', 'tag2']：仅去掉指定的不在白名单上的标签
//   onTagAttr: function () {
//     // todo
//   },
// }

import VueXss from 'vue-xss'
Vue.use(VueXss)

Vue.config.productionTip = false;

Vue.prototype.$moment = Moment;//赋值使用
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
