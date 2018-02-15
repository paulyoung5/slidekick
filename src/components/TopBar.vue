<style>
.top-bar {
  grid-area: top-bar;
  
  background-color: var(--primary-colour);
  transition: 0.3s all ease-in-out;
  padding: 1em;
  
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
}

.top-bar > * {
  padding: 1em;
}

.top-bar a.brand i {
  font-size: 2.5em;
}

.top-bar a.brand:hover i {
  color: rgba(0, 0, 0, 0.3);
}

.top-bar .center {
  display: grid;
  grid-template-columns: 1fr;
}

.top-bar .center span {
  font-size: 0.85em;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
}

.top-bar .center input {
  background: transparent;
  border: 0;
  color: white;
  font-size: 1.5em;
}

.top-bar .user {
  padding: 0;
  
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(2, auto);
  align-items: center;
}

.top-bar .user img {
  border-radius: 100px;
}

.top-bar .user span {
  font-weight: bold;
  padding: 1em;
}
</style>

<template>
    <div class="top-bar">
        <router-link to="/" class="brand">
          <i class="material-icons">slideshow</i>
        </router-link>
        
        <div class="center" v-if="title">
          <span>YOU ARE EDITING</span>
          <input type="text" :value="title">
        </div>
        <div class="center" v-else>
          <span>HOMEPAGE LINKS</span>
        </div>

        <div class="user" v-if="user">
            <img src="http://i.pravatar.cc/45" width="45" height="45" alt="">
            <span>John Doe</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'top-bar',
  computed: {
    ...mapGetters(['title']),
    user () {
      return false
    }
  }
}
</script>
