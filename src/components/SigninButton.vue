<template>
  <div>
    <button @click="handleSignIn">Sign In</button>
    <div v-if="user">
      <p>Logged in as: {{ user.name }}</p>
      <p>Email: {{ user.username }}</p>
    </div>
  </div>
</template>

<script>
import { initialize, signInAndGetUser } from '../lib/microsoftGraph.js';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      user: null, // Stockage des informations utilisateur
    };
  },
  mounted() {
    initialize()
      .then(() => {
        console.log("MSAL Initialized and ready for use");
      })
      .catch(error => {
        console.error("Failed to initialize MSAL:", error);
      });
  },
  methods: {
    ...mapMutations(['setUser']),
    handleSignIn() {
      initialize()
        .then(() => {
          return signInAndGetUser();
        })
        .then(user => {
          this.setUser({
            name: user.name,
            username: user.username
          });
        })
        .catch(error => {
          console.error("Error during sign-in:", error);
        });
    
    },
  },
};
</script>

<style scoped>
button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
