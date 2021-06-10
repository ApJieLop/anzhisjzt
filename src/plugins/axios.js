import Vue from "vue";
import axios from "axios";
import store from "../store/index";
// import qs from "qs";
import { Message, Loading, MessageBox } from 'element-ui';
import router from '../router';
import AES from '../utils/aes';

// 响应时间
axios.defaults.timeout = 15 * 1000;
// 配置请求头
axios.defaults.headers.post["Content-Type"] = "application/json";
// 静态资源
Vue.prototype.$static = "";

// Vue.prototype.$baseUrl = baseURL;
Vue.prototype.$imgUrl = "http://kfqapp.qetdz.com/img?id=";
Vue.prototype.$picUrl = "http://kfqcdn.qetdz.com/pic";

let loadingCount = 0;
// 配置接口地址
// axios.defaults.baseURL = baseURL;

// 提示
let loadingInstance;
function showLoadings() {
  loadingCount++
  loadingInstance = Loading.service({
    lock: true,
    text: "数据加载中，请稍后...",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)"
  });
}
// 用于上传文件专用
let urLprod = 'https://anzhi.bjsrxx.com/server-spark';
let urLtest = '/server-spark';
// let urLdev = "http://192.168.100.219:8080/server-spark"; // 张义
// let urLdev = "http://192.168.100.81:8080/server-spark";  // 熊仔
// let urLdev = "http://192.168.100.77:8080/server-spark";  // 程志
// let urLdev = "http://192.168.100.99:8080/server-spark";  // 王玉龙
// let urLdev = "http://192.168.100.93:8082/server-spark";  // 赵可心
// let urLdev = "http://192.168.100.82:8080/server-spark";  // 贾琦
// let urLdev = "http://192.168.100.239:8080/server-spark"; // 苏松楠
// let urLdev = "http://192.168.100.54:8080/server-spark";  // 谭永强
// let urLdev = "http://192.168.3.112:9003/server-spark";   // 石家庄服务器
let urLdev = "http://192.168.3.112:9000/server-spark";   // 测试服务 - 暂时
// let urLdev = "http://192.168.3.112:9001/server-spark";   // 测试服务
// let urLdev = "http://192.168.100.238:8088/server-spark";   // 刘克正
const urlApi =
  process.env.VUE_APP_URL === "development"
    ? urLtest
    : process.env.NODE_ENV === "development"
      ? urLdev
      : urLprod;
