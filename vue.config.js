// vue.config.js
const webpack = require('webpack')
const undevelopment = process.env.NODE_ENV === 'development'

// 定义 Webpack 不打包资源列表
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'js-cookie': 'Cookies'
}

// 定义 CDN 资源
const CDNSources = {
  dev: {
    css: [],
    js: [
      // TODO:按需
      // mathjax
      'https://cdn.bootcss.com/mathjax/3.0.5/es5/tex-mml-chtml.js?config=TeX-AMS_CHTML'
    ]
  },
  prod: {
    css: [],
    js: [
      'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
      'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
      'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
      'https://cdn.bootcdn.net/ajax/libs/js-cookie/2.2.1/js.cookie.min.js',
      'https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js',

      // TODO:按需
      // mathjax
      'https://cdn.bootcss.com/mathjax/3.0.5/es5/tex-mml-chtml.js?config=TeX-AMS_CHTML'
    ]
  }
}

module.exports = {
  // 出口
  publicPath: undevelopment ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  productionSourceMap: true,

  // 插件
  chainWebpack: config => {
    // 通过externals不打包CDN资源
    config.set('externals', externals)

    // 在html文件加载外部CDN资源
    config.plugin('html').tap(args => {
      args[0].CDN = CDNSources[undevelopment ? 'prod' : 'dev']
      return args
    })

    // 定义全局变量
    config
      .plugin('povide')
      .use(webpack.ProvidePlugin, [{ _: 'lodash', LocalForage: 'localforage' }])
  },

  // 服务
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    hot: true, // 热更新
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 设置你调用的接口域名和端口号
        changeOrigin: true, // 跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
