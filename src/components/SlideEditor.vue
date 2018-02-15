<style>
.editor {
  display: grid;
  grid-template-areas:
    "slides-toolbar   toolbox         inspector"
    "slides-toolbar   current-slide   inspector"
    "slides-toolbar   slide-controls  inspector";
  grid-template-columns: 250px minmax(300px, 1fr) 300px;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
}

.loading-overlay {
  background-color: white;
  color: rgba(0, 0, 0, 0.7);
  font-size: 2em;

  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 800px) {
  .editor {
      grid-template-columns: 1fr;
      grid-template-areas:
      "slide-controls"
      "current-slide"
      ;
  }
}
</style>

<template>
  <div class="editor">
    <transition name="fade">
      <div class="loading-overlay" v-if="editorLoading">
        Loading presentation..
      </div>
    </transition>

    <slides-toolbar></slides-toolbar>

    <toolbox></toolbox>

    <inspector></inspector>

    <slide-controls></slide-controls>

    <current-slide></current-slide>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SlidesToolbar from './SlidesToolbar.vue'
import Toolbox from './Toolbox.vue'
import Inspector from './Inspector.vue'
import SlideControls from './SlideControls.vue'
import CurrentSlide from './CurrentSlide.vue'

export default {
  name: 'slide-editor',
  components: {
    'slides-toolbar': SlidesToolbar,
    'toolbox': Toolbox,
    'inspector': Inspector,
    'slide-controls': SlideControls,
    'current-slide': CurrentSlide
  },
  created () {
    this.$store.dispatch('fetchPresentation', this.$route.params.slideId)
  },
  computed: {
    ...mapGetters(['currentSlide', 'selectedElementIndex', 'editorLoading'])
  },
  methods: {
    inspectElement (index) {
      this.$store.commit('setSelectedElementIndex', index)
    }
  }
}
</script>
