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
  background-color: var(--dark-grey);
}

body {
  font: 14px var(--system-font);
  color: var(--body-text-colour);
  height: 100vh;
  display: grid;
}

a {
  color: inherit;
  text-decoration: none;
}

.app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "top-bar"
    "router-view"
  ;
}

.pagechange-enter-active, .pagechange-leave-active {
  transition: opacity .3s;
}

.pagechange-enter, .pagechange-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="app">
    <top-bar></top-bar>

    <transition name="pagechange">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'

export default {
  name: 'app',
  components: {
    'top-bar': TopBar
  }
}
</script>