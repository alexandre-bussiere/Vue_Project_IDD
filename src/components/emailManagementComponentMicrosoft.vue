<template>
    <div class="emailManagementContainer">
      <div class="controlsSection">
        <h3>Folder of emails:</h3>
        <select v-model="selectedFolder" @change="getEmails">
          <option value="inbox">Inbox</option>
          <option value="sentitems">Sent Items</option>
        </select>
        <button  class = "modifiedButton" @click="getEmails" v-if="user">Get Emails</button>
      </div>

    <!-- Display emails of the users-->
    <div class="getEmailsSection">
      <div class="emailList" v-if="emails">
        <h3>{{ selectedFolder === 'inbox' ? 'Inbox' : 'Sent Items' }} Emails:</h3>
          
        <ul v-for="(email, index) in emails.value" :key="index">
          <li class="email-item">
            <p>
              <strong>Index:</strong> {{ index + 1 +"\n"}} 
            </p>

            <p>
              <strong>Subject:</strong> {{ email.subject || 'No subject' + "\n"}}
            </p>

            <p v-if="email.toRecipients && email.toRecipients.length > 0">
              <strong class="email-sender">To:</strong> 
              {{ email.toRecipients.map(recipient => recipient.emailAddress.address).join(', ') }}
            </p>

            <p v-if="email.body && email.body.content">
                <strong class="email-sender">Content:</strong>
                <span class = "spanContent" v-html="email.body.content"></span>
            </p>
            <p v-else>
                <strong class="email-sender">Content:</strong> 
                No content
            </p>

            <p v-if="email.sender && email.sender.emailAddress">
                <strong class="email-sender">From:</strong> 
                {{ email.sender.emailAddress.name }}
                <span class = "spanContent">
                    || 
                </span>
                {{email.sender.emailAddress.address}}
            </p>
            <p v-else>
                <strong class="email-sender">From:</strong> 
                Unknown sender
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="deleteEmailsSection" v-if="emails">
        <h3 for="emailIndex">Index of the email you want to delete:</h3>
        <input type="number" id="emailIndex" v-model="emailIndex" placeholder="Enter email number to delete" min="1" />
      <button class = "button" @click="deleteEmailByIndex" v-if="user">Delete Email</button>
    </div>
  </div>
    
</template>

<script>
import { readEmails, deleteEmail, acquireToken } from '../lib/microsoftGraph.js';
import { mapGetters } from 'vuex';
export default 
{
  name: 'emailManagementComponent',

  data() 
  {
    return {
      selectedFolder: 'inbox',
      emailIndex: 1, // To select the email to delete
      emails: null
  
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

  methods: 
  {
    async getEmails() 
    {
      try 
      {
        await acquireToken(); // check the accessToken to have the permission
        const data = await readEmails(this.selectedFolder);

        // Filtrer les emails qui ont un sender défini
        const filteredEmails = data.value.filter(email => email.sender && email.sender.emailAddress);

        this.emails = { value: filteredEmails }; // Remplace la liste des emails par les emails filtrés
      } 
      catch (error) 
      {
        console.error("Error getting emails:", error);
      }
    },
    
    async deleteEmailByIndex() 
    {
      // const to set the first element at 0 and not 1 because we use 1 as first element for the user
      const adjustedIndex = this.emailIndex - 1;

      if (this.emails && this.emails.value.length > adjustedIndex && adjustedIndex >= 0) 
      {
        const emailId = this.emails.value[adjustedIndex].id; // Récupère l'ID de l'email à supprimer

        try 
        {
          await acquireToken();
          await deleteEmail(emailId);
          this.getEmails(); // Call the function to see the result of the delete
        } 
        catch (error) 
        {
          console.error("Error deleting email:", error);
        }
      } 
      
      else 
      {
        alert("Invalid email index. Please enter a valid index.");
      }
    }
  }
};

</script>

<style scoped>
.emailManagementContainer 
{
  display: flex;
  justify-content: space-between;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1);
}

.controlsSection,
.deleteEmailsSection  
{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  margin-right: 10px;
  width: 20%;
  text-align: center; 
  flex-shrink: 0;
}

.spanContent
{
  font-size: 18px;
}
.controlsSection label 
{
  font-weight: bold;
  text-align: center;
  font-size: 20px;
}

.controlsSection select 
{
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.getEmailsSection
{
  width: 40%;
  flex-grow: 1;
  margin-top: 20px;
  box-sizing: border-box;
}

.controlsSection h3
{
  font-size: 18px;
}

.getEmailsSection h3,
.deleteEmailsSection h3 
{
  text-align: center;
  color: #333;
  font-size: 18px;
}

.deleteEmailsSection label,
.deleteEmailsSection input,
.deleteEmailsSection .button 
{
  display: block;
  margin: 10px auto;
  font-size: 18px;
}

input[type="number"] 
{
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 10px;
}

.emailList 
{
  margin: 20px;
}

.emailList ul 
{
  list-style-type: none;
  padding: 0;
}

.email-item 
{
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
  font-size: 18px;
}

.email-item p,
.email-item strong 
{
  margin: 0;
  padding: 0;
}

.emailList ul li strong 
{
  color: #333;
}

.email
.modifiedButton
{
  background-color: #28a745;
  border: none;
  color: white;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 5px;
  margin:0%;
}

.button 
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
