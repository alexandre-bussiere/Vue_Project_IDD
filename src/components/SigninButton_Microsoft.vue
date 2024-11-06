<template>
  <div v-if="!isAuthenticated">
    <button v-if="isButtonVisible" class ="siginDiv" :disabled="isDisabled" @click="handleSignIn">
      <img src="../assets/Microsoft_Logo.png" alt="Microsoft Logo" class="logo">
      Sign In With Microsoft
    </button>
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
    ...mapGetters(['getUser', 'isAuthenticated', 'getConnection']),
    user() 
    {
      return this.getUser;
    },

    connection() 
    {
      return this.getConnection; 
    }
  },

  methods: 
  {
    ...mapMutations(['setUser', 'setConnection']),
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
        this.setConnection("Microsoft");
        console.log(this.connection)
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

.sign-in-container 
{
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 10px; 
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;

}

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

button:disabled 
{
  background-color: #6c757d;
  cursor: not-allowed; 
}

button img.logo 
{
  height: 20px; /* Ajustez la taille du logo */
  width: 20px;
  margin-right: 10px; /* Espace entre le logo et le texte */
}


</style>
