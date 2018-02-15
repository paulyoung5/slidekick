import Vue from 'vue'
import Vuex from 'vuex'

import slidesEditor from './modules/slides-editor'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {slidesEditor}
})
