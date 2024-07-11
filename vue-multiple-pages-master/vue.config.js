'use strict'
const titles = require('./title.js')
const glob = require('glob')
const path = require('path')
const pages = {}

function resolve(dir) {
  return path.join(__dirname, dir)
}

glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  pages[chunk] = {
    entry: path,
    title: titles[chunk],
    template: 'public/index.html',
    chunks: ['chunk-vendors', 'chunk-common', chunk],
    filename: resolve(`dist/${chunk}`) + '/index.html'
  }
})
module.exports = {
  pages,
  filenameHashing: true,
  configureWebpack: {
    output: {
      filename: '[name]/[name].[contenthash].js',
      chunkFilename: '[name]/[name].[contenthash].js'
    }
  },
  chainWebpack: config => config.plugins.delete('named-chunks'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
