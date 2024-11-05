<template>
    <div v-if="user">
      <form @submit.prevent="sendCustomEmail">
        <div>
          <label for="subject">Subject:</label>
          <input type="text" id="subject" v-model="emailSubject" placeholder="Enter subject here" />
        </div>

        <div>
          <label for="content">Content:</label>
          <textarea id="content" v-model="emailContent" placeholder="Enter email content here"></textarea>
        </div>

        <div>
            <label for = "recipient">recipient:</label>
            <textarea id="recipient" v-model="emailRecipient" placeholder="Enter email recipient here"></textarea>
        </div>
      </form>

      <button type ="submit" @click="sendCustomEmail" v-if="user">Send Test Email</button>
    </div>
</template>

<script>
import { initialize, signInAndGetUser, getUserProfile, sendEmail} from '../lib/microsoftGraph.js';
import { mapGetters } from 'vuex';
export default 
{
  name: 'sendEmail',

  data() 
  {
    return {
      emails: null,
      emailSubject: '', // Pour stocker le sujet de l'email
      emailContent: '', // Pour stocker le contenu de l'email
      emailRecipient: '',
      userProfile: null  
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

  async mounted() 
  {
    try 
    {
      const login = await initialize(); // Initialiser MSALs
      console.log("login: ", login)
      if(login)
      {
        await signInAndGetUser(); // Authentifier l'utilisateur
      // Récupérer le profil utilisateur
      const profile = await getUserProfile();
      this.userProfile = profile;

      console.log("User profile:", this.userProfile);
      }
    }   
    catch (error) 
    {
      console.error("Error during user sign-in or profile fetch:", error);
    }
  },

  methods: 
  {
    async sendCustomEmail() 
    {
      if (this.emailSubject && this.emailContent)
      {
        const emailData = 
        {
          subject: this.emailSubject,  // Utilise les données du formulaire
          content: this.emailContent,  // Utilise les données du formulaire
          recipientAddress: this.emailRecipient  // Remplace par une vraie adresse ou récupère dynamiquement
        };
        try 
        {
          await sendEmail(emailData);  // Appelle la fonction pour envoyer l'email
          console.log("Email sent!");
        } 

        catch (error) 
        {
          console.error("Error sending email:", error);
        }
      } 
      else 
      {
        alert("Please fill in both subject and content fields.");
      }
    },
  }
};
</script>

<style>

</style>