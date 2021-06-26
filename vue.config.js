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
      // 'https://cdn.bootcss.com/mathjax/3.0.5/es5/tex-mml-chtml.js?config=TeX-AMS_CHTML'
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
  publicPath: './',
  outputDir: 'dist',
  assetsDir: assetsDir,
  filenameHashing: true,
  productionSourceMap: true,

  // 常规配置
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     '@assets': path.resolve(__dirname, 'src/assets')
    //   }
    // },
    module: {
      rules: [
        // {
        //   test: /\.(png|jpg|gif)$/i,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         name: '[name][hash:5].[ext]'
        //         // limit: 8192
        //       }
        //     }
        //   ]
        // }
        // {
        //   test: /\.(png|jpg|gif)$/i,
        //   use: [
        //     {
        //       loader: 'url-loader',
        //       options: {
        //         limit: 8192
        //       }
        //     }
        //   ]
        // }
      ]
    },
    plugins: [
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     warnings: false,
      //     compress: {
      //       drop_debugger: true, // console
      //       drop_console: true,
      //       pure_funcs: ['console.log'] // 移除console
      //     }
      //   },
      //   sourceMap: false,
      //   parallel: true
      // })
    ],
    optimization: {
      // minimizer: [
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       warnings: false,
      //       compress: {
      //         drop_debugger: true, // console
      //         drop_console: true,
      //         pure_funcs: ['console.log'] // 移除console
      //       }
      //     },
      //     sourceMap: false,
      //     parallel: true
      //   })
      // ]
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
    // .use('image-webpack-loader')
    // .loader('image-webpack-loader')
    // .options({
    //   bypassOnDebug: true,
    //   disable: false,
    //   mozjpeg: {
    //     progressive: true,
    //     // enabled: false,
    //     quality: 65
    //   },

    //   // optipng.enabled: false will disable optipng
    //   optipng: {
    //     enabled: false
    //   },
    //   pngquant: {
    //     quality: [0.65, 0.9],
    //     speed: 4
    //   },
    //   // Cannot find module 'gifsicle'
    //   gifsicle: {
    //     enabled: false,
    //     interlaced: false
    //   }

    //   // the webp option will enable WEBP
    //   // webp: {
    //   //   quality: 75
    //   // }
    // })
    // .tap(options => {
    //   console.log('image-webpack-loader', options)
    //   return options
    // })

    // 图片压缩
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     bypassOnDebug: true,
    //     disable: true,
    //     mozjpeg: {
    //       progressive: true,
    //       quality: 65
    //     },

    //     // optipng.enabled: false will disable optipng
    //     optipng: {
    //       enabled: true
    //     },
    //     pngquant: {
    //       quality: [0.65, 0.9],
    //       speed: 4
    //     },
    //     gifsicle: {
    //       interlaced: false
    //     },

    //     // the webp option will enable WEBP
    //     webp: {
    //       quality: 75
    //     }
    //   })
    //   .end()

    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //   .use('imagemin-loader')
    //   .loader('imagemin-loader')
    //   .options({
    //     plugins: [
    //       {
    //         use: 'imagemin-pngquant',
    //         options: {
    //           quality: [0.65, 0.9],
    //         },
    //       },
    //     ],
    //   })
    //   .end()

    // config.module
    //   .rule('image-min')
    //   .test(/\.(gif|png|jpe?g|svg)$/i)
    //   .use('file-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     mozjpeg: {
    //       progressive: true
    //     },
    //     // optipng.enabled: false will disable optipng
    //     optipng: {
    //       enabled: false
    //     },
    //     pngquant: {
    //       quality: [0.65, 0.9],
    //       speed: 4
    //     },
    //     // gifsicle: {
    //     //   interlaced: false
    //     // },
    //     // the webp option will enable WEBP
    //     webp: {
    //       quality: 75
    //     }
    //   })
    //   .end()

    // *****************************
    // plugin 插件
    // *****************************
    // 在html文件加载外部CDN资源
    // 具名插件html，默认使用htmlWebpackPlugin
    config
      .plugin('html')
      .tap(args => {
        // 默认args
        /*
          [
            {
              title: 'vue-plugins',
              templateParameters: [Function: templateParameters],
              template: 'C:\\Users\\ThinkPad\\Desktop\\vue-plugins\\public\\index.html'
            }
          ]
        */
        // console.log('html', args)
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
          LocalForage: 'localforage',
          // eslint-disable-next-line no-undef
          Test: path.resolve(__dirname, 'src/plugins/test.js'),
          Add: [path.resolve('src/plugins/test.js'), 'add'],
          test: 'test'
        }
      ])
      .tap(args => {
        console.log('povide', args)
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
        console.log('uglifyJs', process.env.NODE_ENV, args)
        return args
      })
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
