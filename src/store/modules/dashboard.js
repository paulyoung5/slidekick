import Vue from 'vue'
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
      const res = await api.getPresentationsForUser(userId)
      commit('setPresentations', res.data.presentations)
      commit('setPageLoading', false, { root: true })
    } catch (error) {
      console.error(error)
    }
  },
  async createNewPresentation ({commit}, userId) {
    try {
      const title = window.prompt('Please enter a name for your presentation')
      if (!title) {
        window.alert('You did not enter a name')
        return
      }

      return api.createPresentation(title).then(res => {
        const id = res.headers.newpresentationid
        commit('createPresentation', {id, title, userId})
      })
    } catch (error) {
      console.error(error)
    }
  },
  deletePresentation ({commit}, presentationId) {
    const confirm = window.confirm('Are you sure you want to delete this presentation?')
    if (confirm) {
      commit('deletePresentation', presentationId)
    }
  },
  renamePresentation ({commit}, presentationId) {
    const newTitle = window.prompt('Please enter the new title')
    if (!newTitle) {
      window.alert(`The entered title wasn't valid. Please try again.`)
    }
    commit('setPresentationName', {presentationId, newTitle})
  }
}

const mutations = {
  setPresentations (state, presentations) {
    for (let i = 0; i < presentations.length; i += 1) {
      Vue.set(state.presentations, presentations[i].id, presentations[i])
    }
  },
  createPresentation (state, {id, userId, title}) {
    state.presentations.push({
      id,
      userId,
      title,
      slides: []
    })
  },
  deletePresentation (state, presentationId) {
    state.presentations = state.presentations.filter(p => p.id !== presentationId)
  },
  setPresentationName (state, {presentationId, newTitle}) {
    const presentation = state.presentations.filter(p => p.id === presentationId)[0]
    presentation.title = newTitle
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
