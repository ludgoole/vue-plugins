import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const modules = Util.exportAll(require.context('./modules', false, /\.js$/), {
  namespaced: true
})
const vuexLocal = new VuexPersistence({
  key: 'Vuex-Persistence',
  storage: window.localStorage,
  reducer: state => {
    return {
      contentList: state.home.contentList
    }
  }
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules
})
