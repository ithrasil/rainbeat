const webpack = require('webpack');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {

  entry: './src/index.jsx',
  output: {
    path: 'public',
    filename: 'bundle.js'
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      },
			{
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-2']
        }
      },
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
		
	resolve: {
		alias: {
			Helpers$: path.resolve(__dirname, 'src/helpers.js'),
			Styles$: path.resolve(__dirname, 'src/css/index.scss'),
			Actions: path.resolve(__dirname, 'src/actions'),
			Constants: path.resolve(__dirname, 'src/constants'),
			Containers: path.resolve(__dirname, 'src/containers'),
			Reducers: path.resolve(__dirname, 'src/reducers')
		}
	},

  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: './public'
      }
    })
	]
};