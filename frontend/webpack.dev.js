const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    proxy: [{
      context: ["/tracks", "/artists", "/playlists", "/albums", "/artist", "/playlist", "/album"],
      target: "http://localhost:8000",
    }]
  }

})