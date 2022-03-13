import vTouch from 'yg-v-touch'
import VDragged from 'v-dragged'

function installPlugin(Vue) {
  Vue.use(vTouch)
  Vue.use(VDragged)
}

export default { installPlugin }
