import axios from "axios";
import { storage } from "./public";
import { Message } from "element-ui";
import router from "../router";

//提示框
let timer = null;
const tip = msg => {
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    Message({
      message: msg,
      type: "error",
      duration: 3 * 1000
    });
  }, 500);
};

//创建axios实例
const instance = axios.create({
  // 环境的切换
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.VUE_APP_DEV_DOMAIN
      : process.env.VUE_APP_DOMAIN,
  responseType: "json", // default
  //请求超时时间
  timeout: 0
});

//设置Content-Type 默认情况下，axios将JavaScript对象序列化为JSON。
instance.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";

//取消请求
const CancelToken = axios.CancelToken;
//将正在请求的地址存储起来
const pending = new Map();
const removePending = config => {
  const { method, url, baseURL } = config,
    reg = new RegExp(baseURL, "i"),
    key = `${url.replace(reg, "")}&${method}`;
  pending.delete(key);
};
// 阻止重复请求同一接口
const preventRepeatRequest = (config, c) => {
  const { method, url, baseURL } = config,
    reg = new RegExp(baseURL, "i"),
    key = `${url.replace(reg, "")}&${method}`;
  if (pending.has(key)) {
    c();
  } else {
    pending.set(key, c);
  }
};

//请求拦截器
instance.interceptors.request.use(
  config => {
    //添加时间戳
    if (config.method == "get") {
      config.params = {
        ...config.params,
        _t: Date.parse(new Date()) / 1000
      };
    }
    // 阻止重复请求同一接口
    config.cancelToken =
      config.cancelToken ||
      new CancelToken(c => {
        preventRepeatRequest(config, c);
      });
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = storage.getSession("token");
    token && (config.headers.Authorization = "Bearer " + token);
    return config;
  },
  error => {
    // eslint-disable-next-line no-console
    console.log("request_error"); // for debug
    return Promise.reject(error);
  }
);

//响应拦截器
instance.interceptors.response.use(
  response => {
    // 请求完成后删除pending
    removePending(response.config);
    if (response.status === 200) {
      //第二种登陆失效的情况
      if (response.data.code === 1003) {
        tip(response.data.message);
        router.push("/");
        return Promise.reject(response.data);
      } else {
        //正确 对响应数据做点什么
        return response.data;
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("response_error_not_200"); // for debug
      return Promise.reject(response);
    }
  },
  error => {
    const { config, response, message } = error;
    // 请求完成后删除pending
    config && removePending(config);
    if (response) {
      // 有response 状态码判断
      switch (response.status) {
        case 401:
          tip("登录信息失效，请重新登录");
          router.push("/");
          break;
        case 404:
          tip("请求的资源不存在");
          break;
        default:
          tip(message);
      }
    } else {
      //没有response 超时 断网 取消请求等情况
      if (message) {
        tip(message);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

// 取消所有正在请求的接口 并清空pending （在路由跳转时调用）
export const clearPending = () => {
  for (let cancel of pending.values()) {
    cancel();
  }
  pending.clear();
};
