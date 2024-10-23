<template>
  <div>
    <header>
      <BaseHeader />
    </header>
    
    <!-- Slot where the dynamic content will be inserted -->
    <main>
      <slot></slot>
    </main>
    
    <footer>
      <BaseFooter />
    </footer>
  </div>
</template>

<script>
import BaseFooter from './base_footer.vue';
import BaseHeader from './base_header.vue';

export default {
  components: { 
    BaseFooter,
    BaseHeader,
  },
  name: 'BaseLayout',
};
</script>
