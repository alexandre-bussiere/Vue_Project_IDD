<template>
    <nav class = "linkNav">
        <router-link to="/">Home</router-link>

        <!-- Google part -->
        <router-link v-if="connection === 'Google'" to="/get-email">Email</router-link>
        <router-link v-if="connection === 'Google'" to="/send-email">Send Email</router-link>
        <router-link v-if="connection === 'Google'" to="/search-email">Search Email</router-link>

        <!-- Microsoft Part -->
        <router-link v-if="connection === 'Microsoft'" to="/send">Send Email</router-link>
        <router-link v-if="connection === 'Microsoft'" to="/management">Email Management</router-link>
        <router-link v-if="connection === 'Microsoft'" to="/search">Search Email</router-link>
    </nav> 
    <br>
    <br>
    <br>
    <br>
</template>

<script>
import { mapGetters } from 'vuex';

export default 
{
  name: 'BaseHeader',
  computed: 
  {
    ...mapGetters(['getUser', 'getConnection']),

    user() 
    {
      return this.getUser;
    },
    
    connection() 
    {
      return this.getConnection;
    }
  }
};
</script>
<style scoped>
/* Réinitialisation des marges et du padding */
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Conteneur de navigation */
nav.linkNav {
  position: fixed; /* Fixe la barre de navigation en haut */
  top: 0;
  left: 0;
  width: 100vw; /* Prend toute la largeur de la fenêtre */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  background-color: #2c3e50;
  padding: 15px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Place la barre de navigation au-dessus des autres éléments */
}

/* Ajout de margin-top pour compenser la hauteur du nav */
body {
  margin-top: 60px; /* Ajustez cette valeur selon la hauteur du nav */
}

/* Lien de navigation */
nav.linkNav a {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 18px;
}

/* Couleur de fond lors du survol */
nav.linkNav a:hover {
  background-color: #34495e;
  color: #fff;
}

/* Style pour le lien actif */
nav.linkNav a.router-link-exact-active {
  background-color: #3498db;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
</style>

