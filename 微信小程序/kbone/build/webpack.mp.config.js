const path = require("path");
const webpack = require("webpack");
const eslintFriendlyFormatter = require("eslint-friendly-formatter");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MpPlugin = require("mp-webpack-plugin"); // 用于构建小程序代码的 webpack 插件
const stylehacks = require("stylehacks");
const autoprefixer = require("autoprefixer");
const mpPluginConfig = require("./miniprogram.config.js"); // 插件配置
const Dotenv = require("dotenv-webpack"); //.env环境变量插件

const isDevelop = process.env.NODE_ENV === "development";
const isOptimize = true; // 是否压缩业务代码，开发者工具可能无法完美支持业务代码使用到的 es 特性，建议自己做代码压缩

module.exports = {
  mode: "production",
  entry: {
    //自定义 app.js 和 app.wxss
    "miniprogram-app": path.resolve(__dirname, "../src/mp/app.js"),
    // 多页配置 js入口 先后顺序决定一开始打开的页面
    // 选项卡部分页面
    home: path.resolve(__dirname, "../src/mp/home/main.mp.js"),
    resource: path.resolve(__dirname, "../src/mp/resource/main.mp.js"),
    discover: path.resolve(__dirname, "../src/mp/discover/main.mp.js"),
    user: path.resolve(__dirname, "../src/mp/user/main.mp.js"),
    // 非选项卡部分
    search: path.resolve(__dirname, "../src/mp/search/main.mp.js"),
    info: path.resolve(__dirname, "../src/mp/info/main.mp.js"),
    discovery: path.resolve(__dirname, "../src/mp/discovery/main.mp.js"),
    login: path.resolve(__dirname, "../src/mp/login/main.mp.js"),
    userCenter: path.resolve(__dirname, "../src/mp/user_center/main.mp.js")
  },
  output: {
    path: path.resolve(__dirname, "../dist/mp/common"), // 放到小程序代码目录中的 common 目录下
    filename: "[name].js", // 必需字段，不能修改
    library: "createApp", // 必需字段，不能修改
    libraryExport: "default", // 必需字段，不能修改
    libraryTarget: "window" // 必需字段，不能修改
  },
  watch: isDevelop,
  target: "web", // 必需字段，不能修改
  optimization: {
    runtimeChunk: false, // 必需字段，不能修改
    splitChunks: {
      // 代码分割配置，不建议修改
      chunks: "all",
      minSize: 1000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 100,
      maxInitialRequests: 100,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: isOptimize
      ? [
          // 压缩CSS
          new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.(css|wxss)$/g,
            cssProcessor: require("cssnano"),
            cssProcessorPluginOptions: {
              preset: [
                "default",
                {
                  discardComments: {
                    removeAll: true
                  },
                  minifySelectors: false // 因为 wxss 编译器不支持 .some>:first-child 这样格式的代码，所以暂时禁掉这个
                }
              ]
            },
            canPrint: false
          }),
          // 压缩 js
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            parallel: true
          })
        ]
      : []
  },
  module: {
    rules: [
      // html
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      // css
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              modules: true
            }
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => {
                return [
                  autoprefixer,
                  stylehacks() // 剔除 ie hack 代码
                ];
              }
            }
          },
          {
            loader: "less-loader"
          },
          {
            loader: "style-resources-loader",
            options: {
              patterns: path.resolve(
                __dirname,
                "../src/assets/less/mixins.less"
              )
            }
          }
        ]
      },
      // eslint
      {
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [path.resolve(__dirname, "../src")],
        options: {
          formatter: eslintFriendlyFormatter,
          emitWarning: true
        }
      },
      // vue
      {
        test: /\.vue$/,
        use: [
          "thread-loader",
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          "vue-improve-loader"
        ]
      },
      // ts
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader"
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
              happyPackMode: true
            }
          }
        ]
      },
      // js
      {
        test: /\.js$/,
        use: [
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },
      // res
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // https://www.shuzhiduo.com/A/ZOJP44AlJv/ 参考链接
              limit: 1024, //官方配置为1024 如果图片太大超过1KB 要使用的替代加载程序
              fallback: "file-loader", // 指定当目标文件的大小超过限制时要使用的替代加载程序 默认 file-loader
              // 以下配置项用于配置file-loader
              publicPath: "https://test.api.rob-npsp.com:8347/images", // 对于资源文件直接使用线上的 cdn 地址
              // publicPath: "https://api.rob-npsp.com/images", // 对于资源文件直接使用线上的 cdn 地址
              name: "[name].[ext]",
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "../src")
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.isMiniprogram": process.env.isMiniprogram // 注入环境变量，用于业务代码判断
    }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "[name].wxss"
    }),
    new VueLoaderPlugin(),
    new MpPlugin(mpPluginConfig)
  ]
};
