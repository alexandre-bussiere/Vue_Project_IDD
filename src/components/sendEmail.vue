<template>
    <div class = "divForm" v-if="user">
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
        <button type ="submit" @click="sendCustomEmail" v-if="user">Send Email</button>
      </form>

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

.emailComponent 
{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* Centre le formulaire verticalement */
}

.divForm 
{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

form 
{
  background-color: #f9f9f9;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center; /* Centre le contenu à l'intérieur du formulaire */
}

form div 
{
  margin-bottom: 15px;
}

label 
{
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input[type="text"],
textarea 
{
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  resize: vertical;
}

textarea 
{
  min-height: 100px;
}

button
{
    background-color: #28a745;
    border: none;
    color: white;
    padding: 12px 24px;
    text-align: center;
    font-size: 20px;
    border-radius: 5px;
    margin: 12px;
}

button:hover 
{
  background-color: #32d755;
  transform: translateY(-2px);
}

button:active 
{
  background-color: #282d29;
  transform: translateY(0);
}
</style>