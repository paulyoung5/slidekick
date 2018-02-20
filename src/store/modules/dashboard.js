import api from '../../api/presentation'

const state = {
  presentations: []
}

const getters = {
  presentations: state => state.presentations
}

const actions = {
  async fetchPresentations ({commit}, userId) {
    try {
      // At this point, get the presentation data from mongodb! we can then update the state
      const presentations = await api.getPresentationsForUser(userId)

      commit('setPresentations', presentations)
      commit('setPageLoading', false)
    } catch (error) {
      console.error(error)
    }
  }
}

const mutations = {
  setPresentations (state, presentations) {
    state.presentations = presentations
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
