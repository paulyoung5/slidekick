<style>
.top-bar {
  grid-area: top-bar;
  
  background-color: var(--primary-colour);
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

.top-bar .title {
  display: grid;
  grid-template-columns: 1fr;
}

.top-bar .title span {
  font-size: 0.85em;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
}

.top-bar .title input {
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
        <a href="#" class="brand">
            <i class="material-icons">slideshow</i>
        </a>
        <div class="title">
            <span>YOU ARE EDITING</span>
            <input type="text" :value="title">
        </div>
        <div class="user">
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
    ...mapGetters(['title'])
  }
}
</script>
