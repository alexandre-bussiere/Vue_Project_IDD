<template>
    <!-- <img id ="logo" src="../assets/Mail_Logo.PNG" alt="description de l'image"> -->
    <nav class = "linkNav">
        <router-link to="/">Home</router-link>

        <!-- Google part -->
        <router-link v-if="connection === 'Google'" to="/get-email">Get Email</router-link>
        <router-link v-if="connection === 'Google'" to="/send-email">Send Email</router-link>
        <router-link v-if="connection === 'Google'" to="/delete-email">Delete Email</router-link>

        <!-- Microsoft Part -->
        <router-link v-if="connection === 'Microsoft'" to="/send">Send Email</router-link>
        <router-link v-if="connection === 'Microsoft'" to="/management">Email Management</router-link>

    </nav> 
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
/* Conteneur de navigation */
nav.linkNav {
  display: flex;
  justify-content: center;
  gap: 15px;
  background-color: #2c3e50;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Lien de navigation */
nav.linkNav a {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

nav.linkNav a:hover {
  background-color: #34495e;
  color: #fff;
}

/* Lien actif */
nav.linkNav a.router-link-exact-active {
  background-color: #3498db;
  color: #fff;
}
</style>

