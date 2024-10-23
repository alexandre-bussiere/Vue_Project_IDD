import { PublicClientApplication } from "@azure/msal-browser";

let msalInstance = null;

// Initialisation of MSAL
export async function initialize() 
{
    console.log('Tenant ID:', process.env.VUE_APP_TENANT_ID);
    console.log('Client ID:', process.env.VUE_APP_OAUTH_CLIENT_ID);
    console.log('Redirect URI:', process.env.VUE_APP_REDIRECT_URI);

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
        console.log("MSAL Initialized");
        await msalInstance.initialize();
    }
}

// Function for async/await
export function signInAndGetUser() 
{
    if (!msalInstance) 
    {
        return Promise.reject("MSAL instance has not been initialized. Call initialize() before using MSAL functions.");
    }

    return msalInstance.loginPopup({
        scopes: ["User.Read", "Mail.Read", "Mail.ReadWrite", "Mail.Send"]
    })
        .then(loginResponse => {
            msalInstance.setActiveAccount(loginResponse.account);
            return loginResponse.account;
        })
        .catch(error => {
            console.log("Login failed:", error);
            throw error;
        });
}

// Function for token, this token is required to do action on an account
export function getAccessToken() 
{
    const account = msalInstance.getActiveAccount();
    try
    {
        if (!account) 
        {
            return Promise.reject("No active account! Please log in.");
        }

        return msalInstance.acquireTokenSilent({
            scopes: ["Mail.Read", "Mail.ReadWrite", "Mail.Send"],
            account: account
        })
    }
    catch(error)
    {
        // Open a popup window and allow the user to reconnect, generating a new access token.
        console.Error(error)
        return msalInstance.acquireTokenPopup({
            scopes: ["Mail.Read", "Mail.ReadWrite", "Mail.Send"],
            account: account
        });
    }
}

// Read mails
export function readEmails()
{
    console.log("I'm in readEmail");
    return getAccessToken().then(token => {
        console.log("Access Token: ", token); 
        return fetch('https://graph.microsoft.com/v1.0/me/messages', 
        {
            method: 'GET',
            headers: 
            {
                // A Bearer Token is an access token which proves that the user is authorized to access a protected resource.
                Authorization: `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            }
        },
        console.log("I'm in readEmail and fetch "))

        .then(response => 
        {
            // Verify the statut of the response (statut HTTP 200 or not )
            if (!response.ok)
            {
                throw new Error(`Error fetching emails: ${response.status} ${response.statusText}`);
            }
            return response.json(); 
        },
        console.log("I'm in readEmail and then ")
        )

        .then(data => {
                console.log("Emails: ", data);
                return data;
            },
            console.log("I'm in readEmail and data ")
        )
        .catch(error => {
                console.error("Error fetching emails: ", error);
            });
    });
}

// Send mail
export function sendEmail(emailData) 
{
    return getAccessToken().then(token => {
        const emailBody = 
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
                            address: emailData.recipient
                        }
                    }
                ]
            },

            saveToSentItems: "true"
        };

        return fetch('https://graph.microsoft.com/v1.0/me/sendMail', 
        {
            method: 'POST',
            headers: 
            {
                Authorization: `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailBody)
        })
            .then(response => {
                if (response.ok) 
                {
                    console.log("Email sent successfully");
                } 
                else 
                {
                    console.error("Failed to send email", response);
                }
            })
            .catch(error => 
            {
                console.error("Error sending email: ", error);
            });
    });
}

// Delete mail
export function deleteEmail(messageId) 
{
    return getAccessToken().then(token => 
    {
        return fetch(`https://graph.microsoft.com/v1.0/me/messages/${messageId}`, 
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => 
            {
                if (response.ok) 
                {
                    console.log(`Email with ID ${messageId} deleted successfully`);
                } 
                else 
                {
                    console.error("Failed to delete email", response);
                }
            })
            .catch(error => 
            {
                console.error("Error deleting email: ", error);
            });
    });
}

