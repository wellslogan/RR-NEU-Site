const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  watch: true,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8000,
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /.(ts|tsx)$/,
        use: ['awesome-typescript-loader'],
        exclude: [/node_modules/],
      },
      { test: /.html$/, use: 'raw-loader' },
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.woff(\?.+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?.+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      { test: /\.ttf(\?.+)?$/, use: 'file-loader' },
      { test: /\.eot(\?.+)?$/, use: 'file-loader' },
      { test: /\.svg(\?.+)?$/, use: 'file-loader' },
      { test: /\.png$/, use: 'url-loader?mimetype=image/png' },
      { test: /\.gif$/, use: 'url-loader?mimetype=image/gif' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      showErrors: true,
      hash: true,
    }),
  ],
};
