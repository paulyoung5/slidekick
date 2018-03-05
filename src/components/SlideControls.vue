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
  grid-template-columns: 1fr 1.5fr 1fr;
  grid-gap: 2px;
}

.slide-controls .zoom li {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.2em;
  font-size: 0.9em;
  font-weight: bold;
  user-select: none;
}

.slide-controls .zoom li,
.slide-controls .zoom li a {
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-controls .zoom li a {
  font-size: 0.6em;
  padding: 0 0.3em;
}

.slide-controls .zoom li:first-child {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px 0 0 5px;
}

.slide-controls .zoom li:last-child {
  background-color: rgba(255, 255, 255, 0.1);
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
      <li>{{zoomLevel | percent}}</li>
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
    ...mapGetters('editor', ['zoomLevel'])
  },
  methods: {
    ...mapActions('editor', ['zoomIn', 'zoomOut'])
  },
  filters: {
    percent (value) {
      return `${Math.round(value * 100)}%`
    }
  },
  mounted () {
    this.canvas = document.querySelector('.current-slide svg')
  }
}
</script>
