<template>
  <div>
    <h1>Google Mail</h1>
    <div v-if="user">
      <p>Here are your emails, {{ user.name }}</p>
    </div>
    <ul class="email-list">
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

        <button @click.stop="deleteEmail(email.id)">Delete</button>
      </li>
    </ul>
    <div class="controls" v-if="!pageToken">
      <input 
        type="number" 
        v-model.number="emailCount" 
        min="1" 
        placeholder="Number of emails" 
        class="email-count-input"
      />
      <button @click="fetchGoogleEmails">Get Google Mail</button>
    </div>
    <div v-if="pageToken">
      <input 
        type="number" 
        v-model.number="emailCount" 
        min="1" 
        placeholder="Number of emails" 
        class="email-count-input"
      />
      <button @click="fetchNextEmails">Load More</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { signInAndGetGoogleUser, getGoogleEmails, deleteGoogleEmail } from '../lib/googleGraph';

export default {
  name: 'GetGoogleMailPage',
  data() {
    return {
      emails: [],
      pageToken: null,
      activeEmailId: null, // ID de l'e-mail actuellement ouvert
    };
  },
  methods: {
    ...mapActions(['setUser', 'setAccesToken', 'setConnection']),

    async fetchGoogleEmails() {
      console.log("Start fetch");
      try {
        if (!this.accessToken) {
          const googleUser = await signInAndGetGoogleUser();
          this.setConnection("Google");
          if (googleUser) {
            await this.$store.dispatch('updateUser', googleUser);
            await this.$store.dispatch('updateAccessToken', googleUser.accessToken);
          }
        }

        if (this.accessToken) {
          const response = await getGoogleEmails(this.pageToken, this.emailCount);
          this.emails = response.emails;
          this.pageToken = response.nextPageToken;
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
      console.log("End fetch");
    },

    async fetchNextEmails() {
      await this.fetchGoogleEmails();
    },

    async deleteEmail(emailId) {
      const success = await deleteGoogleEmail(emailId);
      if (success) {
        this.emails = this.emails.filter(email => email.id !== emailId);
      }
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
  
  async mounted() {
    if (this.user) {
      await this.fetchGoogleEmails();
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getAccessToken']), 
    user() {
      return this.getUser;
    },
    accessToken() {
      return this.getAccessToken;
    },
  }
};
</script>

<style scoped>
/* Conteneur principal */
div {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Titre principal */
h1 {
  font-size: 2em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* Liste des emails */
.email-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.email-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  cursor: pointer;
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

/* Affichage du corps de l'email */
.email-body {
  margin-top: 10px;
  color: #333;
  font-size: 0.9em;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}

/* Bouton de suppression */
button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ddd;
}

button:focus {
  outline: none;
}

button:active {
  transform: scale(0.98);
}

/* Contrôles */
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.email-count-input {
  padding: 8px;
  width: 120px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
