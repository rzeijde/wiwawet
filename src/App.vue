<template>
  <v-app>
    <WiWaWet msg="Welcome to Your Vue.js App"/>
  </v-app>
</template>

<script>
import WiWaWet from './components/WiWaWet.vue'

export default {
  name: 'App',
  components: {
    WiWaWet: WiWaWet
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
