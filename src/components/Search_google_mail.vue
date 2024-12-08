<template>
  <div class="search-email">
    <h1>Search Google Mail</h1>
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Enter search term" 
        class="search-input"
      />
      <button @click="searchEmails" class="search-button">Search</button>
    </div>
    <ul class="email-results" v-if="emails.length">
      <li 
        v-for="email in emails" 
        :key="email.id" 
        class="email-item" 
        @click="loadEmailBody(email.id)"
      >
        <strong class="email-subject">Subject:</strong> {{ email.subject }}<br>
        <strong class="email-sender">Sender:</strong> {{ email.sender }}<br>
        <p class="email-snippet">{{ email.snippet }}</p>

        <!-- Affiche le corps de l'email lorsque l'e-mail est ouvert -->
        <div v-if="email.id === activeEmailId" class="email-body" v-html="email.body"></div>
      </li>
    </ul>
    
    <p v-if="!emails.length && searchPerformed">No results found.</p>
  </div>
</template>

<script>
import {getGoogleEmails} from '../lib/googleGraph';
export default {
  data() {
    return {
      searchQuery: "",
      emails: [],
      searchPerformed: false,
      activeEmailId: null, // ID de l'e-mail actuellement ouvert
    };
  },
  methods: {
    async searchEmails() {
        if (!this.searchQuery) return;
        console.log("searchQuery",this.searchQuery)
        // Appel à l'API avec le sujet recherché
        const response = await getGoogleEmails(null, 10, this.searchQuery);
        this.emails = response.emails;
        this.searchPerformed = true;
        console.log("searchEmails end")
    },
    async loadEmailBody(emailId) {
      // Trouver l'e-mail dans la liste
      const email = this.emails.find(email => email.id === emailId);
      if (!email) return;

      // Charger le corps complet de l'e-mail s'il n'a pas encore été chargé
      if (!email.body) {
        try {
          const fullEmail = await getGoogleEmails(null, 1, emailId); // Appelle une fonction pour obtenir l'email complet
          email.body = fullEmail.emails[0].body;
          this.activeEmailId = emailId; // Définit cet e-mail comme l'actif
        } catch (error) {
          console.error("Failed to load email body:", error);
        }
      } else {
        // Bascule entre l'affichage de l'e-mail actuel et la fermeture
        this.activeEmailId = this.activeEmailId === emailId ? null : emailId;
      }
    },
  },
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
}

.search-button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
  
.search-button:hover {
  background-color: #32d755;
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
</style>
