// 引入 axios
import axios from '@/api'

// 引入 ElementUI 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export function installPlugins (Vue) {
  Vue.use(ElementUI)
  Vue.prototype.$axios = axios
}
