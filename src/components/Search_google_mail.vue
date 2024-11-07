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
      <li v-for="email in emails" :key="email.id" class="email-item">
        <strong class="email-subject">Subject:</strong> {{ email.subject }}<br>
        <strong class="email-sender">Sender:</strong> {{ email.sender }}<br>
        <p class="email-snippet">{{ email.snippet }}</p>
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
      searchPerformed: false
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
