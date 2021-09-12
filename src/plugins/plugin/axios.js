// 引入 axios
import axios from '@/request'

function installPlugin(Vue) {
  Vue.prototype.$axios = axios
}

export default { installPlugin }
