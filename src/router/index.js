import Vue from 'vue'
import VueRouter from 'vue-router'
import meihuaRoutes from './meihua'
import chatRoutes from './chat'
import memoryRoutes from './memory'

Vue.use(VueRouter)

const routes = [...meihuaRoutes, ...chatRoutes, ...memoryRoutes]
const router = new VueRouter({
  routes
})

export default router
