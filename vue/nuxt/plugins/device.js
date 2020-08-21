export default function ({ req }, inject) {
  // 取得浏览器的userAgent字符串
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent || "";
  // 判断当前浏览器
  const browser = {
    // 移动/pc终端浏览器版本信息
    versions: (function () {
      return {
        // 判断浏览器内核
        trident: userAgent.includes("Trident"), // IE内核
        webKit: userAgent.includes("AppleWebKit"), // webkit内核/苹果、谷歌内核
        gecko: userAgent.includes("Firefox"), // 火狐内核
        presto: userAgent.includes("Presto"), // opera内核
        // 判断是否移动端  (满足任一就应跳转到手机端)
        mobile: /AppleWebKit.*Mobile.*/.test(userAgent), // windows移动终端
        ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(userAgent), // ios移动终端
        android: userAgent.includes("Android") || userAgent.includes("Linux"), // android终端或者uc浏览器
        iPhone: userAgent.includes("iPhone"), // 是否为iPhone或者QQHD浏览器
        iPad: userAgent.includes("iPad"), // 是否iPad
        // 判断是否微信qq
        weixin: userAgent.includes("MicroMessenger"), // 是否微信
        qq: userAgent.match(/\sQQ/i) === " qq" // 是否QQ
      };
    })(),
    // 判断ie几
    ieNum: (function () {
      const isIE = userAgent.includes("Trident"); // 判断是否IE浏览器
      if (isIE) {
        if (!userAgent.includes("MSIE")) {
          return "IE11";
        }
        const fIEVersion = parseFloat(userAgent.match(/MSIE (\d+\.\d+)/)[1]);
        if (fIEVersion === 7) {
          return "IE7";
        } else if (fIEVersion === 8) {
          return "IE8";
        } else if (fIEVersion === 9) {
          return "IE9";
        } else if (fIEVersion === 10) {
          return "IE10";
        } else {
          return "0"; // IE版本过低
        }
      } else {
        return false;
      }
    })()
  };

  // Inject to context as $browser
  inject("browser", browser);
}
