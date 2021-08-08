module.exports = {
  outputDir: 'dist',
  publicPath: './',
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/style/index.scss";`
      }
    }
  },
  devServer: {
    disableHostCheck: true
  }
}
