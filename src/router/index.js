import Vue from 'vue'
import VueRouter from 'vue-router'
import meihuaRoutes from './meihua'
import chatRoutes from './chat'
import memoryRoutes from './memory'
import historyRoutes from './history'

Vue.use(VueRouter)

const routes = [
  ...meihuaRoutes,
  ...chatRoutes,
  ...memoryRoutes,
  ...historyRoutes
]
const router = new VueRouter({
  routes
})

export default router
