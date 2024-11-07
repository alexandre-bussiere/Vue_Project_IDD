import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";

let msalInstance = null;

// Initialisation of MSAL
export async function initialize() 
{
    if (!msalInstance) 
    {

        msalInstance = new PublicClientApplication({
            auth: {
                clientId: process.env.VUE_APP_OAUTH_CLIENT_ID,
                authority: `https://login.microsoftonline.com/${process.env.VUE_APP_TENANT_ID}`,
                redirectUri: process.env.VUE_APP_REDIRECT_URI
            },
            cache: 
            {
                cacheLocation: "sessionStorage"
            }
        });
        await msalInstance.initialize();
    }
}

// Function for async/await
export async function signInAndGetUser() 
{
    if (!msalInstance) 
    {
        throw new Error("MSAL instance non initialisée. Appelez initialize() avant d'utiliser MSAL.");
    }

    try 
    {
        const loginResponse = await msalInstance.loginPopup({
            scopes: ["User.Read", "Mail.Read", "Mail.ReadWrite", "Mail.Send"]
        });

        if (loginResponse && loginResponse.account) 
            {
            msalInstance.setActiveAccount(loginResponse.account);
        } 
        else 
        {
            console.error("No account returned during login");
        }

        return loginResponse.account;
    } 

    catch (error) 
    {
        console.error("Login failed:", error);
        throw error;
    }
}

// Function for token, this token is required to do action on an account
export async function acquireToken() 
{
    const activeAccount = msalInstance.getActiveAccount();

    if (!activeAccount) {
        console.error("No active account found. Please sign in.");
        return null;
    }

    const request = 
    {
      scopes: ["Mail.Read", "Mail.Send", "openid", "profile", "User.Read"],
      account: activeAccount
    };
  
    try 
    {
      const response = await msalInstance.acquireTokenSilent(request);
      return response.accessToken;
    } 
    
    catch (error) 
    {
      console.error("Token acquisition failed", error);
      return null;
    }
}


// Fonction pour récupérer les informations du profil utilisateur
export async function getUserProfile() 
{
    const accessToken = await acquireToken();
    if (!accessToken) 
    {
        throw new Error("Access token not acquired.");
    }

    try 
    {
        const response = await axios.get("https://graph.microsoft.com/v1.0/me", 
        {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const profile = response.data;

        // Vérifie le champ userPrincipalName pour obtenir l'adresse e-mail principale
        console.log("Primary email address:", profile.userPrincipalName);

    } 
    catch (error) 
    {
        console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
        throw error;
    }
}


// Read mails
export async function readEmails(folder = "inbox", searchQuery = '') 
{
  const accessToken = await acquireToken();
  if (!accessToken) 
  {
    throw new Error("Access token not acquired.");
  }

  try 
  {
    const params = {
      "$top": 15, // 15 emails maximum
    };

    // Sort if no search 
    if (!searchQuery) 
    {
      params["$orderby"] = "receivedDateTime desc"; // Order by receive date
    } 
    
    else 
    {
      params["$search"] = `"${searchQuery}"`;  // Search only if the user ask for
    }

    const response = await axios.get(`https://graph.microsoft.com/v1.0/me/mailFolders/${folder}/messages`, //To access to emails in the inbox or sent folder
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: params
    });

    return response.data;
  } 
  catch (error) {
    console.error("Error reading emails:", error.response ? error.response.data : error.message);
    throw error;
  }
}


// Send mail
export async function sendEmail(emailData) 
{
    const accessToken = await acquireToken();
    if (!accessToken) 
    {
        throw new Error("Access token not acquired.");
    }

    const body = 
    {
        message: 
        {
            subject: emailData.subject,
            body: 
            {
                contentType: "Text",
                content: emailData.content
            },
            toRecipients: 
            [
                {
                    emailAddress: 
                    {
                        address: emailData.recipientAddress,  // Adresse e-mail du destinataire
                    }
                }
            ],
        },
        saveToSentItems: "true"
    };

    try 
    {
        const response = await axios.post("https://graph.microsoft.com/v1.0/me/sendMail", JSON.stringify(body), 
        {
            headers: 
            {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 202) 
        {
            console.log("Email sent successfully!");
        } 
    } 
    
    catch (error) 
    {
        console.error("Error sending email:", error.response ? error.response.data : error.message);
        throw error;
    }
}  

// Delete email using Axios
export async function deleteEmail(emailId) 
{
    const accessToken = await acquireToken();
    if (!accessToken) 
    {
        throw new Error("Access token not acquired.");
    }

    try 
    {
        const response = await axios.delete(`https://graph.microsoft.com/v1.0/me/messages/${emailId}`, 
        {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (response.status === 204) 
        {
            console.log("Email deleted successfully!");
        }
    } 
    catch (error) 
    {
        console.error("Error deleting email:", error.response ? error.response.data : error.message);
        throw error;
    }
}