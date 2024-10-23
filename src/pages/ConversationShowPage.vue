<template>
  <div>
    <h1>Conversation Details</h1>
    <p>Conversation ID: {{ conversationId }}</p>
  </div>
</template>

<script>
export default {
  name: 'ConversationShowPage',
  data() {
    return {
      conversationId: this.$route.params.id // Access the dynamic :id from the route
    };
  },
  watch: {
    // Watch for changes to the route parameters, so the component updates if the ID changes
    '$route.params.id': function(newId) {
      this.conversationId = newId;
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 10px;
}
p {
  font-size: 18px;
}
</style>
