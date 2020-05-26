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
    if (this.$route.name === 'materialItem' || this.$route.name === 'editMaterialItem') {
      await this.$store.dispatch('materials/resetMaterialState')
      await this.$store.dispatch('materials/showMaterialItem', this.$route.params.materialId)
    }
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
