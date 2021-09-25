import { exportAll } from '@/util'
const plugins = exportAll(require.context('./', false, /\.\/(?!index)\w+\.js$/))

export default Object.values(plugins)
  .reduce((a, c) => {
    return a.concat(Object.values(c))
  }, [])
  .sort((a, b) => a.typeSort - b.typeSort)
