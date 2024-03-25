const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const GlobEntries = require('webpack-glob-entries');

module.exports = {
  mode: "production",
  entry: GlobEntries("./src/**/*.{ts,js}", "./common/**/*.{ts,js}"),
  output: {
    path: path.join(__dirname, "dist"),
    libraryTarget: "commonjs",
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      common: path.resolve(__dirname, "common"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  target: "web",
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  devtool: "source-map",
  stats: {
    colors: true,
  },
  optimization: {
    minimize: false,
  },
};