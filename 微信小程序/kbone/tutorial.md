# 参考网站
* kbone
https://wechat-miniprogram.github.io/kbone/docs/
https://wechat-miniprogram.github.io/kbone/docs/config/
* kbone-ui
https://wechat-miniprogram.github.io/kbone/docs/kbone-ui/
* weui
https://wechat-miniprogram.github.io/weui/docs/other.html#%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81
* 小程序api
https://developers.weixin.qq.com/miniprogram/dev/api/

# web端 和 小程序端差异
## 页面跳转
### 小程序多页下(单页和web端同使用vue-router)
```
  不同页面切换使用a标签 同一页面下可以使用 router-link
  不同页面切换js: location.href 打开新页面 window.open  同一页面使用 $router.push
  总结
      请使用a标签
      请使用location.href 打开新页面 window.open

```
### 小程序原生使用方式
```
    navigateBack
        if (process.env.isMiniprogram) {
          wx.navigateBack();
        }

    被替代(废弃)
    wx.navigateTo 相当于 window.open / a标签在新窗口打开
    wx.redirectTo wx.switchTab  wx.reLaunch 整合一起相当于 location.href / a标签当前窗口打开
```

* 小程序端 返回上一个页面  wx.navigateBack(); 一直在一个页面中跳转无效
## 代码精简（删除小程序端不需要的）
* js：reduce-loader
```
  import ActionSheet from 'reduce-loader!./action-sheet' // 使用行内 loader，剔除 action-sheet 文件的引入
```
* dom：vue-improve-loader
```
  <div check-reduce>
    <p>这段话不会在小程序里显示</p>
    <p>在构建的时候就会被 vue-improve-loader 给干掉了</p>
  </div>
```
* css：.miniprogram-root
```
  .miniprogram-root {
    .for-web {
      display: none;
    }
  }
```
## page.js中方法
dom/bom 扩展 API
* https://wechat-miniprogram.github.io/kbone/docs/domextend/
```
    window.addEventListener("wxload", query =>
      console.log("page1 wxload", query)
    );
    window.addEventListener("wxshow", () => console.log("page1 wxshow"));
    window.addEventListener("wxready", () => console.log("page1 wxready"));
    window.addEventListener("wxhide", () => console.log("page1 wxhide"));
    window.addEventListener("wxunload", () => console.log("page1 wxunload"));
```
## 批量设置节点属性
*如 video 节点的 controls 属性，在小程序环境中默认为 true，如果想要设置成 false 会发现无论如何都设置不上去
```
  <video :kbone-attribute-map="{controls: false}"></video>
```



# 动画
https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html
## css动画
animatecss使用
```
    https://wechat-miniprogram.github.io/kbone/docs/guide/advanced.html#%E4%BA%8B%E4%BB%B6%E7%B3%BB%E7%BB%9F%E6%89%A9%E5%B1%95
    动画过程中，如需使用 bindtransitionend bindanimationstart bindanimationiteration bindanimationend 来监听动画事件。
    必须通过 wx-animation 将动画元素包裹
      <wx-animation
        ref="mask"
        @animationstart="log('animation start')"
        @animationiteration="log('animation iteration')"
        @animationend="log('animation end')"
      ></wx-animation>
```
## 关键帧动画
```
    zoomout({ ele, cbk, duration = 400 }) {
      // 获取元素子元素的实际高度
      ele.children[0].$$getBoundingClientRect().then(({ height }) => {
        const keyframes = [
          {
            height: height + "px",
            ease: "ease-out"
          },
          {
            height: 0,
            ease: "ease-out"
          }
        ];
        ele.$$animate(keyframes, duration, cbk);
      });
    },
```

# echarts
https://github.com/Tencent/kbone/tree/develop/examples/demo20
