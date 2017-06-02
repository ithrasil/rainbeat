const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {

  entry: './src/index.jsx',
  output: {
    path: 'public',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  },

  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: './public'
      }
    }),
    
//    new webpack.DefinePlugin({
//      'process.env': {
//        'NODE_ENV': JSON.stringify('production)
//      }
//    })
  ]
};