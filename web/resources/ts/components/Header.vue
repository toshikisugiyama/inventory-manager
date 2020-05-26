<template lang="pug">
header.header
  nav.header__nav
    .header__nav__item.logo(@click="goBackToMaterialsPage") inventory-manager
    RouterLink.header__nav__item.to_login(to="/login" v-if="!isLogin") login/register
    span.header__nav__item.username(v-else) {{ username }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    },
    username () {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    async goBackToMaterialsPage () {
      await this.$store.dispatch('loading/commitLoadingState', true)
      await this.$store.dispatch('materials/resetMaterialState')
      await this.$store.dispatch('materials/fetchMaterialItems')
      this.$router.push({name: 'materialItems'})
      this.$store.dispatch('loading/commitLoadingState', false)
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__item {
      cursor: pointer;
    }
  }
}
</style>
