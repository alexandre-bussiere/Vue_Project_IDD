<template>
  <div>
    <button @click="signInAndGetGoogleUserCall" class="btn btn-primary">Sign in with Google</button>  
  </div>
</template>


<script>
import { mapMutations } from 'vuex';
import { signInAndGetGoogleUser } from '../lib/googleGraph.js';

export default {
  name: 'SigninButtonGoogle',
  data() {
    return {
      user: null,
      connection: "google",
    }
  },
methods: {
  ...mapMutations(['setUser','setAccessToken']),
  signInAndGetGoogleUserCall() {
    signInAndGetGoogleUser()
      .then(user => {
        console.log("User:", user);
        console.log("Connection:", this.connection);
        console.log("AccesToken:",user.accessToken)
        this.setAccessToken(user.accessToken);
        this.setUser(user); 
      })
      .catch(error => {
        console.error("Erreur lors de la connexion :", error);
      });
  }
}

}
</script>

<style scoped>

</style>
