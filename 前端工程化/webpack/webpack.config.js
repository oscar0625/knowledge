const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env) => {
  //common部分
  const common = {
      target: "web",
      entry: {
        app: "./src/index.js"
      },
      output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist")
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader"
              },
              {
                loader: "postcss-loader"
              }
            ]
          },
          {
            test: /\.less$/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader"
              },
              {
                loader: "postcss-loader"
              },
              {
                loader: "less-loader"
              }
            ]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ["file-loader"]
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          "process.env.OSCAR": 123
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "./public/index.html")
        }),
        new ESLintPlugin()
      ],
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              name: "commons",
              chunks: "initial",
              minChunks: 2
            },
            vendors: {
              name: "vendors",
              chunks: "all",
              test: /[\\/]node_modules[\\/]/
            }
          }
        }
      }
    },
    //dev部分
    dev = {
      mode: "development",
      devtool: "eval-source-map",
      devServer: {
        static: {
          directory: path.join(__dirname, "public")
        },
        hot: true,
        open: true,
        port: 9000
      }
    },
    //prod部分
    prod = {
      mode: "production",
      devtool: "source-map"
    };
  let res;

  switch (env.NODE_ENV) {
    case "development":
      res = {
        ...common,
        ...dev
      };
      break;
    case "production":
      res = {
        ...common,
        ...prod
      };
      break;
  }
  return res;
};
