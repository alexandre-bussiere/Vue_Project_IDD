<template>
  <div class="sign-in-container">
    <img class="logo" src="../assets/Microsoft_Logo_512px.png" alt="Microsoft logo" />
    <button @click="handleSignIn">Sign In with Microsoft</button>
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
.sign-in-container {
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 10px; 
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;

}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  height: 30px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}

button:hover {
  background-color: #45a049;
}

.logo {
  width: 25px;
  height: 25px;
}
</style>
