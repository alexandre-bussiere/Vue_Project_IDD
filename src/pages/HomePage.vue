<template>
  <div class="Home">
    <div v-if="user">
      <h1>Home Page</h1>
      <p>Welcome, {{ user.name }}!</p>
    </div>
    <div v-else>
      <h1>Home Page</h1>
      <p>Please sign in to continue.</p>
    </div>
    <SigninForm />
    <br />
    <p v-if="user">Bienvenue, {{ user.name }}!</p>
    <p v-else>Veuillez vous connecter pour continuer.</p>

    <!-- Add input and button for setting conversation -->
    <div v-if="user" class="form-container">
      <h2>Set Conversation</h2>
      <input v-model="conversationTextId" type="number" placeholder="Enter conversation" />
      <button @click="setConv">Set Conversation</button>
    </div>
  </div>
</template>

<script>
import SigninForm from '../components/SigninForm.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    SigninForm
  },
  data() {
    return {
      conversationTextId: '' // Text input for conversation
    };
  },
  computed: {
    ...mapGetters(['getUser']), 
    user() {
      return this.getUser;
    }
  },
  methods: {
    setConv() {
        if (this.conversationTextId) {
            this.$store.commit('setConversationTextId', this.conversationTextId);
            this.conversationTextId = ''; 
        } else {
            alert("Please enter a conversation text.");
        }
    }
  }
};
</script>

<style scoped>
.Home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
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

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
