<template>
    <div>
        <router-link to = "/">Home</router-link>
    </div>
    <div>
        <EmailManagementComponent/>
    </div>
</template>

<script>
import EmailManagementComponent from '@/components/emailManagementComponent.vue';
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

</style>