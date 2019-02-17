const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  output: {
    path: path.join(__dirname, './../backend/public/'),
    filename: 'bundle.js'
  },
  mode: 'production'
})