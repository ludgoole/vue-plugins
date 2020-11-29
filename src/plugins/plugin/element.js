// 引入 ElementUI 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

function installPlugin (Vue) {
  Vue.use(ElementUI)
}

export default { installPlugin }
