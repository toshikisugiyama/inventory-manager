<template lang="pug">
div
  Header
  main
    RouterView
  Footer
  PageLoading(v-show="loadingState")
</template>

<script lang="ts">
import Vue from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import PageLoading from './components/PageLoading.vue'
import {INTERNAL_SERVER_ERROR} from './util'
export default Vue.extend({
  components: {
    Header,
    Footer,
    PageLoading
  },
  computed: {
    errorCode () {
      return this.$store.state.error.code
    },
    loadingState () {
      return this.$store.state.loading.loadingState
    }
  },
  async created () {
    await this.$store.dispatch('materials/fetchMaterialItems')
    this.$store.commit('loading/setLoadingState', false)
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
    $route: {
      handler () {
        this.$store.commit('error/setCode', null)
      },
      immediate: true
    }
  }
})
</script>

<style lang="scss" scoped>
main {
  padding: 100px 0 0 0;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