// POST传参序列化(添加请求拦截器)
function interceptorsRequest(fetchd, status = true, Requesttype) {
  fetchd.interceptors.request.use(
    config => {
      let prod = 'https://anzhi.bjsrxx.com'; // 生产环境
      let test = ''; // 测试环境
      let dev = ''; // 本地环境
      let urlA = '/anzhi-singularity-server'; // 安知项目服务
      let urlB = '/question-lib'; // 安知题库服务;
      let urlC = '/anzhi-live-server'; // 安知直播服务;
      
      if (Requesttype == 2) {
        prod += urlB;
        test = urlB;
        // dev = "http://192.168.100.219:8080/question-lib"; // 张义
        // dev = "http://192.168.100.81:8080/question-lib";  // 熊仔
        // dev = "http://192.168.100.77:9090/question-lib";  // 程志
        // dev = "http://192.168.100.99:9527/question-lib";  // 王玉龙
        // dev = "http://192.168.100.93:8080/question-lib";  // 赵可心
        // dev = "http://192.168.100.22:8090/question-lib";  // 赵可心
        // dev = "http://192.168.100.238:8090/question-lib";  // 刘克正
        // dev = "http://192.168.100.82:8080/question-lib";  // 贾琦
        // dev = "http://192.168.3.112:9003/question-lib";   // 石家庄服务器
        dev = "http://192.168.3.112:9000/question-lib";   // 测试服务 - 暂时
        // dev = "http://192.168.3.112:9007/question-lib";   // 测试服务
        // dev = "http://app-api.sunreal.io/question-lib" // 王玉龙
        // dev = "http://questionlibserver.sunreal.io/question-lib";   // 测试服务
      } else if (Requesttype == 3 ){
        prod += urlC;
        test = urlC;
        // dev = "http://192.168.100.219:8080/anzhi-live-server"; // 张义
        // dev = "http://192.168.100.81:8080/anzhi-live-server";  // 熊仔/*  */
        // dev = "http://192.168.100.22:8080/anzhi-live-server";  // 张子航
        // dev = "http://192.168.100.99:8091/anzhi-live-server";  // 王玉龙
        // dev = "http://192.168.100.93:8082/anzhi-live-server";  // 赵可心
        // dev = "http://192.168.100.82:8080/anzhi-live-server";  // 贾琦
        // dev = "http://192.168.3.112:9003/anzhi-live-server";   // 石家庄服务器
        // dev = "http://192.168.100.238:8080/server-spark";  // 刘克正
        dev = "http://192.168.3.112:9000/anzhi-live-server";   // 测试服务 - 暂时
        // dev = "http://192.168.3.112:9001/anzhi-live-server";   // 测试服务
        // dev = "http://app-api.sunreal.io/anzhi-live-server" // 王玉龙
        // dev = "http://test.sunreal.io/anzhi-live-server" // 测试
        // dev = "http://questionlibserver.sunreal.io/anzhi-live-server" // 测试
      } else {
        prod += urlA;
        test = urlA;
        // dev = "http://192.168.100.219:8080/server-spark"; // 张义
        // dev = "http://192.168.100.81:8081/server-spark";  // 熊仔/*  */
        // dev = "http://192.168.100.77:8080/server-spark";  // 程志
        // dev = "http://192.168.100.99:8090/server-spark";  // 王玉龙
        // dev = "http://192.168.100.22:8080/server-spark";  // 张子航
        // dev = "http://192.168.100.93:8082/server-spark";  // 赵可心
        // dev = "http://192.168.100.82:8080/server-spark";  // 贾琦
        // dev = "http://192.168.100.238:8080/server-spark";  // 刘克正
        // dev = "http://192.168.3.112:9003/server-spark";   // 石家庄服务器
        dev = "http://192.168.3.112:9000/anzhi-singularity-server";   // 测试服务 - 暂时
        // dev = "http://192.168.3.112:9001/server-spark";   // 测试服务
        // dev = "http://app-api.sunreal.io/server-spark" // 王玉龙
        // dev = "http://test.sunreal.io/server-spark" // 测试
        // dev = "http://questionlibserver.sunreal.io/server-spark" // 测试
      }

      const baseURL =
        process.env.VUE_APP_URL === "development"
          ? test
          : process.env.NODE_ENV === "development"
            ? dev
            : prod;

      config.baseURL = baseURL;
      if (config.url != '/login' && !sessionStorage.getItem("token") && config.url != '/logout') {
        //判断路由页面不需要登录信息的，true，不需要，不传或者false，需要登录信息
        if (!config.data.getInfoState) {
          MessageBox.alert('您的身份信息已失效，请重新登录获取身份信息', '提示', {
            confirmButtonText: '重新登录',
          }).then(() => {
            loginOnce = true;
            router.replace({ name: 'login' });
          }).catch(() => {
            loginOnce = true;
          });
        } else {
          return config;
        }
      } else {
        if (status) showLoadings();
        if (config.method === "post") {
          config.data = JSON.stringify(config.data);
        }
        if(config.url == '/login'){
          // 加密
          config.data = config.data
        }
        return config;
      }
    },
    err => {
      loadingInstance.close();
      if (status) {
        Message.error("请求失败，请稍后再试");
        return Promise.reject(err);
      }
    }
  );
}
let loginOnce = true;
// 返回状态判断(添加响应拦截器)
function interceptorsResponse(fetchd, status = true, timeout = 3000, fetchParams = {}) {
  fetchd.interceptors.response.use(
    res => {
      if (loadingInstance) {
        if (loadingCount > 0) {
          loadingCount--
        }
        if (loadingCount == 0) {
          loadingInstance.close();
        }
      }
      if (res.status === 200) {
        const retData = res.data || {};
        // status 直返 手动判断code
        if (retData.status === "0" || !status) {
          // 返回数据格式
          const dataType = (fetchParams || {}).dataType || "text";
          if (dataType === "text") {
            // longId 加 ""
            res = res.request.responseText;
            // res = res.replace(/:\s?(\d{16,})/g, ':"$1"');
            res = JSON.parse(res);
            return res;
          } else {
            return retData;
          }
        } else if (retData.status === '1') {
          const dataType = (fetchParams || {}).dataType || "text";
          if (dataType === "text") {
            res = res.request.responseText;
            res = JSON.parse(res);
            return res;
          } else {
            return retData;
          }
        } else if (retData.status === '666' && loginOnce) {
          loginOnce = false;
          MessageBox.alert(retData.msg || '您的身份信息已失效，请重新登录获取身份信息', '提示', {
            confirmButtonText: '重新登录',
          }).then(() => {
            loginOnce = true;
            router.replace({ name: 'login' });
            return Promise.reject(res);
          }).catch(() => {
            loginOnce = true;
          });
          // 重新登录
        } else {
          if (status) {
            Message.error({
              message: retData.message,
              duration: timeout,
              dangerouslyUseHTMLString: true,
            });
            return Promise.reject(res);
          }
        }
      } else {
        if (status) Message.error("请求访问失败，code：" + res.status);
        if (status) return Promise.reject(res);
      }
    },
    err => {
      console.log(err)
      if (loadingInstance) loadingInstance.close();
      if (status) {
        Message.error("服务访问失败，请稍后再试");
        return Promise.reject(err);
      }
    }
  );
}

