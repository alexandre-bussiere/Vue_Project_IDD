<template>
  <div class="home">
    <h1>Home Page</h1>
    
    <div v-if="user">
      <p>Welcome, {{ user.name }}!</p>
    </div>
    <div v-else>
      <p>Please sign in to continue.</p>
    </div>
    <div class="login-container">
      <SigninForm>
        <SigninButtonMicrosoft />
        <SigninButtonGoogle />
      </SigninForm>
    </div>
  </div>
</template>

<script>
import SigninButtonMicrosoft from '@/components/SigninButton_Microsoft.vue';
import SigninButtonGoogle from '@/components/SigninButton_Google.vue';
import SigninForm from '@/components/SigninForm.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    SigninButtonMicrosoft,
    SigninButtonGoogle,
    SigninForm
  },
  computed: {
    ...mapGetters(['getUser']), 
    user() {
      return this.getUser;
    }
  }
};
</script>

<style scoped>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

</style>
