const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8000,
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
});
