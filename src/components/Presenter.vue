<style>
  .presenter {
    background-color: black;

    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "presenter-toolbar"
      "current-slide"
    ;
  }

  .presenter.ui-hidden,
  .presenter.ui-hidden * {
    cursor: none !important;
  }

  .presenter .presenter-toolbar,
  .presenter.ui-hidden:hover .presenter-toolbar {
    opacity: 0;
    transform: translateY(-100%);
  }

  .presenter-toolbar {
    grid-area: presenter-toolbar;
    background-color: black;
    box-shadow: 0 4px 0 rgba(0, 0, 0, 0.05);
    z-index: 2;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-items: center;
  }

  .presenter-toolbar .left {
    justify-self: start;
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .presenter-toolbar .left .brand {
    background-color: var(--primary-colour);
    border-radius: 0;
    fill: rgba(0, 0, 0, 0.2);
    padding: 1em;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .presenter-toolbar .left .title {
    font-size: 1.1em;
    padding: 1em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .presenter-toolbar .controls {
    display: grid;
    align-items: center;
    grid-gap: 1em;
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
  }

  .presenter-toolbar .controls .index {
    font-size: 1.2em;
  }

  .presenter-toolbar .right {
    justify-self: end;
    padding-right: 1em;
  }
  .presenter-toolbar .right a {
    grid-template-columns: auto 1fr;
  }

  .presenter-toolbar a {
    display: grid;
    border-radius: 5px;
    padding: 0.5em 0.7em;
    grid-gap: 1em;
    align-items: center;
  }
  .presenter-toolbar a:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .presenter:hover .presenter-toolbar {
    opacity: 1;
    transform: none;
    transition: all 0.4s;
  }

  .presenter .current-slide g:hover {
    cursor: default;
  }
  .presenter .current-slide g .bbox,
  .presenter .current-slide g:hover .bbox,
  .presenter .current-slide g.inspecting .bbox {
    stroke: none;
  }
</style>

<template>
  <div class="presenter" :class="computedStyles">
    <div class="presenter-toolbar">
      <div class="left">
        <router-link to="/" class="brand">
          <svg preserveAspectRatio="xMidYMid meet" width="40" height="40" viewBox="0 0 155 117" xmlns="http://www.w3.org/2000/svg">
            <symbol id="logo">
              <path d="M91 97L25 20H10a10 10 0 1 1 0-20h135a10 10 0 0 1 0 20H63l66 77h16a10 10 0 0 1 0 20H10a10 10 0 0 1 0-20h81z" />
            </symbol>

            <use xlink:href="#logo"></use>
          </svg>
        </router-link>
        <span class="title">{{ presentation.title }}</span>
      </div>

      <div class="controls">
        <a href="#" @click="previous">
          <i class="material-icons">chevron_left</i>
        </a>

        <span class="index">
          {{ selectedSlideIndex + 1 }} / {{ presentation.slides.length }}
        </span>

        <a href="#" @click="next">
          <i class="material-icons">chevron_right</i>
        </a>
      </div>

      <div class="right">
        <a href="#" @click="enterFullscreen" v-if="!fullscreen">
          <i class="material-icons">fullscreen</i> Fullscreen
        </a>
        <a href="#" @click="exitFullscreen" v-else>
          <i class="material-icons">fullscreen_exit</i> Exit Fullscreen
        </a>
      </div>
    </div>
    <current-slide :slides="slides" :selected-slide-index="selectedSlideIndex"></current-slide>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import CurrentSlide from './CurrentSlide.vue'

export default {
  name: 'presenter',
  components: {
    'current-slide': CurrentSlide
  },
  data () {
    return {
      fullscreen: false,
      showUI: false,
      movemoveTimerActive: false
    }
  },
  computed: {
    ...mapGetters('presenter', ['presentation', 'selectedSlideIndex', 'slides']),
    computedStyles () {
      return {
        'ui-hidden': !this.showUI
      }
    }
  },
  methods: {
    ...mapActions('presenter', ['next', 'previous']),
    enterFullscreen () {
      const element = document.querySelector('.presenter')
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    },
    exitFullscreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    },
    onFullscreenChange (e) {
      this.fullscreen = document.fullscreen || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
    },
    onKeyup (e) {
      e.preventDefault()
      switch (e.keyCode) {
        case 37:
          this.previous()
          break
        case 39:
          this.next()
          break
      }
    },
    onMousemove () {
      if (this.movemoveTimerActive) {
        return
      }

      this.showUI = true
      this.movemoveTimerActive = true

      setTimeout(() => {
        this.showUI = false
        this.movemoveTimerActive = false
      }, 5000)
    }
  },
  created () {
    this.$store.dispatch('presenter/fetchPresentation', this.$route.params.presentationId)
  },
  mounted () {
    document.onkeydown = this.onKeyup
    document.addEventListener('mousemove', this.onMousemove)
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange)
    document.addEventListener('mozfullscreenchange', this.onFullscreenChange)
    document.addEventListener('msfullscreenchange', this.onFullscreenChange)
    document.addEventListener('fullscreenchange', this.onFullscreenChange)
  },
  beforeDestroy () {
    /* Make sure we get rid of the event listeners */
    window.removeEventListener('webkitfullscreenchange', this.onFullscreenChange)
    window.removeEventListener('mozfullscreenchange', this.onFullscreenChange)
    window.removeEventListener('msfullscreenchange', this.onFullscreenChange)
    window.removeEventListener('fullscreenchange', this.onFullscreenChange)
  }
}
</script>
