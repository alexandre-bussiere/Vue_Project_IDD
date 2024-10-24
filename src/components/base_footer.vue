<template>
  <footer class="base-footer">
    <div class="footer-content">
      <nav>
        <ul>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-of-service">Terms of Service</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </nav>
      <br/>
      <p >&copy; 2024 - Your Company. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'BaseFooter',
};
</script>

<style scoped>
.base-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #343a40;
  color: #fff;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #ddd;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content p {
  margin: 0;
  font-size: 14px; /* Taille des caractères du texte de copyright */
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0.5rem 0 0 0;
}

nav ul li {
  margin: 0 1rem;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 16px; /* Taille des caractères des liens */
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>
