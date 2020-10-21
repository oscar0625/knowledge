import { Message } from "element-ui";
// 提示框
let timer = null;
const tip = (msg) => {
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    Message({
      message: msg,
      type: "error",
      duration: 3 * 1000
    });
  }, 500);
};
// // 取消请求部分
// // 将正在请求的地址存储起来
// const pending = new Map();
// const createPendingKey = (config) => {
//   const { method, url, baseURL } = config;
//   const reg = new RegExp(baseURL, "i");
//   const key = `${url.replace(reg, "")}&${method}`;
//   return key;
// };
// const removePending = (config) => {
//   const key = createPendingKey(config);
//   pending.delete(key);
// };
// // 阻止重复请求同一接口
// const preventRepeatRequest = (config, c) => {
//   const key = createPendingKey(config);
//   if (pending.has(key)) {
//     c();
//   } else {
//     pending.set(key, c);
//   }
// };

export default function ({ app, $axios, redirect }) {
  // 公共基础配置
  $axios.defaults.timeout = 0;
  $axios.defaults.responseType = "json"; // default
  // 设置Content-Type 默认情况下，axios将JavaScript对象序列化为JSON。
  $axios.setHeader("Content-Type", "application/json;charset=UTF-8", ["post"]);

  // // 取消请求构造函数
  // const { CancelToken } = $axios;
  // 请求拦截器
  $axios.onRequest((config) => {
    // 添加时间戳
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.parse(new Date()) / 1000
      };
    }
    // // 阻止重复请求同一接口
    // config.cancelToken =
    //   config.cancelToken ||
    //   new CancelToken((c) => {
    //     preventRepeatRequest(config, c);
    //   });
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = app.$cookies.get("token");
    token && (config.headers.Authorization = "Bearer " + token);
    return config;
  });

  // 响应成功拦截器
  $axios.onResponse((response) => {
    // // 请求完成后删除pending
    // removePending(response.config);
    if (response.status === 200) {
      // 第二种登录失效的情况
      if (response.data.code === 1003) {
        tip(response.data.message);
        redirect("/login");
        return Promise.reject(response.data);
      } else {
        // 正确 对响应数据做点什么
        return response.data;
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("response_error_not_200"); // for debug
      return Promise.reject(response);
    }
  });

  // 响应失败拦截器
  $axios.onError((error) => {
    const { response, message } = error;
    // // 请求完成后删除pending
    // config && removePending(config);
    if (response) {
      // 有response 状态码判断
      switch (response.status) {
        case 401:
          tip("登录信息失效，请重新登录");
          redirect("/login");
          break;
        case 404:
          tip("请求的资源不存在");
          break;
        default:
          tip(message);
      }
    } else {
      // 没有response 超时 断网 取消请求等情况
      message && tip(message);
    }
    return Promise.reject(error);
  });
}

// // 取消所有正在请求的接口 并清空pending （在路由跳转时调用）
// export const clearPending = () => {
//   for (const cancel of pending.values()) {
//     cancel();
//   }
//   pending.clear();
// };
