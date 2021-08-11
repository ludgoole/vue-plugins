// vue.config.js
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const undevelopment = process.env.NODE_ENV !== 'development'
const assetsDir = 'static'
const resolve = filepath => path.resolve(__dirname, filepath)

// 定义 Webpack 不打包资源列表
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios'
}

// 定义 CDN 资源
const CDNSources = {
  dev: {
    css: [],
    js: []
  },
  prod: {
    css: [],
    js: [
      'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
      'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
      'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
      'https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js'
    ]
  }
}

module.exports = {
  // 出口
  outputDir: 'dist',
  publicPath: './',
  assetsDir: assetsDir,
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'text-color': '#111',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "@/assets/theme/index.less"`
          }
        }
      },
      scss: {
        prependData: `@import "~@/assets/style/index.scss";`
      }
    }
  },
  // 链式配置
  chainWebpack: config => {
    // *****************************
    // externals 不打包资源
    // *****************************
    // 通过externals不打包CDN资源
    undevelopment && config.set('externals', externals)

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
    // 在html文件加载外部CDN资源
    // 具名插件html，默认使用htmlWebpackPlugin
    config
      .plugin('html')
      .tap(args => {
        args[0].CDN = CDNSources[undevelopment ? 'prod' : 'dev']
        return args
      })
      .end()

      // 定义全局变量
      .plugin('povide')
      // args must be an array of arguments
      .use(webpack.ProvidePlugin, [
        {
          _: 'lodash',
          localforage: 'localforage',
          Util: path.resolve(__dirname, 'src/util/index.js'),
          download: [path.resolve(__dirname, 'src/util/index.js'), 'download']
        }
      ])
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
  },

  // 服务
  devServer: {
    port: 8080,
    open: true,
    hot: true, // 热更新
    disableHostCheck: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_PROXY_SERVER, // 设置你调用的接口域名和端口号
        changeOrigin: true, // 跨域
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  }
}
