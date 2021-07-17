import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { exportAll } from '../util'

Vue.use(Vuex)

const modules = exportAll(require.context('./modules', false, /\.js$/), {
  namespaced: true
})
const vuexLocal = new VuexPersistence({
  key: 'Vuex-Persistence',
  storage: window.sessionStorage,
  modules: ['menu'],
  reducer: state => {
    console.log('VuexPersistence:state', state)
    return {
      token: state.token,
      auth: state.auth,
      menu: state.menu
    }
  },
  filter: mutation => {
    console.log('VuexPersistence:mutation', mutation)
    return mutation.type === 'setToken'
    // mutation.type ==='addNavItem'
  }
})

export default new Vuex.Store({
  state: {
    token: '',
    auth: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setAuth(state, auth) {
      state.auth = auth
    }
  },
  actions: {},
  plugins: [vuexLocal.plugin],
  modules
})
