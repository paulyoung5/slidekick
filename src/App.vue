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
  --primary-colour-translucent: hsla(167, 72%, 40%, 0.267);
  
  --dark-grey: hsl(0, 0%, 25%);
  --medium-grey: hsl(0, 0%, 40%);
  --light-grey: hsl(0, 0%, 80%);
  
  /* Font stacks */
  --system-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  
  /* Specific variables */
  --body-text-colour: white;
  --canvas-zoom-level: 1;
  --canvas-background-colour: white;
}

html {
  -webkit-locale: en-GB;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: 100%;
}

html, body, .app {
  background-color: var(--dark-grey);
  max-height: 100%;
  overflow: hidden;
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
  margin-top: 64px;
  margin-top: calc(env(safe-area-inset-top) + 64px);
  height: calc(100vh - 64px);
  height: calc(100vh - (env(safe-area-inset-top) + 64px));

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    "top-bar"
    "router-view"
  ;
}

.app.top-bar-hidden {
  margin-top: 0;
  height: 100vh;
  grid-template-rows: 1fr;
  grid-template-areas:
    "router-view"
  ;
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
  created () {
    this.$auth.login({
      rememberMe: false,
      redirect: null,
      success () {
        this.refreshUser().then(() => this.setPageLoading(false))
      },
      error () {
        this.setPageLoading(false)
      }
    })
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
