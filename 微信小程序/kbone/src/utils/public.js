// 显示消息弹框
const showMessage = ({ type, message }) => {
  // 小程序端
  if (process.env.isMiniprogram) {
    wx.showToast({
      title: message,
      icon: type,
      duration: 3 * 1000
    });
  } else {
    // //web端
    // Message({
    //   message: message,
    //   type,
    //   duration: 3 * 1000
    // });
  }
};
showMessage.error = (message) => {
  // 小程序端
  if (process.env.isMiniprogram) {
    wx.showToast({
      title: message,
      icon: "error",
      duration: 3 * 1000
    });
  } else {
  }
};
showMessage.success = (message) => {
  // 小程序端
  if (process.env.isMiniprogram) {
    wx.showToast({
      title: message,
      icon: "success",
      duration: 3 * 1000
    });
  } else {
  }
};

const cookies = {
  set(key, value, expires) {
    // 小程序端
    if (process.env.isMiniprogram) {
      return wx.setStorageSync(key, {
        value,
        // 额外添加有效期字段
        expires,
        time: Date.now()
      });
    } else {
    }
  },
  get(key) {
    // 小程序端
    if (process.env.isMiniprogram) {
      const { value = "", expires, time } = wx.getStorageSync(key) || {};
      // 如果没有设置有效期字段  或者 如果没超出过期时间
      if (!expires || Date.now() - time < expires) {
        return value;
      } else {
        // 超过有效期 移除
        this.remove(key);
        return "";
      }
    } else {
    }
  },
  remove(key) {
    // 小程序端
    if (process.env.isMiniprogram) {
      return wx.removeStorageSync(key);
    } else {
    }
  }
};
const createFieldImg = (name) => {
  const dict = {
    工业软件与仿真: {
      n: require("@/assets/images/field_icon1.png"),
      a: require("@/assets/images/field_icon_a1.png")
    },
    核心部件与操作系统: {
      n: require("@/assets/images/field_icon2.png"),
      a: require("@/assets/images/field_icon_a2.png")
    },
    电子信息与传感器: {
      n: require("@/assets/images/field_icon3.png"),
      a: require("@/assets/images/field_icon_a3.png")
    },
    工业互联网与通信: {
      n: require("@/assets/images/field_icon4.png"),
      a: require("@/assets/images/field_icon_a4.png")
    },
    先进制造与自动化: {
      n: require("@/assets/images/field_icon5.png"),
      a: require("@/assets/images/field_icon_a5.png")
    },
    人工智能与交互技术: {
      n: require("@/assets/images/field_icon6.png"),
      a: require("@/assets/images/field_icon_a6.png")
    }
  };
  return (
    dict[name] || {
      n: require("@/assets/images/field_icon7.png"),
      a: require("@/assets/images/field_icon_a7.png")
    }
  );
};
export { showMessage, cookies, createFieldImg };
