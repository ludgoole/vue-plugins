import { exportAll } from '@/util'
const plugins = exportAll(require.context('./', false, /\.\/(?!index)\w+\.js$/))

export function installPlugins(Vue) {
  Object.values(plugins).forEach(plugin => {
    plugin.installPlugin(Vue)
  })
}
