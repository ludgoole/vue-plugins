import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugins from './plugins'

Vue.config.productionTip = false
Vue.use(plugins)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// eslint-disable-next-line no-undef
// console.log('Test', Test)
// {add, sum, default: {add, sum}}

// eslint-disable-next-line no-undef
// console.log('Add', Add)
// function add() {}

// eslint-disable-next-line no-undef
// console.log('test', test)
// {add, sum, default: {add, sum}}

window.Vue = Vue

console.log('Vue', [Vue])
console.log('Vue.util', Vue.util)
