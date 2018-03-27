<style scoped>
.top-bar {
  grid-area: top-bar;
  
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  background-color: var(--dark-grey);
  border-bottom: 4px solid var(--primary-colour);
  transition: 0.3s all ease-in-out;
  
  display: grid;
  align-content: center;
  grid-template-columns: 1fr 2fr 1.2fr;
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

  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.secondary-actions a {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5em 0.8em;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  transition: 0.3s all ease-in-out;
  margin-left: 1em;

  display: grid;
  grid-gap: 1em;
  grid-template-columns: auto 1fr;
  align-items: center;
}
.secondary-actions a i {
  font-size: 1.2em;
}

.secondary-actions a:hover {
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--dark-grey);
}

@media only screen 
      and (device-width : 375px) 
      and (device-height : 812px) 
      and (-webkit-device-pixel-ratio : 3) {
  .top-bar {
    /* Status bar height on iOS 10 */
    padding: 20px 20px 0 20px;

    /* Status bar height on iOS 11.0 */
    padding-top: calc(constant(safe-area-inset-top) - 10px) calc(constant(safe-area-inset-right) - 2em) 0 calc(constant(safe-area-inset-left) - 2em);

    /* Status bar height on iOS 11+ */
    padding: calc(env(safe-area-inset-top) - 10px) calc(env(safe-area-inset-right) - 2em) 0 calc(env(safe-area-inset-left) - 2em);
  }
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
          <input type="text" v-model="presentationTitle" @blur="onBlur">
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
        <a
          href="#"
          ref="copyButton"
          v-if="editorMode"
          v-clipboard:copy="presentationUrl"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          <i class="material-icons">share</i>
          <span>Share</span>
        </a>
        <router-link :to="{ name: 'presenter', params: { presentationId: presentationId }}" v-if="editorMode" :disabled="savingState" :class="{ disabled: savingState }">
          <i class="material-icons">play_circle_outline</i>
          <span>Present</span>
        </router-link>
        <a href="#" @click.prevent="logout" v-if="$auth.check()">
          <i class="material-icons">exit_to_app</i>
          <span>Log out</span>
      </a>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

export default {
  name: 'top-bar',
  data () {
    return {
      userTyping: false,
      timer: null
    }
  },
  computed: {
    ...mapGetters(['pageLoading', 'savingState']),
    ...mapGetters('editor', ['title', 'presentationId']),
    presentationTitle: {
      get () {
        return this.title
      },
      set (value) {
        this.updateTitle(value)
      }
    },
    presentationUrl () {
      return window.location.href
    },
    hideTopBar () {
      return this.$route.meta.hideTopBar
    },
    displayBack () {
      return this.$route.name !== 'dashboard' && this.$route.name !== 'landing'
    },
    editorMode () {
      return this.$route.name === 'editor'
    },
    user () {
      return this.$auth.user()
    }
  },
  methods: {
    ...mapActions(['setPageLoading']),
    ...mapActions('editor', ['updateTitle', 'renamePresentation']),
    logout () {
      this.$auth.logout()
      this.setPageLoading(true)
      this.$router.push({name: 'landing'})
      setTimeout(() => {
        this.setPageLoading(false)
      }, 500)
    },
    onCopy (e) {
      window.alert('Editing link copied to clipboard')
    },
    onError (e) {
      window.alert('Failed to copy link')
    },
    onBlur ({target: {value}}) {
      this.renamePresentation({
        presentationId: this.presentationId,
        newTitle: value
      })
    }
  }
}
</script>
