export default {
  // 获取用户信息接口
  getInfo({ commit }, app) {
    return app.$api("user", "getUserInfo", {}).then((res) => {
      return new Promise((resolve, reject) => {
        if (res.code === 0) {
          commit("updateInfo", res.userAndToken);
          resolve(res.userAndToken);
        } else {
          app.$cookies.remove("token");
        }
      });
    });
  }
};
