import { getMenu } from '@/api'

export default {
  state: {
    menu: ''
  },
  getters: {},
  mutations: {
    SET_MENU(state, menu) {
      state.menu = menu
    }
  },
  actions: {
    async getMenu({ commit }, params = {}) {
      const data = await getMenu(params)
      commit('SET_MENU', data)

      return data
    }
  }
}
