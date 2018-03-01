<style>
  .presenter {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "current-slide";
  }
</style>

<template>
  <div class="presenter">
    <current-slide></current-slide>
  </div>
</template>

<script>
import CurrentSlide from './CurrentSlide.vue'

export default {
  name: 'presenter',
  components: {
    'current-slide': CurrentSlide
  },
  created () {
    this.$store.dispatch('fetchPresentation', this.$route.params.presentationId)
  }
}
</script>
