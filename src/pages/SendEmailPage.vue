<template>
    <div class = "linkDiv" v-if="user">
        <router-link to = "/">Home</router-link>
        <router-link to = "management">Email Management</router-link>
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
.linkDiv
{
  display: flex;
  padding: 20px;
  justify-content: space-around;
  font-size: 18px;

  color: #333;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
}
</style>