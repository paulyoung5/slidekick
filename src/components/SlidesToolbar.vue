<style>
.slides-toolbar {
  grid-area: slides-toolbar;
  counter-reset: slides-counter;
  
  background-color: var(--medium-grey);
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  
  display: grid;
  
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
}

.slides-toolbar ul {
  list-style: none;
}

.slides-toolbar ul.actions {
  display: grid;
  align-items: center;
  justify-items: end;
  grid-gap: 1em;
  background-color: rgba(0, 0, 0, 0.4);
}

.slides-toolbar ul.actions li {
  display: grid;
  grid-template: 1fr / 1fr;
}
.slides-toolbar ul.actions li a {
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  grid-gap: 1em;
  grid-template-columns: auto 1fr;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1em;
  font-weight: bold;
}
.slides-toolbar ul.actions li a i {
  font-size: 1.2em;
}
.slides-toolbar ul.actions li a:hover {
  background-color: rgba(0, 0, 0, 0.6);
  transition: 0.2s background-color;
}

.slides-toolbar ul.slides {
  display: grid;
  grid-gap: 1em;
  padding: 1em;
  
  grid-template-columns: 1fr;
  align-items: start;
  align-content: start;
  justify-content: start;
}

.slides-toolbar ul.slides li {
  color: var(--dark-grey);
  border-radius: 5px;
  padding: 0.5em;
  height: 120px;
  position: relative;
  
  display: flex;
  justify-content: flex-end;
}

.slides-toolbar ul.slides li.dragging-over {
  opacity: 0.5;
  transform: scale(0.7);
  transition: 0.4s all;
}
.slides-toolbar ul.slides li.dragging-over::before {
  content: '';
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.slides-toolbar ul.slides li a.preview {
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

.slides-toolbar ul.slides li a.preview::before {
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

.slides-toolbar ul.slides li:hover a.delete {
  transition: 0.2s all;
  visibility: visible;
  opacity: 1;
}

.slides-toolbar ul.slides li a.delete {
  visibility: hidden;
  opacity: 0;
  background-color: rgba(0, 0,0 , 0.7);
  color: white;
  position: absolute;
  bottom: 1em;
  right: 1em;
  width: auto;
  border: 0;
  padding: 0.3em 0.5em;
  font-size: 0.7em;
  border-top-left-radius: 3px;
  cursor: pointer;

  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: auto 1fr;
  align-items: center;
  justify-content: space-between;
}
.slides-toolbar ul.slides li a.delete i {
  font-size: 1.6em;
}
.slides-toolbar ul.slides li a.delete span {
  text-transform: uppercase;
  font-weight: bold;
}

.slides-toolbar ul.slides li:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.slides-toolbar ul.slides li.selected {
  background-color: rgba(0, 0, 0, 0.1);
}

.slides-toolbar ul.slides li.selected a.preview {
  border-color: var(--primary-colour);
}

.slides-toolbar ul.slides .slides-list-enter-active,
.slides-toolbar ul.slides .slides-list-leave-active {
  transition: all 0.3s;
}
.slides-toolbar ul.slides .slides-list-enter,
.slides-toolbar ul.slides .slides-list-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.slides-toolbar ul.slides .slides-list-move {
  transition: transform 0.4s;
}

@media only screen 
      and (device-width : 375px) 
      and (device-height : 812px) 
      and (-webkit-device-pixel-ratio : 3) {
  .slides-toolbar {
    padding-left: env(safe-area-inset-left);
    overflow-y: scroll;
  }

  .slides-toolbar ul.slides li {
    height: 62px;
    padding: 0;
  }

  .slides-toolbar ul.slides li a.preview {
    width: 100%;
    height: 100%;
    border-width: 4px;
  }

  .slides-toolbar ul.slides li a.preview::before {
    display: none;
  }
}

@media (max-width: 800px) {
  .slides-toolbar {
    display: none;
  }
}
</style>

<template>
  <div class="slides-toolbar">
    <ul class="actions">
      <li>
        <a href="#" @click="createSlide">
          <i class="material-icons">library_add</i>
          <span>New slide</span>
        </a>
      </li>
    </ul>
    <transition-group tag="ul" name="slides-list" class="slides">
      <li
        draggable="true"
        @dragstart="dragstart(i)"
        @dragover.prevent="dragover(i)"
        @dragend.prevent="dragend"
        v-for="(slide, i) in slides"
        :key="i"
        :class="{'selected': selectedSlideIndex === i, 'dragging-over': draggingSlideIndex !== i && replaceSlideIndex === i}"
      >
        <a href="#" class="preview" @click="selectSlideFromList(i)">
          [slide {{ i + 1 }}]
        </a>
        <a href="#" class="delete" @click="deleteSlide(i)">
          <i class="material-icons">delete</i>
          <span>Delete</span>
        </a>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'slides-toolbar',
  data () {
    return {
      draggingSlideIndex: null,
      replaceSlideIndex: null
    }
  },
  computed: {
    ...mapGetters('editor', ['slides', 'selectedSlideIndex'])
  },
  methods: {
    ...mapActions('editor', ['selectSlideFromList', 'createSlide', 'deleteSlide', 'moveSlide']),
    dragstart (slideIndex) {
      this.draggingSlideIndex = slideIndex
    },
    dragover (slideIndex) {
      this.replaceSlideIndex = slideIndex
    },
    dragend () {
      if (this.draggingSlideIndex !== this.replaceSlideIndex) {
        this.moveSlide({
          draggingSlideIndex: this.draggingSlideIndex,
          replaceSlideIndex: this.replaceSlideIndex
        })
      }
      this.draggingSlideIndex = null
      this.replaceSlideIndex = null
    }
  }
}
</script>
