import SmoothScrollbar from 'smooth-scrollbar'

function installPlugin (Vue) {
  Vue.prototype.$Scrollbar = SmoothScrollbar
}

export default { installPlugin }
