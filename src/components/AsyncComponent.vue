<template>
  <base-button
    :disabled="isPending"
    :color="color"
    @click="handleClick"
  >
    <a v-if="isPending"> Loading... </a>
    <slot></slot>
  </base-button>
</template>

<script>
import BaseButton from './base_button.vue';
export default {
    name: 'AsyncComponent',
    components: {
        BaseButton,
    },
  data() {
    return {
      isPending: false,
    };
  },

  methods: {
    handleClick() {
        const originalOnClick = this.$attrs.onClick;
        if (originalOnClick && typeof originalOnClick === 'function') {
            this.isPending = true;
            originalOnClick().finally(() => {
                this.isPending = false; 
            });
        }
    }
  }
};
</script>