// Reference article:
// https://auralinna.blog/post/2018/setting-up-webpack-4-for-a-project
const webpack = require('webpack');
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
  devtool: 'source-map',
  entry: {
    global: ['./assets/js/global.js'],
    home: ['./assets/js/home.js'],
    blog: ['./assets/js/blog.js']
  },
  output: {
    path: __dirname + '/dist/js',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@js': path.resolve(__dirname, '../assets/js'),
      '@': path.resolve(__dirname, '../assets')
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, '../assets')
    ],
    extensions: ['.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ]
};
