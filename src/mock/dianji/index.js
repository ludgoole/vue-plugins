import { exportAll } from '@/util'
const plugins = exportAll(require.context('./', false, /\.\/(?!index)\w+\.js$/))
const nameInfo = {
  meihua: '梅花易数',
  meihuaxinyi: '梅花新易',
  yixiang: '易象'
}

export default Object.entries(plugins).map(([key, value]) => {
  return {
    name: nameInfo[key],
    data: value
  }
})
