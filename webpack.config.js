const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    scripts: "./src/js/scripts.js",
    style: "./src/css/style.scss",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].js",
  },
  devServer: {
    open: false,
    static: "./build",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // Convert images < 8kb to base64 strings
              name: "img/[name].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};
