# vue-kbone-ui

使用 vue 多端开发(小程序和Web)，基于 [kbone](https://github.com/wechat-miniprogram/kbone) 的 element 和 render。

## 开发

* Web 端：直接浏览器访问 localhost:8080/ 即可看到效果。

```
npm run web
```

* 小程序端：使用开发者工具打开 dist/mp 目录即可。

```
npm run mp
```

## 构建

* Web 端：构建完成会生成 dist/web 目录

```
npm run build
```

* 小程序端：构建完成会生成 dist/mp 目录

```
npm run build:mp
```

## 小程序端打开

需要先进入 dist/mp 目录执行 `npm install` 安装相关的依赖包，然后用开发者工具打开 dist/mp 目录后再进行 npm 构建（关于 npm 构建可[点此查看官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)）。

## 目录说明

此模板 Web 端使用单入口，通过 vue-router + 动态 import 的方式来运行；小程序端则按照业务分拆成多个页面，同属一个业务的页面则通过 vue-router 来组织。

```
├─ build
│  ├─ miniprogram.config.js  // mp-webpack-plugin 配置
│  ├─ webpack.base.config.js // Web 端构建基础配置
│  ├─ webpack.dev.config.js  // Web 端构建开发环境配置
│  ├─ webpack.mp.config.js   // 小程序端构建配置
│  └─ webpack.prod.config.js // Web 端构建生产环境配置
├─ dist
│  ├─ mp                     // 小程序端目标代码目录，使用微信开发者工具打开，用于生产环境
│  └─ web                    // web 端编译出的文件，用于生产环境
├─ src
│  ├─ common                 // 通用组件
│  ├─ mp                     // 小程序端入口目录
│  │  ├─ home                // 小程序端 home 页面
│  │  │  └─ main.mp.js       // 小程序端入口文件
│  │  └─ other               // 小程序端 other 页面
│  │     └─ main.mp.js       // 小程序端入口文件
│  ├─ detail                 // detail 页面
│  ├─ home                   // home 页面
│  ├─ list                   // list 页面
│  ├─ router                 // vue-router 路由定义
│  ├─ store                  // vuex 相关目录
│  ├─ App.vue                // Web 端入口主视图
│  └─ main.js                // Web 端入口文件
└─ index.html                // Web 端入口模板
```

## 其他说明

如果要使用 ts，则在 vue 的 script 标签上加上 `lang="ts"`，具体可参考 src/list/Index.vue。如果要使用 reduce-loader，就不能使用 ts，因为 ts 目前没有支持内联 loader。

## 环境切换
* .env 设置 VUE_APP_DOMAIN 为要采用的地址 
* webpack.mp.config 注意修改 publicPath （注意将所有图片上传到对应目录）

## 小程序
四大固定页面 刷新机制 （从其他页面后退后应重新进行生命周期）
## 兼容手机
*所有页面添加头部组件
所有页面添加底部导航
小程序与手机端界面比对调整 修改样式解决兼容问题
用户中心等所有带有输入模块的样式兼容问题
手机端登录注册要调整（无法使用微信登录） wx.login  wx.getUserProfile
* 文件上传模块修改 wx.uploadFile 
* canvas报错  canvas.$$prepare()
手机端下拉刷新 上拉加载

## 待续 
* 获取微信手机没做
* .sync机制下会保留之前填写的内容
