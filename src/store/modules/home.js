import { getOne } from '@/api'

export default {
  state: {
    contentList: ''
  },
  getters: {},
  mutations: {
    SET_ONE(state, contentList) {
      state.contentList = contentList
    }
  },
  actions: {
    async getOne({ commit }, params = {}) {
      const data = await getOne(params)
      commit('SET_ONE', data.content_list)

      return data
    }
  }
}
