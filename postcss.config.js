module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8'
      ]
    },
    // 375px 即100%宽度，写px会自动rem处理
    // 如果不想被rem处理，可以使用PX来写
    // 根元素 1rem = 16px
    'postcss-pxtorem': {
      rootValue: 16,
      // font-size 保留px
      // border 保留px
      propList: ['*', '!font-*', '!border'],
      selectorBlackList: ['van-', 'px-'],
      unitPrecision: 3
    }
  }
}
