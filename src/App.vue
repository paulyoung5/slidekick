<style>
* {
  /* Some resets for sanity */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Colour Palette */
  --primary-colour: hsl(167, 72%, 40%);
  --primary-colour-hover: hsl(167, 72%, 35%);
  
  --dark-grey: hsl(0, 0%, 25%);
  --medium-grey: hsl(0, 0%, 40%);
  
  /* Font stacks */
  --system-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  
  /* Specific variables */
  --body-text-colour: white;
  --canvas-zoom-level: 1;
  --canvas-background-colour: white;
}

html, body {
  height: 100vh;
}

body {
  font: 14px var(--system-font);
  color: var(--body-text-colour);
  display: grid;
}

body, .app, .app > * {
  width: 100vw;
  overflow: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

.app {
  background-color: var(--dark-grey);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "top-bar"
    "router-view"
  ;
}

.app.top-bar-hidden {
  grid-template-rows: 1fr;
  grid-template-areas:
    "router-view"
  ;
}

/* Add extra side padding for iphone X users */
@media only screen 
    and (device-width : 375px) 
    and (device-height : 812px) 
    and (-webkit-device-pixel-ratio : 3) {
  .content {
    padding: 2em;
  }
}
</style>

<template>
  <div class="app" :class="appConditionalStyles">
    <loading-overlay :show="pageLoading"></loading-overlay>

    <top-bar></top-bar>

    <transition name="fade">
      <router-view class="content" v-show="!pageLoading"></router-view>
    </transition>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import TopBar from '@/components/TopBar.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

export default {
  name: 'app',
  components: {
    'top-bar': TopBar,
    'loading-overlay': LoadingOverlay
  },
  computed: {
    ...mapGetters(['pageLoading']),
    hideTopBar () {
      return this.$route.meta.hideTopBar
    },
    appConditionalStyles () {
      return {
        'top-bar-hidden': this.hideTopBar
      }
    }
  },
  methods: {
    ...mapActions(['setPageLoading'])
  },
  watch: {
    '$route': function (route) {
      if (route.meta.showLoading) {
        this.setPageLoading(true)
      }
    }
  }
}
</script>