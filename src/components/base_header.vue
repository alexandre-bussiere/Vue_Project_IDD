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
.linkNav
{
  display: flex;
  padding: 20px;
  justify-content: space-around;
  font-size: 18px;

  color: #333;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
}

.base-header 
{

  display: flex;
  justify-content: space-between; /* Sépare le logo des éléments du menu */
  align-items: center; /* Aligne verticalement les éléments */
  background-color: #c8cacc;
  padding: 12px 24px;
  border-bottom: 1px solid #ddd;
  
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

#logo {
  height: 50px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;

}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin: 0 20px;
  color: #28a745;
  cursor: pointer;
  font-size: 18px;

  font-weight: bold;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}

nav ul li:hover {
  text-decoration: underline;
}

</style>
