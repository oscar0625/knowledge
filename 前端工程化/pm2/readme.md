# pm2
https://pm2.keymetrics.io/docs/usage/quick-start/
https://juejin.cn/post/6844903887606906894

## nuxt部署到服务端过程
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
        （如果采用pm2管理需要 见下面）
        pm2start.js 
        ecosystem.config.js
    3.在服务器上部署运行
        npm install 安装依赖
        npm start 运行nuxt服务渲染 （也可采用pm2管理）
```

## 创建pm2start.js
```
    npm install node-cmd --save

    in pm2start.js
        const cmd = require("node-cmd");
        cmd.run("npm run start");
```

## 创建ecosystem.config.js
``` 
    生成示例配置文件
    pm2 init simple
    作用于配置文件
    pm2 start ecosystem.config.js
    pm2 stop ecosystem.config.js
    pm2 restart ecosystem.config.js
    pm2 reload ecosystem.config.js
    pm2 delete ecosystem.config.js
```

## 指令
```
    安装
    npm install pm2 -g
    安装最新的PM2版本
    npm install pm2@lastest -g           
    更新内存中的 PM
    pm2 update                           #保存进程，终止PM2并恢复进程

    启动
    pm2 start pm2start.js --name "my-nuxt" #my-nuxt为PM2进程名称

    保存和恢复
    pm2 save                             #保存当前应用列表         
    pm2 resurrect                        #手动复活之前保存进程
    
    查看进程
    pm2 list
    pm2 show 0 或者 # pm2 info 0         #查看进程详细信息，0为PM2进程id 

    实时仪表板
    pm2 monit

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

```

## 配置开机自启动
```
    安装
    npm i pm2-windows-service -g
```
```
    添加pm2环境变量 右键 [我的电脑] - [属性] - [高级系统设置] - [环境变量] - 新建 [系统变量]
```
![环境变量.png]
```
    以管理员权限打开新的cmd命令行窗口
    pm2-service-install
    Perform environment setup => 选 n, 继续 => 提示 PM2 service installed and started.
    可以通过 [win + r] - [services.msc] 来查看，服务名称为PM2
```
```
    运行程序并保存
    pm2 start ecosystem.config.js
    pm2 save
```

## 其他
``` 
    查看所有端口的占用情况，
    netstat -ano

    查看被占用端口对应的 PID
    netstat -aon|findstr 8020

    查看指定 PID 的进程
    tasklist|findstr 53336

    强制（/F参数）杀死 pid 为 9088 的所有进程包括子进程（/T参数）
    taskkill /T /F /PID 53336 
```

[环境变量.png]: data:image/jpeg;base64,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