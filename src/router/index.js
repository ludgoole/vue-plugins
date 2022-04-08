import Vue from 'vue'
import VueRouter from 'vue-router'
import { exportAll } from '@/util'
const routesMap = exportAll(
  require.context('./', false, /\.\/(?!index)\w+\.js$/)
)
const routes = Object.values(routesMap).reduce((a, c) => a.concat(...c), [])
console.log('[ routes ] >', routesMap, routes)
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

export default router
