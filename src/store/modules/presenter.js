import api from '../../api/presentation'

const state = {
  selectedSlideIndex: 0,

  presentation: {
    id: -1,
    title: '',
    slides: []
  }
}

const getters = {
  presentation: state => state.presentation,
  presentationId: state => state.presentation ? state.presentation.id : -1,
  title: state => state.presentation.title,
  currentSlide: state => {
    if (!state.presentation.slides.length || !state.presentation.slides[state.selectedSlideIndex]) {
      return null
    }

    return state.presentation.slides[state.selectedSlideIndex]
  },
  selectedSlideIndex: state => state.selectedSlideIndex,
  slides: state => state.presentation.slides,
  zoomLevel: state => state.zoomLevel
}

const actions = {
  async fetchPresentation ({commit}, presentationId) {
    try {
      const presentation = await api.getPresentation(presentationId)

      commit('setPresentation', presentation)
      commit('setPageLoading', false, { root: true })
    } catch (error) {
      console.error(error)
    }
  },

  next ({commit}) {
    commit('nextSlide')
  },
  previous ({commit}) {
    commit('previousSlide')
  }
}

const mutations = {
  setPresentation (state, presentation) {
    state.presentation = presentation
  },

  setTitle (state, title) {
    state.presentation.title = title
  },

  setSlides (state, slides) {
    state.presentation.slides = slides
  },

  setSelectedSlideIndex (state, selectedIndex) {
    state.selectedSlideIndex = selectedIndex
  },

  nextSlide (state) {
    const newIndex = state.selectedSlideIndex + 1

    if (state.presentation.slides.length && state.presentation.slides[newIndex]) {
      state.selectedSlideIndex = newIndex
    }
  },

  previousSlide (state) {
    const newIndex = state.selectedSlideIndex - 1

    if (state.presentation.slides.length && state.presentation.slides[newIndex]) {
      state.selectedSlideIndex = newIndex
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
