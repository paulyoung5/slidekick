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

  .presenter-toolbar {
    grid-area: presenter-toolbar;
    background-color: black;
    z-index: 2;
    opacity: 0;
    transform: translateY(-100%);

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
</style>

<template>
  <div class="presenter">
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
        <a href="#">
          <i class="material-icons">chevron_left</i>
        </a>

        <span class="index">
          {{ selectedSlideIndex + 1 }} / {{ presentation.slides.length }}
        </span>

        <a href="#">
          <i class="material-icons">chevron_right</i>
        </a>
      </div>

      <div class="right">
        <a href="#">
          <i class="material-icons">fullscreen</i> Fullscreen
        </a>
      </div>
    </div>
    <current-slide></current-slide>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CurrentSlide from './CurrentSlide.vue'

export default {
  name: 'presenter',
  components: {
    'current-slide': CurrentSlide
  },
  computed: {
    ...mapGetters('presenter', ['presentation', 'selectedSlideIndex'])
  },
  created () {
    this.$store.dispatch('presenter/fetchPresentation', this.$route.params.presentationId)
  }
}
</script>
