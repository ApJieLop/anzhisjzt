import Vue from "vue";
import "./axios";
import "../utils/filters";
import echarts from "echarts";
import {
  checkSessionsObj,
  setDictionary,
  gettyped,
  validatePhone,
  validateIdCard,
  validateIdCards,
  validateTime,
  refresh,
  needLogin,
  beforeAvatarUpload,
  requestMine,
  handleBigImg,
  uploadFetch,
  exceedd,
  hideIdCard,
  toPath,
  toTree,
  connectWebsocket
  
} from "../utils/common";

// Websocket
Vue.prototype.$lWebsocket = connectWebsocket;

// 刷新
Vue.prototype.$refresh = refresh;
Vue.prototype.$needLogin = needLogin;


// 表单
Vue.prototype.$checkSessionsObj = checkSessionsObj;
Vue.prototype.$setDictionary = setDictionary;
Vue.prototype.$gettyped = gettyped;
Vue.prototype.$validatePhone = validatePhone;
Vue.prototype.$validateIdCard = validateIdCard;
Vue.prototype.$validateIdCards = validateIdCards;
Vue.prototype.$validateTime = validateTime;

// upload img
Vue.prototype.$beforeAvatarUpload = beforeAvatarUpload;
Vue.prototype.$requestMine = requestMine;
Vue.prototype.$exceedd = exceedd;
Vue.prototype.$handleBigImg = handleBigImg;
Vue.prototype.$uploadFetch = uploadFetch;

Vue.prototype.$hideIdCard = hideIdCard;

Vue.prototype.$echarts = echarts;
Vue.prototype.$toPath = toPath;
Vue.prototype.$toTree = toTree; // 树
