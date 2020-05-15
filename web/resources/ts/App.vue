<template lang="pug">
div
  Header
  main
    RouterView
  Footer
</template>

<script lang="ts">
import Vue from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default Vue.extend({
  components: {
    Header,
    Footer
  }
})
</script>
