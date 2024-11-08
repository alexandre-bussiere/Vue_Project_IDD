<template>
  <div>
    <button @click="signInAndGetGoogleUserCall" class="btn btn-primary">
      <img src="../assets/Google_Logo.png" alt="Google Logo" class="logo">
      Sign in with Google
    </button>  
  </div>
</template>


<script>
import { mapMutations } from 'vuex';
import { signInAndGetGoogleUser } from '../lib/googleGraph.js';

export default 
{
  name: 'SigninButtonGoogle',
  data() 
  {
    return {
      user: null,
      connection: "google",
    }
  },
methods: 
{
  ...mapMutations(['setUser','setAccessToken', 'setConnection']),
  signInAndGetGoogleUserCall() 
  {
    signInAndGetGoogleUser()
      .then(user => {
        console.log("User:", user);
        console.log("Connection:", this.connection);
        console.log("AccesToken:",user.accessToken)
        this.setAccessToken(user.accessToken);
        this.setUser(user); 
        this.setConnection("Google");
        this.$router.push({ path: '/get-email' });
      })
      .catch(error => {
        console.error("Erreur lors de la connexion :", error);
      });
  }
}

}
</script>

<style scoped>
button 
{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  height: 40px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  width: 220px;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover 
{
  background-color: #45a049;
}

button img.logo 
{
  height: 20px; /* Ajustez la taille du logo */
  width: 20px;
  margin-right: 10px; /* Espace entre le logo et le texte */
}
</style>
