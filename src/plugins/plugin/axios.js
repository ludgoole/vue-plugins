// 引入 axios
import axios from '@/api'

function installPlugin (Vue) {
  Vue.prototype.$axios = axios
}

export default { installPlugin }
