import Vue from "vue";
import Vuex from "vuex";
import { checkSessionsObj, delAllStorage,connectWebsocket } from "@/utils/common";

// Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("token") || "",
    user: checkSessionsObj("userJson"), // 当前用户信息
    menu: checkSessionsObj("menuJson", "Array"), // 导航
    matterData: checkSessionsObj("matterDataJson"), // 临时缓存,
    dictionary: checkSessionsObj("dictionaryJson"), // 数据字典
    traintype: checkSessionsObj("traintypeJson", "Array"), // 培训类型
    picBigUrl: "", // 图片放大
    videoUrl: {}, // 视频播放
    downloadItems: sessionStorage.getItem('downloadItems') ? sessionStorage.getItem('downloadItems').split(',') : [],
    websocketData: null
  },
  getters: {
    getToken: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    },
    getMenu: state => {
      return state.menu;
    },
    getMatter: state => {
      return state.matterData;
    },
    getPicBigUrl: state => {
      return state.picBigUrl;
    },
    getVideoUrl: state => {
      return state.videoUrl;
    },
    getDictionary: state => {
      return state.dictionary;
    },
    getTraintype: state => {
      return state.traintype;
    },
    getDownloadItems: state => {
      return state.downloadItems;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
    setUser(state, user) {
      state.user = user;
      sessionStorage.setItem("userJson", JSON.stringify(user));
    },
    setMenu(state, menu) {
      state.menu = menu;
      sessionStorage.setItem("menuJson", JSON.stringify(menu));
    },
    setMatter(state, items) {
      state.matterData = items;
      sessionStorage.setItem("matterDataJson", JSON.stringify(items));
    },
    setPicBigUrl(state, url) {
      state.picBigUrl = url;
    },
    setVideoUrl(state, url) {
      state.videoUrl = url;
    },
    setDictionary(state, items) {
      state.dictionary = items;
      sessionStorage.setItem("dictionaryJson", JSON.stringify(items));
    },
    setTraintype(state, items) {
      state.traintype = items;
      sessionStorage.setItem("traintypeJson", JSON.stringify(items));
    },
    pushDownloadItems(state, item) {
      state.downloadItems.push(item);
      sessionStorage.setItem('downloadItems', state.downloadItems);
    },
    clearDownloadItems(state) {
      state.downloadItems = [];
      sessionStorage.removeItem('downloadItems');
    },
    setDelAll(state) {
      state.user = {};
      state.menu = [];
      state.token = "";
      state.business = [];
      state.matterData = {};
      state.dictionary = {};
      state.traintype = {};
      state.downloadItems = [];
      delAllStorage();
    },
    setsocketData (state,sdata){
      state.websocketData = sdata;
    }
  },
  actions: {
    handleToken(context, token) {
      context.commit("setToken", token);
    },
    handleUser(context, user) {
      context.commit("setUser", user);
    },
    handleMenu(context, menu) {
      context.commit("setMenu", menu);
    },
    handleMatter(context, item) {
      context.commit("setMatter", item);
    },
    handlePicBigUrl(context, url) {
      context.commit("setPicBigUrl", url);
    },
    handleVideoUrl(context, url) {
      context.commit("setVideoUrl", url);
    },
    handleDictionary(context, items) {
      context.commit("setDictionary", items);
    },
    handleDelAll(context, item) {
      context.commit("setDelAll", item);
    },
    handleTraintype(context, item) {
      context.commit("setTraintype", item);
    },
    pushDownloadItems(context, item) {
      context.commit("pushDownloadItems", item);
    },
    clearDownloadItems(context) {
      context.commit("clearDownloadItems");
    }
  },
 
});
