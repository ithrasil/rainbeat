const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {

  entry: './src/app.jsx',
  output: {
    path: 'public',
    filename: 'bundle.js'
  },

  devtool: 'cheap-module-source-map',
//  devtool: 'inline-source-map',
  
  module: {
    loaders: [
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
        loader: 'style-loader!css-loader!sass-loader',
        options: {
          plugins: function () {
            return [
              require('precss'),
              require('autoprefixer')
            ];
          }
        }
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};