<template>
  <div class = "linkDiv" v-if="user">
    <router-link to = "send">Send Email</router-link>
    <router-link to = "management">Email Management</router-link>
  </div>
  <div class="Home">
    <div class ="signinInHome"> 
      <SigninButton />
    </div>
    <div class="informationUser" v-if="user">
      <p>Welcome, {{ user.name }}!</p>
      <p>If you want to send an email, click on the link "Send Email".</p>
      <p>If you want to check your email or delete one or more emails, click on the link "Email Management".</p>
    </div>
    <p class="informationUser" v-else>Sign in if you want to go further on this website.</p>

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
  min-height: 50vh
}

.linkDiv
{
  display: flex;
  padding: 20px;
  justify-content: space-around;
  font-size: 18px;

  color: #333;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
}


/* center the button signin */
.signinInHome
{
  display: flex;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%); /* If the middle of the page is not the same, it will be mouved to be at the new middle of the page*/
  justify-content: space-around;
}


.informationUser 
{

  text-align: center;
  font-size: 18px;
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 15px;

  color: #333;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
}

</style>
