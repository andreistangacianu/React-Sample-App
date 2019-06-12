const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /.(css|scss)$/,
        use: [
          { loader: "style-loader", options: { sourceMap: true } },

          {
            loader: "css-loader",
            options: {
              modules: true,
              minimize: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },

          { loader: "postcss-loader", options: { sourceMap: true } },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "site.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3005,
    compress: true,
    public: "http://localhost:3005",
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "index.ejs",
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    })
  ]
};
