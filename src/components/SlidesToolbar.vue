<style>
.slides-toolbar {
  grid-area: slides-toolbar;
  counter-reset: slides-counter;
  
  background-color: var(--medium-grey);
  list-style: none;
  padding: 1em;
  z-index: 1;
  
  display: grid;
  grid-gap: 1em;
  
  grid-template-columns: 1fr;
  align-items: start;
  align-content: start;
  justify-content: start;
}

.slides-toolbar li {
  color: var(--dark-grey);
  border-radius: 5px;
  padding: 0.5em;
  height: 120px;
  cursor: move;
  
  display: flex;
  justify-content: flex-end;
}

.slides-toolbar li a {
  background-color: white;
  position: relative;
  width: calc(100% - 2em - 6px);
  border: 3px solid var(--dark-grey);
  cursor: default;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  user-select: none;
  -moz-user-select: none;
}

.slides-toolbar li a::before {
  counter-increment: slides-counter;
  content: counter(slides-counter);
  
  position: absolute;
  top: 0;
  left: calc(-2em - 6px);
  width: 2em;
  height: 1.5em;
  
  text-align: center;
  color: white;
  font-weight: bold;
  cursor: move;
}

.slides-toolbar li:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.slides-toolbar li.selected {
  background-color: rgba(0, 0, 0, 0.1);
}

.slides-toolbar li.selected a {
  border-color: var(--primary-colour);
}

@media (max-width: 800px) {
  .slides-toolbar {
    display: none;
  }
}
</style>

<template>
    <ul class="slides-toolbar">
      <li v-for="(slide, i) in slides" :key="i" :class="{'selected': selected === i}" @click="select(i)">
        <a href="#" @click="select(i)">[slide {{ i + 1 }}]</a>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'slides-toolbar',
  props: {selected: Number, slides: Array},
  methods: {
    select (index) {
      this.$emit('update:selected', index)
    }
  }
}
</script>
