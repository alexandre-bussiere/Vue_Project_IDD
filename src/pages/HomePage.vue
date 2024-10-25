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
      <form class="login-form">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" />

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" autocomplete="current-password" />

        <input type="submit" value="Login" />
      </form>

      <div class="extra-login">
        <SigninButtonMicrosoft />
        <SigninButtonGoogle />
      </div>
    </div>
  </div>
</template>

<script>
import SigninButtonMicrosoft from '@/components/SigninButton_Microsoft.vue';
import SigninButtonGoogle from '@/components/SigninButton_Google.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    SigninButtonMicrosoft,
    SigninButtonGoogle
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

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.login-form label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.login-form input {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.login-form input[type="submit"] {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-form input[type="submit"]:hover {
  background-color: #0056b3;
}

.extra-login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
}
</style>
