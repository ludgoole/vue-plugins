import vuescroll from 'vue-scroll'

function installPlugin (Vue) {
  Vue.use(vuescroll, { throttle: 600 })
}

export default { installPlugin }
