<style type="text/css">
  .user-dashboard {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "dashboard-header"
      "my-presentations"
    ;
    overflow-y: scroll;
  }

  /* Add extra side padding for iphone X users */
  @media only screen 
        and (device-width : 375px) 
        and (device-height : 812px) 
        and (-webkit-device-pixel-ratio : 3) {
    .user-dashboard {
      padding: 0 calc(env(safe-area-inset-right) + 0.5em) 0 calc(env(safe-area-inset-left) + 0.5em)
    }
  }

  .dashboard-header {
    grid-area: dashboard-header;
    padding: 2em;
    align-self: start;
    height: auto;
  }

  .my-presentations {
    grid-area: my-presentations;
    padding: 0 2em 2em 2em;

    display: grid;
    grid-gap: 2em;
    grid-template-columns: repeat(auto-fit, 350px);
    grid-template-rows: 250px;
    grid-auto-rows:  250px;
  }

  .my-presentations > a {
    border: 3px solid transparent;
    background-color: white;
    color: var(--dark-grey);
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s all ease-out;

    overflow: visible;
    min-height: 0;
    min-width: 0;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }

  .my-presentations > a:first-child {
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .my-presentations > a:first-child:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .my-presentations > a:first-child i {
    font-size: 4em;
  }

  .my-presentations > a .preview {
    background: linear-gradient(to bottom right, purple, pink);
    color: rgba(0, 0, 0, 0.6);
    font-weight: bold;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .my-presentations > a:hover:not(.create) {
    border-color: var(--primary-colour);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
  }

  .my-presentations > a:hover .pres-info .title {
    color: var(--primary-colour);
  }

  .pres-info {
    padding: 1em;

    box-shadow: 0 -2px 0 rgba(0, 0, 0, 0.2);

    display: inline-grid;
    grid-gap: 0.5em;
    grid-template-areas:
      "title        manage"
      "last-opened  manage"
    ;
    grid-template-columns: minmax(auto, 1fr) auto;
    align-items: center;
  }

  .pres-info,
  .pres-info * {
    overflow: hidden;
    min-height: 0;
    min-width: 0;
  }

  .pres-info {
    overflow: visible;
  }

  .pres-info .title {
    grid-area: title;
    font-weight: bold;
  }

  .pres-info .last-opened {
    grid-area: last-opened;
    color: var(--medium-grey);
    font-size: 0.9em;
  }

  .pres-info .last-opened .date,
  .pres-info .last-opened .edited-by {
    font-weight: bold;
  }

  .pres-info .manage {
    grid-area: manage;
    border-radius: 5px 5px 0 0;
    height: 2.5em;
    width: 2.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: visible;
  }

  .pres-info .manage ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 200px;
    border-radius: 0 5px 5px 5px;
    color: white;
    visibility: hidden;
    opacity: 0;

    display: grid;
  }

  .pres-info .manage ul li a {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: auto 1fr;
    align-items: center;
    padding: 0.7em 0.9em;
  }
  .pres-info .manage ul li a i {
    font-size: 1.4em;
  }
  .pres-info .manage ul li a:hover {
    background-color: var(--primary-colour);
    transition: 0.4s all;
  }

  .pres-info .manage:hover {
    color: white;
  }

  .pres-info .manage:hover,
  .pres-info .manage ul {
    background-color: rgba(0, 0, 0, 0.6);
    transition: 0.4s all;
  }

  .pres-info .manage:hover ul {
    visibility: visible;
    opacity: 1;
    transition: 0.4s all;
  }

  @media
  (orientation: landscape) and (max-width: 820px),
  (orientation: portrait) and (max-width: 300px) {
    .my-presentations {
      grid-template-columns: 1fr;
      grid-template-rows: 125px;
      align-content: start;
    }

    .my-presentations > a .preview {
      display: none;
    }
  }
</style>

<template>
  <div class="user-dashboard">
    <div class="dashboard-header">
      <h3>My Presentations</h3>
    </div>

    <div class="my-presentations">

      <a href="#" class="create" @click.prevent="createNew">
        <i class="material-icons">add</i>
      </a>
      
      <router-link v-for="presentation in presentations" :key="presentation.id" :to="{ name: 'editor', params: { presentationId: presentation.id }}">
        <div class="preview">
          slide preview goes here!
        </div>

        <span class="pres-info">
          <span class="title">{{ presentation.title }}</span>
          <span class="last-opened">Edited <span class="date">Thu 15 Feb</span> by <span class="edited-by">Paul</span></span>
          
          <a href="#" class="manage" @click.prevent>
            <i class="material-icons">more_vert</i>
            <ul>
              <li>
                <a href="#" @click="renamePresentation(presentation.id)">
                  <i class="material-icons">edit</i>
                  <span>Rename presentation</span>
                </a>
              </li>
              <li>
                <a href="#" @click="deletePresentation(presentation.id)">
                  <i class="material-icons">delete</i>
                  <span>Delete presentation</span>
                </a>
              </li>
            </ul>
          </a>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters('dashboard', ['presentations'])
  },
  methods: {
    ...mapActions('dashboard', ['fetchPresentations', 'createNewPresentation', 'renamePresentation', 'deletePresentation']),
    createNew () {
      return this.createNewPresentation()
    }
  },
  created () {
    this.fetchPresentations()
  }
}
</script>
