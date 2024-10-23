<template>
  <div id="app">
    <base_layout>
      <router-view />
    </base_layout>
  </div>
</template>

<script>
import base_layout from './components/base_layout.vue';

export default 
{
  name: 'App',
  components: 
  { 
    base_layout
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
