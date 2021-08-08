module.exports = {
  outputDir: 'dist',
  publicPath: './',
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
  devServer: {
    disableHostCheck: true
  }
}
