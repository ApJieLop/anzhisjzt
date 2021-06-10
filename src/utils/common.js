import store from "../store";
import { Message, Loading, MessageBox } from 'element-ui';
import { IdentityCodeValid } from "@/utils/idcard.js";
import { getIterator } from "core-js";

// 刷新页面
export function refresh() {
  this.$router.replace({
    name: "refresh",
    query: {
      t: Date.now()
    }
  });
}
// 跳页
export function toPath(url) {
  this.$router.push(url);
}
export function needLogin() {
  this.$alert("您需要登录后才能使用此功能", "登录", {
    confirmButtonText: "去登录"
  })
    .then(() => {
      this.$store.dispatch("handleMenu", {
        admin: new Date().valueOf()
      });
    })
    .catch(err => {
      console.log(err);
    });
}
// 清空缓存
export function delAllStorage() {
  sessionStorage.setItem("userJson", "{}");
  sessionStorage.setItem("menuJson", "[]");
  sessionStorage.setItem("token", "");
  sessionStorage.setItem("dictionaryJson", "");
  sessionStorage.setItem("matterDataJson", "{}");
  sessionStorage.setItem("traintypeJson", "[]");
  sessionStorage.removeItem('downloadItems');
  localStorage.removeItem('uploadedFiles');
}

/* 表单 */
// 校验 sessionStorage
export function checkSessionsObj(str, stu = "Object") {
  str = sessionStorage.getItem(str);
  if (!str || str === "undefined" || str === "null") {
    if (stu === "Object") {
      return {};
    } else if (stu === "Array") {
      return [];
    } else if (stu === "none") {
      return null;
    } else {
      return "";
    }
  } else {
    return JSON.parse(str);
  }
}
// 类型检测
export function gettyped(data) {
  var gettype = Object.prototype.toString;
  data = gettype.call(data);
  data = data.split(" ")[1];
  data = data.substr(0, data.length - 1);
  return data;
}
// 手机号校验
export function validatePhone(rule, value = "", callback) {
  // ^((\d{4}(-)??)??\d{7})$
  if (value.trim() === "") {
    callback(new Error("请输入手机号码"));
  } else if (value && !/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error("请输入正确的手机号码"));
  } else {
    callback();
  }
}
/* 合法url*/
export function validateURL(textval) {
  const urlregex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
  if (!urlregex.test(textval)) {
    Message.error({
      message: '请输入正确的链接',
      type: 'warning'
    });
    return false;
  } else {
    return urlregex.test(textval)
  }
}
export function validateIdCard(rule, value = "", callback) {
  const chek = IdentityCodeValid(value);
  if (value == "") {
    callback(new Error(chek.tip));
  } else if (value !== "" && !chek.pass) {
    callback(new Error(chek.tip));
  } else {
    callback();
  }
}
export function validateIdCards(rule, value = "", callback) {
  const chek = IdentityCodeValid(value);
  if (value == "") {
    callback();
  } else if (value !== "" && !chek.pass) {
    callback(new Error(chek.tip));
  } else {
    callback();
  }
}
export function validateTime(rule, value, callback) {
  value = value || [];
  if (JSON.stringify(value[0]) === "{}" || !value[0]) {
    callback(new Error("请选择时间范围"));
  } else {
    callback();
  }
}
// 隐藏部分身份证号
export function hideIdCard(str, frontLen, endLen) {
  var len = str.length - frontLen - endLen;
  var xing = "";
  for (var i = 0; i < len; i++) {
    xing += "*";
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

/* 文件 */
// 文件上传接口
export function uploadFetch(file, key) {
  let formData = new FormData();
  formData.append("file", file);
  const that = this;
  this.$Postformat("/sys/upload", formData).then(ret => {
    that.ruleForm[key] = ret.data || "";
  });
}
// 图片验证
export function beforeAvatarUpload(file, self) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (
    ["image/png", "image/gif", "image/jpg", "image/jpeg"].indexOf(file.type) ===
    -1
  ) {
    self.$message.error("请上传正确的图片格式");
    return false;
  }
  if (!isLt2M) {
    self.$message.error("上传图片大小不能超过 2MB!");
  }
  return isLt2M;
}
export function requestMine() {
  return;
}
// 图片放大
export function handleBigImg(imgUrl) {
  this.$store.dispatch("handlePicBigUrl", imgUrl);
}
// 文件超出个数限制时的钩子
export function exceedd(files, fileList) {
  this.$message.error("最多上传" + fileList.length + "个文件");
}

// 时间补0
export function add0(val = 1) {
  val = +val;
  return "" + (val <= 9 ? "0" + val : val);
}

/* 数据处理 */
export function setDictionary(type, key) {
  const dictionaryJson = checkSessionsObj("dictionaryJson");
  const items = dictionaryJson[type];
  if (key !== "list") {
    return items[key];
  } else {
    return items;
  }
}
export function getTime(val) {
  let m = parseInt(val / 60);
  let s = val % 60;
  console.log(m, s);
  if (m < 9) {
    m = '0' + m;
  }
  if (s < 9) {
    s = '0' + s;
  }
  return m + ':' + s;
}
export function resetKeepAlive(to, from, next) {
  if (to.meta.level == 1 && from.meta.level == 1) {
    //  去的页是 一级 那么不需要缓存
    // from.meta.state = false;
    to.meta.state = true;
    if (this.$vnode.parent) {
      if (to.name != 'login') {
        this.$vnode.parent.componentInstance.cache = {};
        this.$vnode.parent.componentInstance.keys = [];
      }

    }
  } else if (to.meta.level == 2 && from.meta.level == 1) {
    // 去的页是二级   需要缓存 当前页
    from.meta.state = true;
    // console.log(from);
  } else if (to.meta.level == 1 && from.meta.level == 2) {
    // 去的页是1级   需要缓存 1级页
    to.meta.state = true;
  }
  next();
}
/**
 * list ---> tree
 */
export function toTree(list = [], id, parent, node, sort) {
  let root = []; // 根目录
  let child = []; // 子目录
  for (let i = 0; i < list.length; i++) {
    if (list[i]) {
      if (list[i][parent] == 0) {
        root.push(list[i]);
      } else {
        child.push(list[i]);
      }
    }
  }
  if (sort !== '') {
    root.sort((a, b) => {
      if (a[sort] < b[sort]) {
        return -1
      } else if (a[sort] > b[sort]) {
        return 1
      } else {
        return 0
      }
    })
  }
  return getTree(root, child, id, parent, node, sort);
}
function getTree(root = [], child = [], id, parent, node, sort) {
  for (let i = 0; i < root.length; i++) {
    if (child.length == 0) {
      return root;
    }
    let nodes = []
    for (let j = 0; j < child.length; j++) {
      if (child[j][parent] == root[i][id]) {
        nodes.push(child[j])
      }
    }
    if (sort !== '') {
      nodes.sort((a, b) => {
        if (a[sort] < b[sort]) {
          return -1
        } else if (a[sort] > b[sort]) {
          return 1
        } else {
          return 0
        }
      })
    }
    root[i][node] = nodes;
    getTree(nodes, child, id, parent, node, sort);
  }
  return root
}

export function connectWebsocket(type) {
  // 点击退出时 - 关闭
  // if (type) {
  //   console.log(1)
  //   clearInterval(dsq)
  //   websocket.close();
  //   websocket.onclose = function () { }; //首先禁用onclose处理程序

  // }
  let dsq = null;
  let uid = JSON.parse(sessionStorage.getItem("userJson")).userId;
  var websocket = null;
  if ('WebSocket' in window) {
    if (uid) {
      let baseUrl = this.$baseUrl;
      let url;
      if (!baseUrl.startsWith('http')) {
        url = '://' + location.host + baseUrl;
      } else {
        url = baseUrl.substring(baseUrl.indexOf(':'));
      }
      websocket = new WebSocket('ws' + url + '/websocket/' + uid);
    } else {
      Message.error({
        message: '未检测到您的userId,您可能暂时收不到信息提示!',
        type: 'warning'
      });
    }
  } else {
    Message.error({
      message: '该浏览器不支Websocket,您可能收不到实时的消息!',
      type: 'warning'
    });
  }
  websocket.onopen = function (event) {
    // 发送一个初始化消息
    websocket.send(uid);
    // 每25秒发向后台发送一个东西,知道前后台在链接,避免脱机或掉线 - 告诉我在；其实可以删掉~！！
    dsq = setInterval(() => {
      websocket.send(uid);
    }, 5000);
    // 接收消息
    websocket.onmessage = function (event) {
      store.state.websocketData = event.data;
    }
    setTimeout(() => {
      websocket.close();
      clearInterval(dsq)
    }, 10000)
  }
  // 关闭websocket
  websocket.onclose = function (event) {
    clearInterval(dsq)
    connectWebsocket();
  }
  // 通信发生错误
  websocket.onerror = function () {
    websocket.close();
  }
  // 页面离开/或者刷新时触发该事件
  window.onbeforeunload = function () {
    websocket.onclose = function () { }; //首先禁用onclose处理程序
    websocket.close();
  }
}
// 校验上传文件的大小
export function acceptTypeImg(e) {
  const isLt2M = e.file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    return true;
  } else {
    return false;
  }
}

