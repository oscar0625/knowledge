const path = require("path");
const eslintFriendlyFormatter = require("eslint-friendly-formatter");
const Dotenv = require("dotenv-webpack"); //.env环境变量插件

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: path.resolve(__dirname, "../src/main.js")
  },
  output: {
    path: path.resolve(__dirname, "../dist/web"),
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
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
          {
            loader: "thread-loader"
          },
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
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
        loader: "babel-loader",
        include: [path.resolve(__dirname, "../src")]
      },
      // img res
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: path.posix.join("static", "img/[name].[hash:7].[ext]")
        }
      },
      // media res
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: path.posix.join("static", "media/[name].[hash:7].[ext]")
        }
      },
      // font res
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: path.posix.join("static", "fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "../src")
    }
  },
  node: {
    // 避免 webpack 注入不必要的 setImmediate polyfill 因为 Vue 已经将其包含在内
    setImmediate: false
  }
};
