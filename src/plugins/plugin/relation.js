import RelationGraph from 'relation-graph'

function installPlugin(Vue) {
  Vue.component('RelationGraph', RelationGraph)
}

export default { installPlugin }
