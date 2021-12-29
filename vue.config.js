// vue.config.js
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const resolve = filepath => path.resolve(__dirname, filepath)
const undevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  outputDir: 'dist',
  publicPath: undevelopment ? './' : '/',
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/style/index.scss";`
      }
    }
  },

  // 链式配置
  chainWebpack: config => {
    // *****************************
    // alias 别名
    // *****************************
    config.resolve.alias
      .set('test', resolve('src/plugins/test.js'))
      .set('@assets', resolve('src/assets'))

    // *****************************
    // module 模块
    // *****************************
    // 提取图片文件
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => {
        // console.log('url-loader', options)
        return {
          ...options,
          limit: 8192
        }
      })
      .end()

    // *****************************
    // plugin 插件
    // *****************************
    config
      // 定义全局变量
      .plugin('povide')
      // args must be an array of arguments
      .use(webpack.ProvidePlugin, [
        {
          _: 'lodash',
          localforage: 'localforage'
        }
      ])
      .tap(args => {
        // console.log('povide', args)
        return args
      })
      .end()

      // 代码压缩
      .plugin('uglifyJs')
      .use(UglifyJsPlugin, [
        {
          uglifyOptions: {
            warnings: false,
            compress: {
              // 移除 debugger
              drop_debugger: true,
              // 移除console.*函数
              drop_console: true,
              // 移除console.log的引用
              // 例如 log = console.log, 移除log，同时移除console.log
              pure_funcs: ['console.log']
            }
          },
          // 多进程并行运行
          parallel: true,
          // 启用缓存
          cache: true,
          // 抽取注释
          extractComments: true
        }
      ])
      .tap(args => {
        // console.log('uglifyJs', process.env.NODE_ENV, args)
        return args
      })
  },

  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://api.qingyunke.com',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
