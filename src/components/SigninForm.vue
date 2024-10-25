<template>
    <div class="login-container">
        <form class="login-form">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email">
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password">
            
            <input type="submit" value="Login">
            <br />
            <div class="Extra-login">
              <slot></slot>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    name: 'SigninForm',
    components: {
    },
    

}
</script>

<style scoped>

.Extra-login {
  display: flex;
  flex-direction: column;
  justify-content: center;  
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 300px;
  margin: auto;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}

.login-form {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
}

.login-form label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.login-form input[type="email"],
.login-form input[type="password"] {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
}

.login-form input[type="submit"] {
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-form input[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
