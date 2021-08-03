export default {
  // 检验真实姓名
  checkChineseName(str) {
    if (/^(?:[\u4E00-\u9FA5·]{2,16})$/.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 校验电话
  checkPhone(str) {
    if (/^1[3-9]\d{9}$/.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  checkTelephone(str) {
    if (/(^0\d{2}-\d{8}$)|(^0\d{3}-\d{7}$)/.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 校验邮箱
  checkEmail(str) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  // 检验专利号
  checkPatentNumber(str) {
    const next2002 = str.match(/(\d{4}[12389]\d{7})\.?(\d|X)/); // 2002之后
    const prev2002 = str.match(/(\d{2}[12389]\d{5})\.?(\d|X)/); // 2002之前
    const parity = function(arr) {
      let code = 1;
      const parityBit =
        arr[1].split("").reduce(function(acc, cur) {
          code++;
          code = code === 10 ? 2 : code;
          return acc + cur * code;
        }, 0) % 11;
      const lastBit = parityBit === 10 ? "X" : parityBit.toString();
      return lastBit === arr[2];
    };
    if (next2002) {
      return parity(next2002);
    }
    if (prev2002) {
      return parity(prev2002);
    }
    return false;
  },
  /* 验证18位营业执照 */
  checkTradingCertificate(code) {
    const reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
    if (code.length !== 18 || reg.test(code) === false) {
      return false;
    }
    /* 验证第18位 */
    // 不用I、O、S、V、Z
    const str = "0123456789ABCDEFGHJKLMNPQRTUWXY";
    const ws = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
    const codes = [];
    let i;
    let sum = 0;
    let index;

    codes[0] = code.slice(0, code.length - 1);
    codes[1] = code.slice(code.length - 1, code.length);

    for (i = 0; i < 17; i++) {
      sum += str.indexOf(codes[0].charAt(i)) * ws[i];
    }

    index = 31 - (sum % 31);
    index === 31 && (index = 0);

    /* 18位 */
    const c18 = str.charAt(index);

    return c18 === codes[1];
  },
  checkCard: {
    vcity: {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    },
    // 1.检查号码是否符合规范，包括长度，类型
    isCardNo(obj) {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      const reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
      if (!reg.test(obj)) {
        return false;
      }
      return true;
    },
    // 2.取身份证前两位,校验省份
    checkProvince(obj) {
      const province = obj.substr(0, 2);
      if (this.vcity[province] === undefined) {
        return false;
      }
      return true;
    },
    // 3.检查生日是否正确
    checkBirthday(obj) {
      const len = obj.length;
      // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
      if (len === 15) {
        const reFifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        const arrData = obj.match(reFifteen);
        const year = arrData[2];
        const month = arrData[3];
        const day = arrData[4];
        const birthday = new Date("19" + year + "/" + month + "/" + day);
        return this.verifyBirthday("19" + year, month, day, birthday);
      }
      // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
      if (len === 18) {
        const reEighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        const arrData = obj.match(reEighteen);
        const year = arrData[2];
        const month = arrData[3];
        const day = arrData[4];
        const birthday = new Date(year + "/" + month + "/" + day);
        return this.verifyBirthday(year, month, day, birthday);
      }
      return false;
    },
    // 3.1 校验日期
    verifyBirthday(year, month, day, birthday) {
      const now = new Date();
      const nowYear = now.getFullYear();
      // 年月日是否合理
      if (
        birthday.getFullYear() === parseInt(year) &&
        birthday.getMonth() + 1 === parseInt(month) &&
        birthday.getDate() === parseInt(day)
      ) {
        // 判断年份的范围（3岁到100岁之间)
        const time = nowYear - year;
        if (time >= 0 && time <= 130) {
          return true;
        }
        return false;
      }
      return false;
    },
    // 4.校验位的检测
    checkParity(obj) {
      // 15位转18位
      obj = this.changeFivteenToEighteen(obj);
      const len = obj.length;
      if (len === 18) {
        const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const arrCh = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
        let cardTemp = 0;
        let i;
        for (i = 0; i < 17; i++) {
          cardTemp += obj.substr(i, 1) * arrInt[i];
          // console.log(cardTemp + "" + i)
        }
        const valnum = arrCh[cardTemp % 11];
        if (valnum === obj.substr(17, 1)) {
          return true;
        }
        return false;
      }
      return false;
    },
    // 4.1 15位转18位身份证号
    changeFivteenToEighteen(obj) {
      if (obj.length === 15) {
        const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const arrCh = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
        let cardTemp = 0;
        let i;
        obj = obj.substr(0, 6) + "19" + obj.substr(6, obj.length - 6);
        for (i = 0; i < 17; i++) {
          cardTemp += obj.substr(i, 1) * arrInt[i];
        }
        obj += arrCh[cardTemp % 11];
        return obj;
      }
      return obj;
    },
    init(obj) {
      // 字符串
      // 校验长度，类型
      if (!this.isCardNo(obj)) {
        return false;
      }
      // 检查省份
      if (!this.checkProvince(obj)) {
        return false;
      }
      // 校验生日
      if (!this.checkBirthday(obj)) {
        return false;
      }
      // 检验位的检测
      if (!this.checkParity(obj)) {
        return false;
      }
      return true;
    }
  }
};
