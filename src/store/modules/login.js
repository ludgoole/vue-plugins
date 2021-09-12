import { login } from '@/api'

export default {
  state: {
    token: ''
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async login({ commit }, params = {}) {
      const data = await login(params)
      commit('SET_TOKEN', data.token)

      return data
    }
  }
}
