<template>
   <GoogleLogin :callback="callbackck" prompt auto-login auto-logout="true"/>
</template>

<script>
export default {
  name: 'SigninButtonGoogle',
  data() {
    return {
      callback:(response) => {
        console.log("Google response");
        console.
        log(response);
      }
    }
  },
  methods: {
    callbackck(user) {
      this.user = user;
      console.log(user);
    }
  }
}
</script>

<style scoped>
/* Center the entire content */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
}

/* Style for the main container */
div {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

/* Heading styles */
h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

h2 {
  color: #666;
  font-size: 18px;
  margin-bottom: 20px;
}

/* Style the buttons */
button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Sign In button style */
button:nth-child(3) {
  background-color: #4285f4;
  color: white;
}

button:nth-child(3):disabled {
  background-color: #a0c0f7;
  cursor: not-allowed;
}

/* Sign Out button style */
button:nth-child(4) {
  background-color: #db4437;
  color: white;
}

button:nth-child(4):disabled {
  background-color: #f2a8a2;
  cursor: not-allowed;
}

/* Hover effect for buttons */
button:hover:not(:disabled) {
  opacity: 0.9;
}
</style>
