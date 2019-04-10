const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { TEST_VAR, APP_MOUNT_ID } = process.env

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.jsx'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        enforce: "pre",
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
          color: true
        }
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new HtmlWebpackPlugin({
      title: `${TEST_VAR}`,
      inject: false,
      template: './src/index.ejs',
      minify: {
        collapseWhitespace: true
      },
      mobile: true,
      appMountId: 'react-root'
    }),
    new webpack.DefinePlugin({
      APP_MOUNT_ID: JSON.stringify(APP_MOUNT_ID),
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}