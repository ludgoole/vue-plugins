import $ from '@/api'
import path from '@/api/path'

export default {
  state: {
    menu: ''
  },
  getters: {

  },
  mutations: {
    SET_MENU (state, menu) {
      state.menu = menu
    }
  },
  actions: {
    async getMenu ({ commit }, params = {}) {
      const data = await $.post(path.getMenu, params)
      commit('SET_MENU', data)

      return data
    }
  }
}