// GET
export function fetchGet(url, params, status = true) {
  return fetchInit(url, params, status, 3000, { type: "get" });
}
// POST
export function fetchPost(url, params, timeout = 3000, status = true, Requesttype = 1) {
  return fetchInit(url, params, status, timeout, { type: "post" }, Requesttype);
}
// PUT
export function fetchPut(url, params, status = true) {
  return fetchInit(url, params, status, 3000, { type: "put" });
}
// DELETE
export function fetchDelete(url, params, status = true) {
  return fetchInit(url, params, status, 3000, { type: "delete" });
}
// POST - FormData
export function fetchPostformat(url, params) {
  showLoadings();
  return fetchInit(url, params, true, 3000, {
    request: "no",
    axiosPs: {
      timeout: 60000
    }
  });
}

const fetchInit = (url, params, status = true, timeout = 3000, fetchPs = {}, Requesttype) => {
  const fetchd = axios.create({
    ...(fetchPs.axiosPs || {}),
    headers: {
      common: {
        Authorization: store.state.token || ""
      }
    }
  });
  const request = fetchPs.request || true;
  if (request === true) {
    interceptorsRequest(fetchd, status, Requesttype);
  }
  interceptorsResponse(fetchd, status, timeout);
  if (request === true) {
    return fetchCreate(fetchd, url, params, fetchPs.type);
  } else {
    return fetchCreate(fetchd, urlApi + url, params, fetchPs.type);
  }
};
const fetchCreate = (fetchd, url, params, type = "post") => {
  return new Promise((resolve, reject) => {
    if (type === "get" || type === "delete") {
      params = {
        params
      };
    }
    fetchd[type](url, params)
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      )
      .catch(err => {
        reject(err.data);
      });
  });
};

Vue.prototype.$get = fetchGet;
Vue.prototype.$post = fetchPost;
Vue.prototype.$put = fetchPut;
Vue.prototype.$delete = fetchDelete;
Vue.prototype.$Postformat = fetchPostformat;
