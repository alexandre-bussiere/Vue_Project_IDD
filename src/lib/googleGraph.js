import { gapi } from 'gapi-script';

const GOOGLE_CLIENT_ID = process.env.VUE_APP_CLIENT_ID_GOOGLE;

export async function initializeGoogleAuth() {
    try {
        return new Promise((resolve, reject) => {
            gapi.load('client:auth2', async () => {
                try {
                    const auth2 = await gapi.auth2.init({
                        client_id: GOOGLE_CLIENT_ID,
                        scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send'
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
export async function getGoogleEmails(pageToken = null) {
    try {
        const params = {
            'userId': 'me',
            'maxResults': 10,
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
