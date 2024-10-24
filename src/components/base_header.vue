<template>
  <header class="base-header">
    <nav>
      <img id ="logo" src="../assets/Mail_Logo.png" alt="description de l'image">
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
#logo
{
  background-color: #f8f9fa;
  position:fixed;
  top: 0;
  left: 1%;
  height: 80px;
  /* width: 10%; */
}
.base-header {
  background-color: #c8cacc;
  color:#28a745;
  padding: 24px;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  left:0;
  width: 100%;
  height: 32px;
  /* margin-bottom: 5rem; */
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
}

li
{
  margin-inline: 50px;
}

</style>
