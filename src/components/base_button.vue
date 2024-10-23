<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled" 
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
    }
  },
  computed: {
    buttonClasses() {
      return `base-button base-button--${this.color}`;
    }
  },

  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.base-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.base-button--primary {
  background-color: #3498db;
  color: white;
}

.base-button--primary:hover,
.base-button--primary:focus {
  background-color: #2980b9;
}

.base-button--warn {
  background-color: #f39c12;
  color: white;
}

.base-button--warn:hover,
.base-button--warn:focus {
  background-color: #e67e22;
}

.base-button--danger {
  background-color: #e74c3c;
  color: white;
}

.base-button--danger:hover,
.base-button--danger:focus {
  background-color: #c0392b;
}

.base-button:disabled {
  background-color: #bdc3c7;
}
</style>
