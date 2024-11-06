<template>
  <div div id="app" class="app-container">
    <base_header/>
      <router-view/>
  </div>
</template>

<script>
import base_header from './components/base_header.vue';
export default 
{
  name: 'App',
  components: 
  { 
    base_header
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 90vh; /* S'assure que l'app prend toute la hauteur de la fenêtre */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  flex: 1; /* Permet au contenu de prendre l'espace disponible entre le header et le footer */
  display: flex;
  justify-content: center; /* Centrer le contenu horizontalement */
  align-items: center; /* Centrer le contenu verticalement */
  padding: 20px;
}
</style>
