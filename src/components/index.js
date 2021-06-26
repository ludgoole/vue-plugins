import { exportAll } from '@/util'
const components = exportAll(require.context('./', false, /\.vue$/))

export default components
