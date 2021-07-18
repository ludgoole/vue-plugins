import Vue from 'vue'

function installPlugin(_Vue) {
  _Vue.prototype.$bus = new Vue()
}

export default { installPlugin }
