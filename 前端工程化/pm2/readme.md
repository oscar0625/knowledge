# pm2
https://pm2.keymetrics.io/docs/usage/quick-start/
https://juejin.cn/post/6844903887606906894

## 创建pm2start.js
```
    npm install node-cmd --save

    in pm2start.js
        const cmd = require("node-cmd");
        cmd.run("npm run start");
```

## 配置文件
ecosystem.config.js
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

    保存和开机自启动
    pm2 save                             #保存当前应用列表         
    pm2 resurrect                        #手动复活之前保存进程
    pm2 startup                          #创建开机自启动命令 （不适合Windows系统）
    
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