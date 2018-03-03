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

.inspector .section.hidden .options {
  height: 0;
  opacity: 0;
  padding: 0;
  transform: translateY(-100%);
  visibility: hidden;
  transition: 0.4s opacity transform;
}

.inspector .section.hidden .header a i {
  transform: rotate(180deg);
  transition: 0.4s all;
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

.inspector.inspecting .slide-properties.section  {
  display: none;
}

.inspector.inspecting .appearance.section,
.inspector.inspecting .position.section  {
  display: initial;
}

.inspector .appearance.section,
.inspector .position.section,
.inspector .font.section {
  display: none;
}

.inspector.inspecting.text-element .font.section {
  display: initial;
}

@media (max-width: 800px) {
  .inspector {
    display: none;
  }
}
</style>

<template>
  <div class="inspector" :class="computedStyles">
    <div class="slide-properties section">
      <div class="header">
        <span>PROPERTIES</span>
        <a href="#" @click.prevent="toggleSection">
          <i class="material-icons">arrow_drop_down</i>
        </a>
      </div>

      <div class="options">
        <label>Background</label>
        <colour-picker :value.sync="backgroundColour"></colour-picker>
      </div>
    </div>

    <div class="appearance section">
      <div class="header">
        <span>APPEARANCE</span>
        <a href="#" @click.prevent="toggleSection">
          <i class="material-icons">arrow_drop_down</i>
        </a>
      </div>

      <div class="options">
        <label>Fill</label>
        <colour-picker :value.sync="fill"></colour-picker>

        <label>Value</label>
        <input type="text" v-model="content">
      </div>
    </div>

    <div class="position section">
      <div class="header">
        <span>POSITION</span>
        <a href="#" @click.prevent="toggleSection">
          <i class="material-icons">arrow_drop_down</i>
        </a>
      </div>

      <div class="options">
        <label>X</label> <input type="number" min="0" step="1" v-model="xPosition">
        <label>Y</label> <input type="number" min="0" step="1" v-model="yPosition">
      </div>
    </div>

    <div class="font section">
      <div class="header">
        <span>FONT</span>
        <a href="#" @click.prevent="toggleSection">
          <i class="material-icons">arrow_drop_down</i>
        </a>
      </div>

      <div class="options">
        <label>Family</label>
        <select v-model="fontFamily">
          <option v-for="font in fonts" :value="font.name">{{ font.name }}</option>
        </select>

        <label>Size</label>
        <input type="number" step="5" min="10" max="200" v-model="fontSize">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ColourPicker from './ColourPicker'

export default {
  name: 'inspector',
  components: {
    'colour-picker': ColourPicker
  },
  data () {
    return {
      fonts: [
        {name: 'Arial'},
        {name: 'Verdana'},
        {name: 'Helvetica'},
        {name: 'Comic Sans MS'},
        {name: 'Impact'},
        {name: 'Times New Roman'},
        {name: 'Georgia'},
        {name: 'Courier'},
        {name: 'Courier New'}
      ]
    }
  },
  computed: {
    ...mapGetters('editor', ['currentSlide', 'currentElement']),
    computedStyles () {
      return {
        'inspecting': this.currentElement !== null,
        'text-element': this.currentElement ? this.currentElement && this.currentElement.type === 'TEXT' : false
      }
    },
    backgroundColour: {
      get () {
        return this.currentSlide ? this.currentSlide.backgroundColour : '#FFFFFF'
      },
      set (value) {
        return this.updateBackgroundColour(value)
      }
    },
    xPosition: {
      get () {
        return this.currentElement ? Number(this.currentElement.properties.x.substr(0, this.currentElement.properties.x.length - 2)) : 0
      },
      set (value) {
        this.updateX({element: this.currentElement, value: `${value}px`})
      }
    },
    yPosition: {
      get () {
        return this.currentElement ? Number(this.currentElement.properties.y.substr(0, this.currentElement.properties.y.length - 2)) : 0
      },
      set (value) {
        this.updateY({element: this.currentElement, value: `${value}px`})
      }
    },
    fill: {
      get () {
        return this.currentElement && this.currentElement.properties.fill ? this.currentElement.properties.fill : '#000000'
      },
      set (value) {
        this.updateFill({element: this.currentElement, value})
      }
    },
    content: {
      get () {
        return this.currentElement && this.currentElement.properties.content ? this.currentElement.properties.content : ''
      },
      set (value) {
        this.updateContent({element: this.currentElement, value})
      }
    },
    fontFamily: {
      get () {
        return this.currentElement ? this.currentElement.properties.fontFamily : ''
      },
      set (value) {
        this.updateFontFamily({element: this.currentElement, value})
      }
    },
    fontSize: {
      get () {
        return this.currentElement ? Number(this.currentElement.properties.fontSize.substr(0, this.currentElement.properties.fontSize.length - 2)) : '0px'
      },
      set (value) {
        this.updateFontSize({element: this.currentElement, value: `${value}px`})
      }
    }
  },
  methods: {
    ...mapActions('editor', ['updateBackgroundColour', 'updateX', 'updateY', 'updateFontFamily', 'updateFontSize', 'updateFill', 'updateContent']),
    toggleSection (e) {
      let sectionEl = e.currentTarget.parentElement.parentElement
      sectionEl.classList.toggle('hidden')
    }
  }
}
</script>
