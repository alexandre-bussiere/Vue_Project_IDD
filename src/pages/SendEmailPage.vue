<template>
    <div>
        <router-link to = "/">Home</router-link>
    </div>
    <div class = "emailComponent">
      <sendEmail/>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import sendEmail from '@/components/sendEmail.vue';
export default 
{
  name: 'SendEmailPage',
  components: 
  {
    sendEmail
  },
  data() 
  {
  },
  computed: 
  {
    ...mapGetters(['getUser']), 
    user() 
    {
      return this.getUser;
    }
  },
};
</script>

<style scoped>

</style>