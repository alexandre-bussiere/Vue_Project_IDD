<template>
  <header class="base-header">
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
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
}

nav ul li {
  font-weight: bold;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}

nav ul li a:hover {
  color: #00438a;
}
</style>
