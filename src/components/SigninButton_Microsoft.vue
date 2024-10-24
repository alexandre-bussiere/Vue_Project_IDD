<template>
  <div>
    <button :disabled="isDisabled" @click="handleSignIn">Sign In</button>
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
      user: null,
      isDisabled: false,
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
          this.isDisabled = true;
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
  background-color: #28a745;
  border: none;
  color: white; 
  padding: 12px 24px; 
  text-align: center;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  margin: 12px;
}

button:hover {
  background-color: #32d755;
  transform: translateY(-2px);
}

button:active {
  background-color: #282d29;
  transform: translateY(0);
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed; 
}

</style>
