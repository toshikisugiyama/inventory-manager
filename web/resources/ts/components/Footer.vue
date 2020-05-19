<template lang="pug">
footer.footer
  button.footer__button(@click="logout") Logout
  RouterLink.footer__button(to="/login") Login / Register
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
})
</script>

<style lang="scss" scoped>
.footer {
  &__button {
    cursor: pointer;
    user-select: none;
    border: none;
  }
}
</style>
