import { gapi } from 'gapi-script';

const GOOGLE_CLIENT_ID = process.env.VUE_APP_CLIENT_ID_GOOGLE;

export async function initializeGoogleAuth() {
    try {
        return new Promise((resolve, reject) => {
            gapi.load('client:auth2', async () => {
                try {
                    const auth2 = await gapi.auth2.init({
                        client_id: GOOGLE_CLIENT_ID,
                        scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.modify https://mail.google.com/'
                    });
                    await gapi.client.load('gmail', 'v1');
                    resolve(auth2);
                } catch (error) {
                    console.error('Google Auth Initialization failed:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error("Initialization failed:", error);
        return null;
    }
}

export async function signInAndGetGoogleUser() {
    try {
        const auth2 = await initializeGoogleAuth();

        const googleUser = await auth2.signIn({
            prompt: 'select_account'
        });
        const user = googleUser.getBasicProfile();

        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            imageUrl: user.getImageUrl(),
            accessToken: googleUser.getAuthResponse().access_token,
        };
    } catch (error) {
        console.error("Login failed:", error);
        return null;
    }
}
export async function getGoogleEmails(pageToken = null, maxResults = 10) {
    try {
        const params = {
            'userId': 'me',
            'maxResults': maxResults,
            'q': 'in:inbox'
        };
        if (pageToken) {
            params.pageToken = pageToken;
        }

        const response = await gapi.client.gmail.users.messages.list(params);

        const messages = response.result.messages || [];
        const emails = [];

        for (let message of messages) {
            const email = await gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': message.id,
            });

            emails.push({
                id: message.id,
                snippet: email.result.snippet,
                subject: email.result.payload.headers.find(header => header.name === 'Subject')?.value,
                sender: email.result.payload.headers.find(header => header.name === 'From')?.value,
            });
        }

        return {
            emails,
            nextPageToken: response.result.nextPageToken
        };
    } catch (error) {
        console.error('Failed to fetch Google emails:', error);
        return { emails: [], nextPageToken: null };
    }
}

export async function deleteGoogleEmail(emailId) {
    try {
        console.log("Attempting to delete email with ID:", emailId);
        const authInstance = gapi.auth2.getAuthInstance();
        if (!authInstance.isSignedIn.get()) {
            console.log("User not signed in. Signing in...");
            await authInstance.signIn();
        }

        const currentUser = authInstance.currentUser.get();
        const grantedScopes = currentUser.getGrantedScopes();
        console.log("Granted Scopes:", grantedScopes);

        if (!grantedScopes.includes('https://www.googleapis.com/auth/gmail.modify')) {
            throw new Error('Insufficient authentication scopes');
        }

        await gapi.client.gmail.users.messages.delete({
            'userId': 'me',
            'id': emailId,
        });

        console.log(`Email with ID ${emailId} deleted successfully.`);
        return true;
    } catch (error) {
        console.error('Failed to delete Google email:', error);
        console.log("Error details:", error.result ? error.result.error : error);
        return false;
    }
}
