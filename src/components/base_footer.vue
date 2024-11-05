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
  background-color: #343a40;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  width: 100%;
  border-top: 1px solid #ddd;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content nav {
  display: flex;
}

.footer-content nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-content nav ul li {
  margin: 0 15px;
}

.footer-content nav ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}

.footer-content nav ul li a:hover {
  text-decoration: underline;
}

.footer-content p {
  margin: 0;
  font-size: 14px;
}

</style>
