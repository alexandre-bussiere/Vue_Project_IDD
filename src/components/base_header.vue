<template>
  <header class="base-header">
    <nav>
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
  padding: 1rem;
  border-bottom: 1px solid #ddd;

  margin-bottom: 5rem;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

nav ul li a:hover {
  color: #00438a;
}

</style>
