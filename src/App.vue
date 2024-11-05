<template>
  <div div id="app" class="app-container">
    <base_layout>
      <router-view/>
    </base_layout>
  </div>
</template>

<script>

export default 
{
  name: 'App',
  components: 
  { 
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* S'assure que l'app prend toute la hauteur de la fenêtre */
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
