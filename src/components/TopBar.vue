<style scoped>
.top-bar {
  grid-area: top-bar;
  
  transition: 0.3s all ease-in-out;
  
  display: grid;
  align-content: center;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 60px;
  grid-template-areas: "primary-actions brand secondary-actions";
}

.primary-actions {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: auto 1fr;
  grid-template-areas: "back-button presentation-title";
  align-items: center;
  justify-items: space-between;
}

.back-button {
  grid-area: back-button;
  padding: 1em;

  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-colour);
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.back-button i {
  font-size: 2em;
}

.presentation-title {
  grid-area: presentation-title;

  display: grid;
  grid-template-columns: 1fr auto;
}

.presentation-title input,
.presentation-title i {
  padding: 0.3em 0.4em;
  color: white;
}

.presentation-title input {
  background-color: transparent;
  border: 0;
  font-size: 1.1em;
  padding: 0.3em 0.4em;
  border-radius: 3px 0 0 3px;
  text-shadow: 0 1px 5px rgba(0, 0,0 , 0.5);
}
.presentation-title i {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 0 3px 3px 0;
  font-size: 1em;

  display: flex;
  align-items: center;
  justify-content: center;
}

.presentation-title input:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.presentation-title input:focus {
  background-color: rgba(0, 0, 0, 0.3);
}

.presentation-title input:hover + i,
.presentation-title input:focus + i {
  visibility: visible;
}

.brand {
  grid-area: brand;

  display: flex;
  align-items: center;
  justify-content: center;
}

.brand svg {
  transition: 0.3s fill ease-in-out;
  fill: rgba(255, 255, 255, 0.5);
}

.brand a:hover svg {
  fill: var(--primary-colour);
}

.presentation-actions {
  grid-area: presentation-actions;
}

.secondary-actions {
  grid-area: secondary-actions;
  padding: 1em;

  display: grid;
  grid-gap: 1em;
  align-items: center;
  justify-items: end;
}

.secondary-actions a {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5em 0.8em;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  transition: 0.3s all ease-in-out;

  display: grid;
  grid-gap: 1em;
  grid-template-columns: auto 1fr;
  align-items: center;
}
.secondary-actions a i {
  font-size: 1em;
}

.secondary-actions a:hover {
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--dark-grey);
}

@media (max-width: 800px) {
  .presentation-title,
  .secondary-actions {
    display: none;
  }
}
</style>

<template>
    <div class="top-bar" v-show="!pageLoading && !hideTopBar">
      <div class="primary-actions">
        <router-link to="/" class="back-button" v-show="displayBack">
          <i class="material-icons">keyboard_arrow_left</i>
        </router-link>

        <div class="presentation-title" v-if="editorMode">
          <input type="text" :value="title">
          <i class="material-icons">edit</i>
        </div>
      </div>

      <div class="brand">
        <router-link to="/">
          <svg preserveAspectRatio="xMidYMid meet" width="40" height="40" viewBox="0 0 155 117" xmlns="http://www.w3.org/2000/svg">
            <symbol id="logo">
              <path d="M91 97L25 20H10a10 10 0 1 1 0-20h135a10 10 0 0 1 0 20H63l66 77h16a10 10 0 0 1 0 20H10a10 10 0 0 1 0-20h81z" />
            </symbol>

            <use xlink:href="#logo"></use>
          </svg>
        </router-link>
      </div>

      <div class="secondary-actions">
        <router-link :to="{ name: 'presenter', params: { presentationId: presentationId }}" v-if="editorMode">
          <i class="material-icons">play_circle_outline</i> Present
        </router-link>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'top-bar',
  computed: {
    ...mapGetters(['pageLoading']),
    ...mapGetters('editor', ['title', 'presentationId']),

    hideTopBar () {
      return this.$route.meta.hideTopBar
    },
    displayBack () {
      return this.$route.name !== 'dashboard'
    },
    editorMode () {
      return this.$route.name === 'editor'
    },
    user () {
      return false
    }
  }
}
</script>
