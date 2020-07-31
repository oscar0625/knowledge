https://juejin.im/post/5cc81e1a6fb9a032414f695b#heading-18
https://www.jianshu.com/p/840169ba92e6
# nuxt.js相关概述
```
    nuxt.js简单的说是Vue.js的通用框架，最常用的就是用来作SSR（服务器端渲染）

    SPA的缺点
        首屏渲染时间比较长：必须等待JavaScript加载完毕，并且执行完毕，才能渲染出首屏。
        SEO不友好：爬虫只能拿到一个div元素，认为页面是空的，不利于SEO。
    服务端渲染
        为了解决如上两个问题，出现了SSR解决方案，后端渲染出首屏的DOM结构返回，前端拿到内容带上首屏，后续的页面操作，再用单页面路由和渲染，称之为服务端渲染(SSR)。

    Nuxt.js是特点（优点）：
        基于Vue
        自动代码分层
        服务端渲染
        强大的路由功能，支持异步数据
        静态文件服务
        EcmaScript6和EcmaScript7的语法支持
        打包和压缩JavaScript和Css
        HTML头部标签管理
        本地开发支持热加载
        集成ESLint
        支持各种样式预编译器SASS、LESS等等
        支持HTTP/2推送
```

# 安装
npx create-nuxt-app <项目名>
注意 nodejs的版本太低会出现问题

# 配置
见 nuxt.config.js

# 路由
page目录下的所有*.vue文件会自动生成路由配置。根目录下有一个.nuxt文件夹，在里面可以看到一个router.js,这个文件夹下面就是Nuex生成好的路由信息。
```
    基础路由
    Nuxt.js 依据 pages 目录结构自动生成 vue-router 模块的路由配置。
    动态路由
    需要创建对应的以下划线作为前缀的 Vue 文件 或 目录。
    嵌套路由
    创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件。
    Warning: 别忘了在父组件(.vue文件) 内增加 <nuxt-child/> 用于显示子视图内容。
```
## 模板
定制化 Nuxt.js 默认的应用模板。在根目录下创建一个 app.html 的文件。
## transition
Nuxt.js 使用 Vue.js 的<transition>组件来实现路由切换时的过渡动效。
``` 
    在某个页面自定义过渡特效只要在该页面组件中配置 transition 字段
    也可以在nuxt.config.js设置  transition 字段
```
## layout
Nuxt.js 允许你扩展默认的布局，或在 layout 目录下创建自定义的布局。
```
    默认布局
        可通过添加 layouts/default.vue 文件来扩展应用的默认布局。
    自定义布局
        layouts 目录中的每个文件都将创建一个可通过页面组件中的 layout 属性访问的自定义布局。
        export default {
            layout: 'blog',
            // 或
            layout (context) {
                return 'blog'
            }
        }
```
错误页面 你可以通过编辑 layouts/error.vue 文件来定制化错误页面.   
## loading
提供了禁用特定页面上的默认加载进度条的选项。可以通过Configuration的加载选项全局禁用或自定义它，也可以通过将 loading 属性设置为 false 来禁用特定页面
## head
使用 head 方法设置当前页面的头部标签。

# 页面
## 生命周期
在 Vue 组件的生命周期内， 只有 beforeCreate 和 created 这两个方法会在 客户端和服务端被调用。其他生命周期函数仅在客户端被调用。
```
    export default {
        //服务端没有this使用app
        middleware () {}, //运行中间件(服务端)
        validate () {}, // 校验参数(服务端)
        asyncData () {}, //异步数据处理(服务端)
        fetch () {}, // store数据加载(服务端)
        //开始客户端渲染
        beforeCreate () {},  // 服务端和客户端都会执行
        created () {}, // 服务端和客户端都会执行
        //其他都只在客户端运行
    }
```
## middleware
中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。
```
    每一个中间件应放置在 middleware/ 目录。文件名的名称将成为中间件名称(middleware/auth.js将成为 auth 中间件)。
    中间件执行流程顺序：
        nuxt.config.js
        匹配布局
        匹配页面
```
## validate
Nuxt.js 可以让你在动态路由对应的页面组件中配置一个校验方法用于校验动态路由参数的有效性。如果校验方法返回的值不为 true， Nuxt.js 将自动加载显示 404 错误页面。
```
    export default {
        validate ({ params }) {
            // Must be a number
            return /^\d+$/.test(params.id)
        }
    }
```
## asyncData
Nuxt.js 扩展了 Vue.js，增加了一个叫 asyncData 的方法，使得我们可以在设置组件的数据之前能异步获取或处理数据。
asyncData方法会在组件 **(限于页面组件）** 每次加载之前被调用。它可以在服务端或路由更新之前被调用。 在这个方法被调用的时候，第一个参数被设定为当前页面的上下文对象，你可以利用 asyncData方法来获取数据，Nuxt.js 会将 asyncData 返回的数据融合组件 data 方法返回的数据一并返回给当前组件。
```
    export default {
        asyncData(context) {
            return Promise.resolve("oscar").then((res) => {
                return { name: res };
            });
        },
        //错误处理
         asyncData({ app, params, error }) {
            return app.$axios
            .get(`https://my-api/posts/${params.id}`)
            .then((res) => {
                return { title: res.data.title };
            })
            .catch((e) => {
                error({ statusCode: 404, message: "Post not found" });
            });
        }
    };
