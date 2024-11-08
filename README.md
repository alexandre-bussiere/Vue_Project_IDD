# vue-oauth-microsoft-graph
In this repository you will find a web service to manage your emails.
Once on the website, you can connect to your Microsoft or Google account, to access the functionalities. 
If you don’t log in to an account, the website will just show you the home page.

# Correct folder
To set up, run, or check the content, you need to be inside the folder: **Vue_Project_IDD**

# Set Up

## Project setup
To **download** all the necessary elements, open a terminal and run the following command:
```
npm install
```

## Lints and fixes files
```
npm run lint
```

## Fix Vulnerabilities
```
npm audit fix
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# .env

This part is linked to the setup process.
Once you have downloaded the project, you will need to **create a new file directly inside the Vue_Project_IDD folder**, a **.env** file.

This file will have all **your API keys to connect to your Microsoft or Google account, as well as other essential and mandatory information.**

You must follow this format for the contents of this file:

**VUE_APP_OAUTH_CLIENT_ID=your-personal-key-for-Microsoft
VUE_APP_TENANT_ID=common
VUE_APP_REDIRECT_URI=http://localhost:8081
VUE_APP_CLIENT_ID_GOOGLE=your-personal-key-for-Google**


# RUN THIS PROJECT

## Compiles and hot-reloads for development
To **compile and run the project**, from the Vue_Project_IDD folder, open a terminal and run the command:
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```

# ENDPOINTS
Note that you will be **on localhost:8081** when you launch the project.
From this localhost:8081, once you are connected to Microsoft or Google account, you will be able to access **other endpoints** with links (router-link) that are at the **top of the website** (in the header of the website), to use the various functionalities of this project.

## Connection with Microsoft
With Microsoft, you will have access to the endpoint:

### /send
This endpoint will allow you to access the SendEmailPage to send emails from the website with your Microsoft account

### /management
This endpoint will allow you to access the EmailManagementPage to get your emails from the inbox folder or the sent folder, but also delete emails from the folder of your choice between inbox and sent folder, once you are connected with your Microsoft account

### /search
This endpoint will allow you to access the page SearchMicrosoftmail page to search emails with key words that came from one or multiple emails, you have to specify the folder that you are seeking in, from the website with your Microsoft account

## Connection with Google 
With Google you will have to access the endpoint:

### /get-emails
This endpoint will allow you to access the page GetGoogleMail page to get your emails, but also delete emails, once you are connected with your Google account

### /send-email
This endpoint will allow you to access the page SendGoogleEmail page to send emails from the website with your Google account

### /search
This endpoint will allow you to access the page SearchGoogleMailPage to search emails using keywords from one or more emails, from the website with your Google account
