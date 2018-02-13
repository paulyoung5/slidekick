<style>
.app {
  display: grid;
  grid-template-areas:
    "top-bar          top-bar         top-bar"
    "slides-toolbar   toolbox         inspector"
    "slides-toolbar   current-slide   inspector"
    "slides-toolbar   slide-controls  inspector";
  grid-template-columns: 250px minmax(300px, 1fr) 300px;
  grid-template-rows: auto auto 1fr auto;
  overflow: hidden;
}

@media (max-width: 800px) {
  .app {
      grid-template-columns: 1fr;
      grid-template-areas:
      "top-bar"
      "slide-controls"
      "current-slide"
      ;
  }
}
</style>

<template>
  <div class="app">
    <top-bar></top-bar>

    <slides-toolbar></slides-toolbar>

    <toolbox></toolbox>

    <inspector></inspector>

    <slide-controls></slide-controls>

    <current-slide></current-slide>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopBar from './TopBar.vue'
import SlidesToolbar from './SlidesToolbar.vue'
import Toolbox from './Toolbox.vue'
import Inspector from './Inspector.vue'
import SlideControls from './SlideControls.vue'
import CurrentSlide from './CurrentSlide.vue'

export default {
  name: 'slide-editor',
  components: {
    'top-bar': TopBar,
    'slides-toolbar': SlidesToolbar,
    'toolbox': Toolbox,
    'inspector': Inspector,
    'slide-controls': SlideControls,
    'current-slide': CurrentSlide
  },
  created () {
    this.$store.dispatch('fetchPresentation')
  },
  computed: {
    ...mapGetters(['currentSlide', 'selectedElementIndex'])
  },
  methods: {
    inspectElement (index) {
      this.$store.commit('setSelectedElementIndex', index)
    }
  }
}
</script>
