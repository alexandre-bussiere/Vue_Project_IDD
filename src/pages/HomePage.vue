<template>
    <div v-if="user">
      <router-link to = "send">Send Email</router-link>
      <router-link to = "management">Email Management</router-link>
    </div>
  <div class="Home">
    <div  class ="siginInHome"> 
      <SigninButton />
    </div>
    <p v-if="user">Bienvenue, {{ user.name + ", "+ user.username }}!</p>
    <p v-else>Veuillez vous connecter pour continuer.</p>
  </div>
</template>

<script>
import {initialize} from '../lib/microsoftGraph.js';
import SigninButton from '../components/SigninButton_Microsoft.vue';
import { mapGetters } from 'vuex';

export default 
{
  name: 'HomePage',
  components: 
  {
    SigninButton
  },
  data() 
  {
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

.Home {
  align-content: center;  
  height: 50vh;  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Roboto', sans-serif;
  min-height: 50vh
}

.form-container {
  margin-top: 20px;
  text-align: left;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

input {
  margin-bottom: 15px;
  padding: 8px;
  width: 100%;
  font-size: 14px;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
.siginInHome
{
  display: flex;
  justify-content: space-around;
  
}
</style>
