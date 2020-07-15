class GVerify {
  constructor(options) {
    this.options = Object.assign(
      {
        // 默认options参数值
        id: "", // 容器Id
        canvasId: "verifyCanvas", // canvas的ID
        width: "100", // 默认canvas宽度
        height: "30" // 默认canvas高度
      },
      options
    );
    this._init();
  }

  _init() {
    const container = document.getElementById(this.options.id);
    const canvas = document.createElement("canvas");
    this.options.width =
      container.offsetWidth > 0 ? container.offsetWidth : this.options.width;
    this.options.height =
      container.offsetHeight > 0 ? container.offsetHeight : this.options.height;
    canvas.id = this.options.canvasId;
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    canvas.style.cursor = "pointer";
    container.appendChild(canvas);
    if (typeof this.options.click === "function") {
      canvas.onclick = this.options.click;
    }
    this.canvas = canvas;
  }

  setCode(code) {
    this.code = code;
    return this;
  }

  draw() {
    const canvas = this.canvas;
    const ctx = canvas.getContext("2d");
    const codeArr = [...this.code];
    ctx.textBaseline = "middle";
    ctx.fillStyle = this._randomColor(180, 240);
    ctx.fillRect(0, 0, this.options.width, this.options.height);

    // 绘制内容
    codeArr.map((txt, i) => {
      ctx.font =
        this._randomNum(this.options.height / 2, this.options.height) +
        "px SimHei"; // 随机生成字体大小
      ctx.fillStyle = this._randomColor(50, 160); // 随机生成字体颜色
      ctx.shadowOffsetX = this._randomNum(-3, 3);
      ctx.shadowOffsetY = this._randomNum(-3, 3);
      ctx.shadowBlur = this._randomNum(-3, 3);
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";

      const x = (this.options.width / 5) * i;
      const y = this.options.height / 2;
      const deg = this._randomNum(-30, 30);
      /** 设置旋转角度和坐标原点**/
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 20, 0);
      /** 恢复旋转角度和坐标原点**/
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    });

    /** 绘制干扰线**/
    // codeArr.map(() => {
    //   ctx.strokeStyle = this._randomColor(40, 180);
    //   ctx.beginPath();
    //   ctx.moveTo(
    //     this._randomNum(0, this.options.width),
    //     this._randomNum(0, this.options.height)
    //   );
    //   ctx.lineTo(
    //     this._randomNum(0, this.options.width),
    //     this._randomNum(0, this.options.height)
    //   );
    //   ctx.stroke();
    // });

    /** 绘制干扰点**/
    for (let i = 0; i < this.options.width / 10; i++) {
      ctx.fillStyle = this._randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
        this._randomNum(0, this.options.width),
        this._randomNum(0, this.options.height),
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    return this;
  }

  _randomColor(min, max) {
    const r = this._randomNum(min, max);
    const g = this._randomNum(min, max);
    const b = this._randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  _randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
export default GVerify;
