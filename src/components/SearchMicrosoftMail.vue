<template>
    <div class="search-email">
      <h1>Search Microsoft Mail</h1>
      <div class="search-bar">
        <select v-model="selectedFolder" class="folder-select">
            <option value="inbox">Inbox</option>
            <option value="sentItems">Sent</option>
        </select>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Enter search term" 
          class="search-input"
        />
        <button @click="searchEmails" class="search-button">Search</button>
      </div>
  
      <ul class="email-results" v-if="emails && emails.length">
        <li v-for="email in emails" :key="email.id" class="email-item">
            <p>
                <strong class="email-subject">Subject:</strong> {{ email.subject }}
            </p>
            
            <p v-if="email.sender && email.sender.emailAddress">
                <strong class="email-sender">From:</strong> 
                {{ email.sender.emailAddress.name }}
                <span>
                    || 
                </span>
                {{email.sender.emailAddress.address}}
            </p>
            <p v-else>
                <strong class="email-sender">From:</strong> 
                Unknown sender
            </p>

            <p v-if="email.body && email.body.content">
                <strong class="email-sender">Content:</strong>
                <span class = "bodyContent" v-html="email.body.content"></span>
            </p>
            <p v-else>
                <strong class="email-sender">Content:</strong> 
                No content
            </p>

            <p v-if="email.toRecipients && email.toRecipients.length">
                <strong class="email-receiver">To:</strong> 
                <span v-for="(recipient, index) in email.toRecipients" :key="index">
                    {{ recipient.emailAddress.name }}
                
                    <span v-if="index < email.toRecipients.length - 1">
                        , 
                    </span>
                </span>
            </p>
            <p v-else>
            <strong class="email-receiver">To:</strong> No recipients
            </p>
        </li>
      </ul>

      
      <p v-if="!emails.length && searchPerformed">No results found.</p>
    </div>
  </template>
  
  <script>
  import {readEmails} from '../lib/microsoftGraph';
  export default 
  {
    data() 
    {
      return {
        searchQuery: "",
        selectedFolder: "inbox",
        emails: [],
        searchPerformed: false
      };
    },
    methods: 
    {
        async searchEmails() 
        {
            if (!this.searchQuery.trim() && !this.selectedFolder)  //trim to delete useless space
            {
                this.searchPerformed = true;
                this.emails = [];
                return;
            }
            
            try 
            {
                // Call the API with the folder and the query of the user
                const response = await readEmails(this.selectedFolder, this.searchQuery.trim());
                this.emails = response.value || []; // Use `response.value` because Graph API return the emails in value
                this.searchPerformed = true;
            
            } 
            catch (error) 
            {
                console.error("Failed to fetch emails:", error.message);
                this.emails = [];
                this.searchPerformed = true;
            }
        }
    }
};
  </script>
  
  <style scoped>
  /* Style du conteneur principal */
  .search-email {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  /* Titre de la page */
  h1 {
    font-size: 2em;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .folder-select 
  {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
}

  /* Barre de recherche */
  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
  }
  
  .search-input {
    padding: 10px;
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .search-button {
    padding: 10px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .search-button:hover {
    background-color: #2980b9;
  }
  
  /* Résultats de la recherche */
  .email-results {
    list-style: none;
    padding: 0;
  }
  
  .email-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: #f9f9f9;
  }
  
  .email-item
  {
    font-size: 18px;
  }
  span
  {
    font-size: 18px;
  }
  .email-subject {
    font-weight: bold;
    color: #2c3e50;
  }
  
  .email-sender {
    color: #34495e;
    font-weight: bold;
    margin-top: 5px;
  }
  
  .email-snippet {
    color: #555;
    font-size: 0.9em;
    margin-top: 10px;
  }

  .bodyContent
  {
    font-size: 18px;
  }
  </style>
  