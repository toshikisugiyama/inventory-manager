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
import {INTERNAL_SERVER_ERROR} from './util'
export default Vue.extend({
  components: {
    Header,
    Footer
  },
  computed: {
    errorCode () {
      return this.$store.state.error.code
    }
  },
  watch: {
    errorCode: {
      handler (value) {
        if (value === INTERNAL_SERVER_ERROR) {
          this.$router.push('/500')
        }
      },
      immediate: true
    },
    $route () {
      this.$store.commit('error/setCode', null)
    }
  }
})
</script>
