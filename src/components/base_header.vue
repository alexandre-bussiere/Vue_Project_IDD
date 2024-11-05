<template>
  <header class="base-header">
    <img id ="logo" src="../assets/Mail_Logo.png" alt="description de l'image">
    <nav>
      <ul>
        <li>Home</li>
        <li>Get Email</li>
        <li>Send Email</li>
        <li>Delete Email</li>
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
}

nav ul li:hover {
  text-decoration: underline;
}


</style>
