<style type="text/css" scoped>
  .my-presentations {
    padding: 2em;

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
    overflow: hidden;
    transition: 0.3s all ease-out;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }

  .my-presentations > a:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
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

    display: grid;
    grid-gap: 0.5em;
    grid-template-areas:
      "title        manage"
      "last-opened  manage"
    ;
    grid-template-columns: 1fr auto;
    align-items: center;
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
  .pres-info .last-opened .editor {
    font-weight: bold;
  }

  .pres-info .manage {
    grid-area: manage;
  }

  @media (max-width: 600px) {
    .my-presentations {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      justify-items: stretch;
    }
  }
</style>

<template>
  <div class="my-presentations">
    <a href="#" class="create">
      <i class="material-icons">add</i>
    </a>
    
    <router-link to="/editor/22">
      <div class="preview">
        slide preview goes here!
      </div>

      <span class="pres-info">
        <span class="title">Presentation title</span>
        <span class="last-opened">Edited <span class="date">Thu 15 Feb</span> by <span class="editor">Paul</span></span>
        
        <a href="#" class="manage">
          <i class="material-icons">more_vert</i>
        </a>
      </span>
    </router-link>
    
    <router-link to="/editor/345">go to slide id #345 (doesn't exist)</router-link>
  </div>
</template>

<script>
export default {
  name: 'dashboard'
}
</script>