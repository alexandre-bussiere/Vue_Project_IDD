<template>
  <div class="Home">
    <SigninButton />
    <p v-if="user">Bienvenue, {{ user.name + ", "+ user.username }}!</p>
    <p v-else>Veuillez vous connecter pour continuer.</p>

    <button @click="getEmails" v-if="user">Get Emails</button>
    <button @click="sendTestEmail" v-if="user">Send Test Email</button>
    <button @click="deleteFirstEmail" v-if="user">Delete First Email</button>
    <br />
    <div v-if="emails">
      <h3>Emails:</h3>
      <ul>
        <li v-for="email in emails.value" :key="email.id">
          {{ email.subject }} from {{ email.sender.emailAddress.address }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { initialize, readEmails, sendEmail, deleteEmail } from '../lib/microsoftGraph.js';
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
    return {
      emails: null,
    };
  },
  computed: 
  {
    ...mapGetters(['getUser']), 
    user() 
    {
      return this.getUser;
    }
  },

  mounted() {
    initialize(); // Initialiser MSAL
  },

  methods: 
  {
    getEmails() 
    {
      readEmails()
        .then(data => {
          this.emails = data;
          console.log(data);
        })
        .catch(error => 
        {
          console.error("Error getting emails:", error);
        });
    },
    sendTestEmail() 
    {
      const emailData = 
      {
        subject: "Test Email",
        content: "This is a test email from Vue.js",
        recipient: "recipient@example.com"
      };
      sendEmail(emailData)
        .then(() => 
        {
          console.log("Email sent!");
        })
        .catch(error => 
        {
          console.error("Error sending email:", error);
        });
    },
    deleteFirstEmail() 
    {
      if (this.emails && this.emails.value.length > 0) 
      {
        const firstEmailId = this.emails.value[0].id;
        deleteEmail(firstEmailId)
          .then(() => {
            console.log("First email deleted!");
            this.getEmails(); // Rafraîchir la liste des emails après suppression
          })
          .catch(error => {
            console.error("Error deleting email:", error);
          });
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
