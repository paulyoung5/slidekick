<style>
.inspector {
  grid-area: inspector;
  
  background-color: var(--medium-grey);
  z-index: 1;
  
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  align-items: start;
  justify-items: stretch;
  align-content: start;
  justify-content: start;
}

.inspector .section {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
}

.inspector .section .header {
  background-color: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9em;
  
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr auto;
  align-items: center;
}

.inspector .section .header span {
  font-weight: bold;
  user-select: none;
  -moz-user-select: none;
}

.inspector .section .header span,
.inspector .section .header a {
  padding: 0.3em 0.7em;
}

.inspector .section .header a {
  display: flex;
  align-items: center;
  justify-content: center;
}
.inspector .section .header a:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.inspector .section .options {
  padding: 1em;
  
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: stretch;
}

.inspector .section .options input {
  width: 100%;
}

@media (max-width: 800px) {
  .inspector {
    display: none;
  }
}
</style>

<template>
  <div class="inspector">
    <div class="section" v-if="!currentElement">
      <div class="header">
        <span>PROPERTIES</span>
        <a href="#"><i class="material-icons">arrow_drop_down</i></a>
      </div>

      <div class="options">
      <label>Background</label> <input type="color" :value="backgroundColour" @input="updateBackgroundColour">
      </div>
    </div>

    <div class="section" v-else>
      <div class="header">
        <span>POSITION</span>
        <a href="#"><i class="material-icons">arrow_drop_down</i></a>
      </div>

      <div class="options">
        <label>X</label> <input type="text" v-model="coordinates.x">
        <label>Y</label> <input type="text" v-model="coordinates.y">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'inspector',
  computed: {
    ...mapGetters('editor', ['currentSlide', 'currentElement']),
    backgroundColour () {
      return this.currentSlide ? this.currentSlide.backgroundColour : '#FFFFFF'
    },
    coordinates () {
      return this.currentElement ? {x: this.currentElement.properties.x, y: this.currentElement.properties.y} : {x: 0, y: 0}
    }
  },
  methods: {
    ...mapActions('editor', ['updateBackgroundColour'])
  }
}
</script>
