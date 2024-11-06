<template>
    <div class = "linkDiv" v-if="user">
      <router-link to = "/">Home</router-link>
      <router-link to = "send">Send Email</router-link>
    </div>
    <div class = "EmailManagementDiv">
        <EmailManagementComponent/>
    </div>
</template>

<script>
import EmailManagementComponent from '@/components/emailManagementComponentMicrosoft.vue';
import { mapGetters } from 'vuex';

export default 
{
  name: 'SendEmailPage',
  components: 
  {
    EmailManagementComponent
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
.EmailManagementDiv
{
    margin-top:20px;
}

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