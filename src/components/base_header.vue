<template>
  <header class="base-header">
    <img id ="logo" src="../assets/Mail_Logo.png" alt="description de l'image">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/get-email">Get Email</router-link></li>
        <li><router-link to="/send-email">Send Email</router-link></li>
        <li><router-link to="/delete-email">Delete Email</router-link></li>
      </ul>
    </nav>
  </header>  
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BaseHeader',
  computed: {
    ...mapGetters(['getUser', 'getConversationTextId']),
    user() {
      return this.getUser;
    },
    conversationTextId() {
      return this.getConversationTextId;
    }
  }
};
</script>

<style scoped>
.base-header {

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
