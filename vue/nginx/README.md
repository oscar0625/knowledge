https://www.nginx.cn/doc/

# nginx
Nginx Windows详细安装部署教程
```
    https://blog.csdn.net/kingscoming/article/details/79042874
    https://cloud.tencent.com/developer/article/1083394
    https://www.cnblogs.com/taiyonghai/p/9402734.html
```

## 下载
http://nginx.org/en/download.html -> nginx/Windows-1.14.2

## 启动Nginx 
下载完成后，解压缩，运行cmd，使用命令进行操作
注意不要直接双击nginx.exe，这样会导致修改配置后重启、停止nginx无效，需要手动关闭任务管理器内的所有nginx进程
如果遇到报错：
nginx: command not found    如果你之前是允许 nginx -s reload报错， 试下 ./nginx -s reload
```
    cd d:\nginx-1.14.2
    启动nginx
        start nginx  
    查看任务进程是否存在，检查是否启动成功
        tasklist /fi "imagename eq nginx.exe"
    修改配置后重新加载生效
        nginx -s reload  
    重新打开日志文件
        nginx -s reopen 
    测试nginx配置文件是否正确
        nginx -t -c ./conf/nginx.conf 
    快速停止nginx    
        nginx -s stop
    完整有序的停止nginx    
        nginx -s quit
```
```
    其他常用命令
        验证配置是否正确:
            nginx -t
        查看Nginx的版本号
            nginx -V
```

## 修改配置文件
nginx配置文件在 nginx-1.14.2/conf/nginx.conf
```
    http {
        #html文件 (vue单页面项目应该这样部署到服务器)
        server {
            listen       8800;
            server_name  127.0.0.1 localhost;

            location / {
                root   D:/dept_software/software_design/200708_ckzone_II/ckzoneBack/dist;
                index  index.html index.htm;
            }
        }
    }
```

# nuxt.js服务端渲染框架构建的项目部署到服务器
https://segmentfault.com/a/1190000012774650
Nginx反向代理:由于服务端渲染的各个应用端口号各不相同，因此这个时候我们就需要反向代理了
```
    server {
        listen 80;
        server_name mysite.com;
        location / {
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;  
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_cache_bypass $http_upgrade;
            proxy_pass http://nodenext; #反向代理
        }
    }
    
    upstream nodenuxt {
        server 127.0.0.1:3002; #nuxt项目 监听端口
        keepalive 64;
    }

```