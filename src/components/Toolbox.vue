<style>
.toolbox {
  grid-area: toolbox;
  background-color: rgba(0, 0, 0, 0.4);
  list-style: none;
  z-index: 2;
  padding: 0.5em;
  
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  justify-content: center;
}

.toolbox li a {
  padding: 0.7em;

  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-gap: 1em;
  grid-template-columns: auto 1fr;
  border-radius: 5px;
}

.toolbox li:hover a,
.toolbox li a:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

@media (max-width: 800px) {
  .toolbox {
    display: none;
  }
}
</style>

<template>
  <ul class="toolbox">
    <li>
      <a href="#" @click="createText">
        <i class="material-icons">text_fields</i>
        <span>New text</span>
      </a>
    </li>

    <li>
      <a href="#" @click="createImage">
        <i class="material-icons">photo</i>
        <span>New image</span>
      </a>
    </li>
  </ul>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'toolbox',
  methods: {
    ...mapActions('editor', ['createText', 'createImage'])
  }
}
</script>
