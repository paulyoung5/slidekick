const state = {
  selectedSlideIndex: -1,
  zoomLevel: 1,
  selectedElementIndex: -1,

  title: '',
  slides: []
}

const ZOOM_STEP_LEVEL = 0.2

const getters = {
  currentSlide: state => {
    if (!state.slides.length || !state.slides[state.selectedSlideIndex]) {
      return null
    }

    return state.slides[state.selectedSlideIndex]
  },
  selectedSlideIndex: state => state.selectedSlideIndex,
  selectedElementIndex: state => state.selectedElementIndex,
  currentElement: state => {
    if (!state.slides.length || state.selectedSlideIndex < 0 || state.selectedElementIndex < 0) {
      return null
    }

    return state.slides[state.selectedSlideIndex].elements.find(el => el.id === state.selectedElementIndex)
  },
  title: state => state.title,
  slides: state => state.slides,
  zoomLevel: state => state.zoomLevel
}

const actions = {
  fetchPresentation ({commit}) {
    // At this point, get the presentation data from mongodb! we can then update the state
    commit('setTitle', 'First ever presentation!')

    commit('setSlides', [
      {
        backgroundColour: '#FFFFFF',
        elements: [
          {
            id: 0,
            type: 'TEXT',
            properties: {
              x: '100px',
              y: '100px',
              fontFamily: 'Verdana',
              fontSize: 30,
              content: 'Slide 1'
            }
          }
        ]
      }
    ])

    commit('setSelectedSlideIndex', 0)
  },

  zoomIn ({commit}) {
    commit('zoomIn')
  },

  zoomOut ({commit}) {
    commit('zoomOut')
  },

  selectSlideFromList ({commit}, selectedSlideIndex) {
    commit('setSelectedSlideIndex', selectedSlideIndex)
  },

  inspectElement ({commit}, selectedElementIndex) {
    commit('setSelectedElementIndex', selectedElementIndex)
  },

  updateBackgroundColour ({commit}, {target: {value}}) {
    commit('setBackgroundColour', value)
  }
}

const mutations = {
  setTitle (state, title) {
    state.title = title
  },

  setSlides (state, slides) {
    state.slides = slides
  },

  setSelectedSlideIndex (state, selectedIndex) {
    state.selectedSlideIndex = selectedIndex
  },

  zoomIn (state) {
    const newValue = state.zoomLevel + ZOOM_STEP_LEVEL

    if (newValue < 2.5) {
      state.zoomLevel = newValue
    }
  },

  zoomOut (state) {
    const newValue = state.zoomLevel - ZOOM_STEP_LEVEL

    if (newValue > 0) {
      state.zoomLevel = newValue
    }
  },

  setSelectedElementIndex (state, selectedElementIndex) {
    state.selectedElementIndex = selectedElementIndex
  },

  setBackgroundColour (state, newBackgroundColour) {
    if (!state.slides.length || !state.slides[state.selectedSlideIndex]) {
      return null
    }

    state.slides[state.selectedSlideIndex].backgroundColour = newBackgroundColour
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
