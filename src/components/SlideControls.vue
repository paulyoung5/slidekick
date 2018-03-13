<style>
.slide-controls {
  grid-area: slide-controls;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1em;
  z-index: 2;
  
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "zoom . users";
}

.slide-controls .zoom {
  list-style: none;
  grid-area: zoom;
  
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

.slide-controls .users {
  grid-area: users;
  list-style: none;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.slide-controls .users li {
  margin-left: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background-color: red;
  font-size: 1.2em;
  padding: 0.5em 0.8em;
  font-weight: bold;
  color: white;
  user-select: none;
  transition: 0.2s all ease-in-out;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
  position: relative;
}

.slide-controls .users li span {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: -60%;
  right: 0;
  white-space: nowrap;
  font-size: 0.8em;
  padding: 0.5em 0.7em;
  display: inline-block;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  transform: translateY(20%);
}

.slide-controls .users li:hover {
  transform: translateY(-5px) scale(1.1);
  transition: 0.2s all;
}

.slide-controls .users li:hover span {
  visibility: visible;
  opacity: 1;
  transform: none;
  transition: 0.4s all;
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

    <ul class="users">
      <li v-for="user in users">
        {{ user.name | initial }}
        <span>{{ user.name }} is editing</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'slide-controls',
  data () {
    return {
      users: [
        {name: 'Paul'},
        {name: 'Dan'}
      ]
    }
  },
  computed: {
    ...mapGetters('editor', ['zoomLevel'])
  },
  methods: {
    ...mapActions('editor', ['zoomIn', 'zoomOut'])
  },
  filters: {
    percent (value) {
      return `${Math.round(value * 100)}%`
    },
    initial (name) {
      return name.length ? name[0] : ''
    }
  },
  mounted () {
    this.canvas = document.querySelector('.current-slide svg')
  }
}
</script>
