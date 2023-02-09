export default {
  // 更新用户信息
  updateInfo(state, data) {
    state.info = data || {};
  },
  // 更新验证老手机的token
  updateOldPhoneToken(state, data) {
    state.oldPhoneToken = data || "";
  }
};
