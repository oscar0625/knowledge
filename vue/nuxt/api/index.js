import homepage from "./homepage";

export default function ({ $axios }, inject) {
  // 所有请求集合
  const request = {
    homepage: homepage($axios)
  };

  // 请求的方法
  const api = (module, method, params) => {
    return request[module][method](params);
  };
  // Inject to context as $api
  inject("api", api);
}
