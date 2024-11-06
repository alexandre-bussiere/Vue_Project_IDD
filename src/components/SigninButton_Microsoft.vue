<template>
  <div v-if="!isAuthenticated">
    <button v-if="isButtonVisible" class ="siginDiv" :disabled="isDisabled" @click="handleSignIn">Sign In</button>
  </div>
</template>

<script>
import { initialize, signInAndGetUser } from '../lib/microsoftGraph.js';
import { mapMutations, mapGetters } from 'vuex';

export default 
{
  data() 
  {
    return {
      isDisabled: false,
      isButtonVisible: true
    };
  },
  mounted() 
  {
    initialize();
  },

  computed: 
  {
    ...mapGetters(['getUser', 'isAuthenticated']),
    user() 
    {
      return this.getUser;
    },
  },

  methods: 
  {
    ...mapMutations(['setUser']),
    async handleSignIn() 
    {
      try 
      {
        await initialize();
        const user = await signInAndGetUser();
        this.setUser({
          name: user.name,
          username: user.username,
        });
        this.isDisabled = true;
      } 
      catch (error) 
      {
        console.error("Error during sign-in:", error);
      }

    },
  },
};

</script>

<style scoped>

.siginDiv
{
  display: flex;
  justify-content: center;

}
button {
  background-color: #28a745;
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  font-size: 20px;
  border-radius: 5px;
  margin: 12px;
}
.sign-in-container {
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 10px; 
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;

}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  height: 30px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}
button:disabled {
  background-color: #6c757d;
  cursor: not-allowed; 
}

</style>
