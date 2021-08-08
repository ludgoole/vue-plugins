import Vue from 'vue'
import App from './pages/index/index'
import router from './router'
import store from './store'
import plugins from './plugins'
import VAQ from 'vue-apicloud-quickstart'
import pages from '@/config/pages.json'

Vue.config.productionTip = false
Vue.use(plugins)

Vue.use(VAQ, {
  pages /*, debugOnPC: process.env.NODE_ENV !== 'production' */
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
