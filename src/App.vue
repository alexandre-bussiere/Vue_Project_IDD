<template>
  <div id="app">
    <base_layout>
      <HomePage/>
    </base_layout>
  </div>
</template>

<script>
import base_layout from './components/base_layout.vue';
import HomePage from './pages/HomePage.vue';

export default 
{
  name: 'App',
  components: 
  { 
    base_layout,
    HomePage
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
