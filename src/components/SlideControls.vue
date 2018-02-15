<style>
.slide-controls {
  grid-area: slide-controls;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1em;
  z-index: 2;
  
  display: grid;
  grid-template-columns: auto 1fr auto;
}

.slide-controls .zoom {
  list-style: none;
  
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2px;
}

.slide-controls .zoom li,
.slide-controls .zoom li a {
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-controls .zoom li a {
  padding: 0.2em 0.5em;
  background-color: var(--medium-grey);
  font-size: 0.5em;
}

.slide-controls .zoom li:first-child a {
  border-radius: 5px 0 0 5px;
}

.slide-controls .zoom li:last-child a {
  border-radius: 0 5px 5px 0;
}
</style>

<template>
  <div class="slide-controls">
    <ul class="zoom">
      <li>
        <a href="#" @click="zoomIn">
          <i class="material-icons">zoom_in</i>
        </a>
      </li>
      <li>
        <a href="#" @click="zoomOut">
          <i class="material-icons">zoom_out</i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'slide-controls',
  computed: {
    ...mapGetters(['zoomLevel'])
  },
  methods: {
    ...mapActions(['zoomIn', 'zoomOut'])
  },
  mounted () {
    this.canvas = document.querySelector('.current-slide svg')
  }
}
</script>
