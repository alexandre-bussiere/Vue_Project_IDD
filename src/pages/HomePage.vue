<template>
  <div class="Home">
    <SigninButton />
    <p v-if="user">Bienvenue, {{ user.name + ", "+ user.username }}!</p>
    <p v-else>Veuillez vous connecter pour continuer.</p>
    <div>
      <emailManagementComponent/>
    </div>
  </div>
</template>

<script>
import {initialize} from '../lib/microsoftGraph.js';
import SigninButton from '../components/SigninButton_Microsoft.vue';
import emailManagementComponent from '../components/emailManagementComponent.vue'
import { mapGetters } from 'vuex';

export default 
{
  name: 'HomePage',
  components: 
  {
    SigninButton,
    emailManagementComponent
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

  mounted() {
    initialize(); // Initialiser MSAL
  },
};
</script>

<style scoped>

.Home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;    
  height: 50vh;  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Roboto', sans-serif;
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
</style>
