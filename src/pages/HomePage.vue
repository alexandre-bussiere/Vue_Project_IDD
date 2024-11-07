<template>
  <div class="home">
    <h1>Home Page</h1>
    <div v-if="user">
      <p>Welcome, {{ user.name }} !</p>
    </div>
    <div v-else>
      <p>Please sign in to continue.</p>
    </div>
    <div class="login-container">
    </div>
    <div class="Extra-login">
      <SigninButtonMicrosoft />
      <SigninButtonGoogle />
    </div>
  </div>
</template>

<script>
import {initialize} from '../lib/microsoftGraph.js';
import SigninButtonMicrosoft from '../components/SigninButton_Microsoft.vue';
import SigninButtonGoogle from '@/components/SigninButton_Google.vue';
import { mapGetters } from 'vuex';

export default 
{
  name: 'HomePage',

  components: 
  {
    SigninButtonMicrosoft,
    SigninButtonGoogle,
  },
  computed: 
  {
    ...mapGetters(['getUser']), 
    user() 
    {
      return this.getUser;
    }
  },

  async mounted() 
  {
    try
    {
      await initialize(); // Initialiser MSAL
    }
    catch (error) 
    {
      console.error("Error during MSAL initialization: ", error);
    }
  },
};
</script>

<style scoped>

.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

.Extra-login {
  display: flex;
  flex-direction: column;
  justify-content: center;  
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 300px;
  margin: auto;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  background-color: #f4f4f4;
}

</style>
