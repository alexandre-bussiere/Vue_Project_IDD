import { PublicClientApplication } from "@azure/msal-browser";

let msalInstance = null;
let msalInitialized = false; // Variable pour indiquer si MSAL est initialisé

// Fonction d'initialisation de MSAL
export async function initialize() {
    console.log('Tenant ID:', process.env.VUE_APP_TENANT_ID);
    console.log('Client ID:', process.env.VUE_APP_OAUTH_CLIENT_ID);
    console.log('Redirect URI:', process.env.VUE_APP_REDIRECT_URI);

    if (!msalInstance) {
        msalInstance = new PublicClientApplication({
            auth: {
                clientId: process.env.VUE_APP_OAUTH_CLIENT_ID,
                authority: `https://login.microsoftonline.com/${process.env.VUE_APP_TENANT_ID}`,
                redirectUri: process.env.VUE_APP_REDIRECT_URI
            },
            cache: {
                cacheLocation: "sessionStorage"
            }
        });
        msalInitialized = true;
        console.log("MSAL Initialized");
        await msalInstance.initialize();
    }
}
// Fonction pour gérer la connexion sans async/await
export function signInAndGetUser() {
    if (!msalInstance || !msalInitialized) {
        return Promise.reject("MSAL instance has not been initialized. Call initialize() before using MSAL functions.");
    }

    return msalInstance.loginPopup({
        scopes: ["User.Read"]
    })
        .then(loginResponse => {
            console.log("Login popup opened");
            msalInstance.setActiveAccount(loginResponse.account);
            return loginResponse.account;
        })
        .catch(error => {
            console.log("Login failed:", error);
            throw error;
        });
}
