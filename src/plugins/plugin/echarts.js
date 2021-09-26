import * as echarts from 'echarts'

function installPlugin(Vue) {
  Vue.prototype.$echarts = echarts
}

export default { installPlugin }
