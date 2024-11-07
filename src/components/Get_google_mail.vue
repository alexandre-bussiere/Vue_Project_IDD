<template>
  <div>
    <h1>Google Mail</h1>
    <div v-if="user">
      <p>Here are your emails, {{ user.name }}</p>
    </div>
    <ul class="email-list">
      <li v-for="email in emails" :key="email.id" class="email-item">
        <strong class="email-subject">Subject:</strong> {{ email.subject }}<br>
        <strong class="email-sender">Sender:</strong> {{ email.sender }}<br>
        <p class="email-snippet">{{ email.snippet }}</p>
        <br>
        <button @click="deleteEmail(email.id)">Delete</button>
      </li>
    </ul>
    <button @click="fetchGoogleEmails">Get Google Mail</button>
    <button @click="fetchNextEmails" v-if="pageToken">Load More</button>
  </div>
</template>

<script>
import { mapGetters,mapActions  } from 'vuex';
import { signInAndGetGoogleUser, getGoogleEmails, deleteGoogleEmail } from '../lib/googleGraph';

export default {
  name: 'GetGoogleMailPage',
  data() {
    return {
      emails: [],
      pageToken: null,
    };
  },
  methods: {
    ...mapActions(['setUser','setAccesToken','setConnection']),

    async fetchGoogleEmails() {
      console.log("Start fetch")
      try {
        if (!this.accessToken) {
            const googleUser = await signInAndGetGoogleUser();
            this.setConnection("Google");
          if (googleUser) {
            await this.$store.dispatch('updateUser', googleUser);
            await this.$store.dispatch('updateAccessToken', googleUser.accessToken);
            console.log("User", this.getUser);
            console.log("AccesToken", this.getAccessToken)
            console.log(this.$store.state.accessToken)
          }
        }

        if (this.accessToken) {

          const response = await getGoogleEmails(this.pageToken); // Pass the current page token
          this.emails = response.emails; // Replace with the fetched emails
          this.pageToken = response.nextPageToken; // Set the next page token for pagination
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    console.log("End fetch")
    },

    async fetchNextEmails() {
      await this.fetchGoogleEmails();
    },

    async deleteEmail(emailId) {
      const success = await deleteGoogleEmail(emailId);
      if (success) {
        this.emails = this.emails.filter(email => email.id !== emailId);
      }
    }

  },
  
  async mounted() {
    console.log('Component mounted')
    console.log('User :',this.user)
    console.log("AccesToken",this.accessToken)
    if(this.user){
      await this.fetchGoogleEmails();
    }
  },
  computed: {
    ...mapGetters(['getUser','getAccessToken']), 
    user() {
      return this.getUser;
    },
    accessToken(){
      return this.getAccessToken;
    }
  }
};

</script>
<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}

.email-list {
  list-style-type: none;
  padding: 0;
}

.email-item {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 8px;
}

.email-item:last-child {
  border-bottom: none;
}

.email-subject,
.email-sender {
  color: #555;
  font-weight: bold;
}

.email-snippet {
  color: #666;
  margin-top: 4px;
}
</style>