```
## fetch
待续 和vuex有关
## 上下文对象
在页面 validate asyncData fetch函数中都可以使用context。
middleware中的js也可一使用context。
layout中也可以使用context。
```
    { app, route, env, redirect, error } = context
```
## client-only
只在客户端渲染组件
```
    解决报错 [Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content.
    <client-only>
        <swiper>
            <swiper-slide>
                Only loaded and rendered in browser (client)
            </swiper-slide>
        </swiper>
  </client-only>
```

# Vuex状态树
待续

# 模块
## @nuxtjs/axios:
https://axios.nuxtjs.org/
``` 
    见 nuxt.config.js
    见 @/plugins/axios 
```
## cookie-universal-nuxt
```
    cookie-universal-nuxt
        app.$cookies.set(name, value, opts)
        app.$cookies.get(name, opts)
        app.$cookies.remove(name, opts)
        app.$cookies.removeAll()
```

# 插件
## 注入
```
    注入 Vue 实例
        将内容注入Vue实例，避免重复引入，在Vue原型上挂载注入一个函数，所有组件内都可以访问(不包含服务器端)。
    注入 context
        export default ({ app }, inject) => {
            app.myInjectedFunction = string => console.log('Okay, another function', string)
        }    
    同时注入
        export default ({ app }, inject) => {
            inject('myInjectedFunction', string => console.log('That was easy!', string))
        }    
```
## element-ui
```
    1.首先在plugins目录下增加文件 element-ui.js
    2.然后, 在 nuxt.config.js 内配置 plugins 如下：
        plugins: ["@/plugins/element-ui"]
    3.如果插件位于node_modules并导出模块，需要将其添加到transpile构建选项：    
        build: {
            transpile: ['vue-notifications']
        }
```

# 部署
```
    下载依赖
    $ npm install

    开发模式
    $ npm run dev

    服务端渲染应用部署
    $ npm run build
    $ npm run start

    静态应用部署
    $ npm run generate

    单页面应用程序部署 (SPA)
        将nuxt.config.js中的mode更改为spa。
        $ npm run build
```
## 部署到服务端过程
https://segmentfault.com/a/1190000014450967
https://segmentfault.com/a/1190000012774650
```
    0.首先配置nginx服务器
    1.在本地打包
        npm run build 打包应用
    2.将打包后的文件上传到服务器
        .nuxt
        static
        nuxt.config.js
        package.json    --port 8150  自定义端口
        pm2start.js （如果采用pm2管理需要 见下面）
    3.在服务器上部署运行
        npm install 安装依赖
        npm start 运行nuxt服务渲染 （也可采用pm2管理）
```

## pm2
### 创建pm2start.js
```
    npm install node-cmd --save

    in pm2start.js
        const cmd = require("node-cmd");
        cmd.run("npm run start");
```
### 指令
```
    安装
    npm install pm2 -g

    启动
    pm2 start pm2start.js --name "my-nuxt" #my-nuxt为PM2进程名称

    查看进程
    pm2 list
    pm2 show 0 或者 # pm2 info 0         #查看进程详细信息，0为PM2进程id 

    重启
    pm2 restart all                      #重启PM2列表中所有的进程
    pm2 restart 0                        #重启PM2列表中进程为0的进程
    重载
    pm2 reload all                       #重载PM2列表中所有的进程
    pm2 reload 0                         #重载PM2列表中进程为0的进程

    停止
    pm2 stop all                         #停止PM2列表中所有的进程
    pm2 stop 0                           #停止PM2列表中进程为0的进程
    删除
    pm2 delete all                       #删除PM2列表中所有的进程
    pm2 delete 0                         #删除PM2列表中进程为0的进程

    输出问题
    pm2 logs APP-NAME

    升级PM2
    npm install pm2@lastest -g           #安装最新的PM2版本
```

# 常见问题的解决方案
## 1.在服务端没有window document  
通用的解决方案一般为判断执行环境
## 2.没有keep-alive
由于是服务端渲染，所以不支持组件的keep-alive，那自然activated、deactivated这两个生命周期也没了
## 3.服务器端获取 cookie
cookie-universal-nuxt
