import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

function installPlugin(Vue) {
  Vue.component('Splitpanes', Splitpanes)
  Vue.component('Pane', Pane)
}

export default { installPlugin }
