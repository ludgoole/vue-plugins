// 引入 style 文件
import './style'

// 引入 vue 插件
import { installPlugins } from './plugin'

export default {
  install (Vue) {
    installPlugins(Vue)

    Vue.mixin({
      created: function () {
        console.log('Vue.mixin >>>>', this.$axios)
      }
    })
  }
}
