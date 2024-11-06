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

button:hover {
  background-color: #32d755;
  transform: translateY(-2px);
}

button:active {
  background-color: #282d29;
  transform: translateY(0);
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed; 
}

</style>
