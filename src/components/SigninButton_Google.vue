<template>
   <GoogleLogin :callback="callbackck" prompt auto-login auto-logout="true"/>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';

export default {
  name: 'SigninButtonGoogle',
  data() {
    return {
      loggedIn: false,
      user: null,
      callback:(response) => {
        let user = decodeCredential(response.credential);
        this.user = user;
        this.loggedIn = true;
      }
    }
  },
  methods: {
    callbackck(user) {
      this.user = user;
      console.log(user);
    }
  }
}
</script>

<style scoped>

</style>
