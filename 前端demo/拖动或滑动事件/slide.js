// https://blog.csdn.net/iwasdream/article/details/33741859

/*
 * 滑动事件
 * */
function CustomSlide(params) {
  const {
    ele = document,
    limit = 0.5,
    slideUp = function() {},
    slideDown = function() {},
    slideLeft = function() {},
    slideRight = function() {}
  } = params;
  this.ele = ele; //目标元素
  this.limit = limit; //触发滑动的临界速度
  this.slideUp = slideUp;
  this.slideDown = slideDown;
  this.slideLeft = slideLeft;
  this.slideRight = slideRight;

  this._state = [];
  this._down();
  this._up();
  this._leave();
}

CustomSlide.prototype = {
  //移动端事件
  _touchstart(e) {
    const time = new Date();
    this._state.push({
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: time
    });
  },
  _touchend(e) {
    //抬起时判断是否执行滑动事件
    const time = new Date();
    this._state.push({
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: time
    });
    this._isSlide();
  },
  //pc端事件
  _mousedown: function(e) {
    const time = new Date();
    this._state.push({
      x: e.clientX,
      y: e.clientY,
      time: time
    });
  },
  _mouseup(e) {
    //抬起时判断是否执行滑动事件
    const time = new Date();
    this._state.push({
      x: e.clientX,
      y: e.clientY,
      time: time
    });
    this._isSlide();
  },
  // 添加事件
  _down() {
    this.touchstartOff = e => {
      this._touchstart(e);
    };
    this.mousedownOff = e => {
      this._mousedown(e);
    };
    //触摸
    this.ele.addEventListener("touchstart", this.touchstartOff);
    //鼠标
    this.ele.addEventListener("mousedown", this.mousedownOff);
  },
  _up() {
    this.touchendOff = e => {
      this._touchend(e);
    };
    this.mouseupOff = e => {
      this._mouseup(e);
    };
    //触摸
    this.ele.addEventListener("touchend", this.touchendOff);
    //鼠标
    this.ele.addEventListener("mouseup", this.mouseupOff);
  },
  _leave() {
    this.touchcancelOff = e => {
      this._touchend(e);
    };
    this.mouseleaveOff = e => {
      this._mouseup(e);
    };
    //触摸
    this.ele.addEventListener("touchcancel", this.touchcancelOff);
    //鼠标
    this.ele.addEventListener("mouseleave", this.mouseleaveOff);
  },
  //返回角度
  _getSlideAngle(dx, dy) {
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  },
  //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：不判定为滑动
  _getSlideDirection(start, end) {
    const t = end.time - start.time;
    if (t === 0) return;

    const dy = start.y - end.y;
    const dx = end.x - start.x;
    const speedX = Math.abs(dx / t);
    const speedY = Math.abs(dy / t);
    const angle = this._getSlideAngle(dx, dy);
    let result = 0;

    if (angle >= 45 && angle < 135 && speedY > this.limit) {
      // console.log("向上");
      // console.log(speedY);
      result = 1;
    } else if (angle >= -135 && angle < -45 && speedY > this.limit) {
      // console.log("向下");
      // console.log(speedY);
      result = 2;
    } else if (angle >= -45 && angle < 45 && speedX > this.limit) {
      // console.log("向右");
      // console.log(speedX);
      result = 4;
    } else {
      if (speedX > this.limit) {
        // console.log("向左");
        // console.log(speedX);
        result = 3;
      }
    }

    return result;
  },
  //判断是否执行滑动事件
  _isSlide() {
    if (this._state.length < 2) return;
    const [start, end] = this._state.slice(-2);
    // 清空
    this._state = [];
    const direction = this._getSlideDirection(start, end);
    switch (direction) {
      case 1:
        this.slideUp();
        break;
      case 2:
        this.slideDown();
        break;
      case 3:
        this.slideLeft();
        break;
      case 4:
        this.slideRight();
        break;
      // case 0:
      //   alert("没滑动");
      //   break;
    }
  },
  //销毁
  destroy() {
    // 清空事件
    // 触摸
    this.ele.removeEventListener("touchstart", this.touchstartOff);
    this.ele.removeEventListener("touchend", this.touchendOff);
    this.ele.removeEventListener("touchcancel", this.touchcancelOff);
    // 鼠标
    this.ele.removeEventListener("mousedown", this.mousedownOff);
    this.ele.removeEventListener("mouseup", this.mouseupOff);
    this.ele.removeEventListener("mouseleave", this.mouseleaveOff);
  }
};

export default CustomSlide;
