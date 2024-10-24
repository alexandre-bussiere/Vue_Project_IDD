<template>
    <button @click="getEmails" v-if="user">Get Emails</button>
    <button @click="sendTestEmail" v-if="user">Send Test Email</button>
    <button @click="deleteFirstEmail" v-if="user">Delete First Email</button>

    <div v-if="emails">
      <h3>Emails:</h3>
      <ul>
        <li v-for="email in emails.value" :key="email.id">
          {{ email.subject }} from {{ email.sender.emailAddress.address }}
        </li>
      </ul>
    </div>
</template>

<script>
import { initialize, readEmails,sendEmail,deleteEmail} from '../lib/microsoftGraph.js';
import { mapGetters } from 'vuex';
export default 
{
  name: 'emailManagementComponent',

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
/* button {
  padding: 10px;
  margin: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
} */

button {
  background-color: #28a745;
  border: none;
  color: white; 
  padding: 12px 24px; 
  text-align: center;
  display: inline-block;
  font-size: 16px;
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
