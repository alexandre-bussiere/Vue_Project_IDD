import { googleSdkLoaded } from "vue3-google-login";
import axios from "axios";
export default {
  name: "App",
  data() {
    return { userDetails: null };
  },
  methods: {
    login() {
      googleSdkLoaded(google => {
        google.accounts.oauth2.initCodeClient({
          client_id: "YOUR_CLIENT_ID",
          scope: "email profile openid",
          redirect_uri: "http://localhost:8000/api/Google_login",
          callback: response => {
            if (response.code) {
              this.sendCodeToBackend(response.code, response.email);
            }
          }
        }).requestCode();
      });
    },
    async sendCodeToBackend(code, email) {
      try {
        const headers = { Authorization: code, Email: email };
        const response = await axios.post("http://localhost:8000/api/Google_login", null, { headers });
        this.userDetails = response.data;
      } catch (error) {
        console.error("Failed to send authorization code:", error);
      }
    }
  }
};