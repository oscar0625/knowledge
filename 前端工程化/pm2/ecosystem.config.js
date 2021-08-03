module.exports = {
  apps: [
    {
      name: "ckzone-web", // 应用名称
      script: "./pm2start.js", // 实际启动脚本
      cwd: "./", // 实际启动脚本

      // 自动重启
      watch: true, // 监控变化的目录，一旦变化，自动重启
      ignore_watch: [
        // 从监控目录中排除
        "node_modules"
      ],
      // 负载均荷
      exec_mode: "cluster", // 应用启动模式，支持fork和cluster模式；cluster(多核推荐)
      instances: "max", // 开启进程数，可为数值，也可为max。与服务器cpu核数相关。应用启动实例个数，仅在cluster模式有效，默认为fork；

      max_restarts: 30, // 最大异常重启次数，即小于min_uptime运行时间重启次数；

      // 解决内存溢出
      // 方法一
      max_memory_restart: "300M" // 最大内存限制数，超出自动重启；
      // // 方法二 传递node参数
      // node_args: "--max-old-space-size=4096" // 分配1G的老生代堆内存
    }
  ]
};
