<template>
  <div class="email-compose">
    <h2>Compose Email</h2>
    <br>
    <form @submit.prevent="sendEmail">
      <div class="form-group">
        <label for="to">To:</label>
        <input type="email" v-model="emailData.to" required placeholder="Recipient's email" />
      </div>
      
      <div class="form-group">
        <label for="subject">Subject:</label>
        <input type="text" v-model="emailData.subject" required placeholder="Email subject" />
      </div>
      
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea v-model="emailData.message" required placeholder="Write your message here"></textarea>
      </div>
      
      <button type="submit">Send Email</button>
    </form>
    
    <p v-if="statusMessage" :class="{'success': emailSent, 'error': !emailSent}">{{ statusMessage }}</p>
  </div>
</template>

<script>
import { gapi } from 'gapi-script';
import { mapGetters  } from 'vuex';
import { signInAndGetGoogleUser } from '../lib/googleGraph.js';

export default {
  data() {
    return {
      emailData: {
        to: '',
        subject: '',
        message: ''
      },
      statusMessage: '',
      emailSent: false
    };
  },
  methods: {
    async sendEmail() {
      try {
        if (!this.user){
            await signInAndGetGoogleUser();
            this.setConnection("Google");
        }
        if (this.user) {
          const emailContent = this.createEmail(
            this.emailData.to,
            this.emailData.subject,
            this.emailData.message
          );

          await gapi.client.gmail.users.messages.send({
            userId: 'me',
            resource: {
              raw: emailContent
            }
          });

          this.statusMessage = 'Email sent successfully!';
          this.emailSent = true;
          // Réinitialise les champs du formulaire après l'envoi
          this.emailData.to = '';
          this.emailData.subject = '';
          this.emailData.message = '';
        }
      } catch (error) {
        this.statusMessage = 'Failed to send email. Please try again.';
        this.emailSent = false;
        console.error('Error sending email:', error);
      }
    },
    createEmail(to, subject, message) {
      const email = [
        `To: ${to}`,
        'Subject: ' + subject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset="UTF-8"',
        '',
        message
      ].join('\n');

      return btoa(email)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  },
  mounted() {
    console.log('Component mounted')
    console.log('User :',this.user)
    console.log("AccesToken",this.accessToken)
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
.email-compose {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
input, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>
