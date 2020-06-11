<template lang="pug">
footer.footer
  button.footer__button(@click="logout" v-if="isLogin") Logout
  RouterLink.footer__button(to="/login" v-else) Login / Register
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      if (this.$store.state.auth.apiStatus === true) {
        this.$router.push('/login')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 5vh;
  padding: 0 15px;
  z-index: 10;
  background-color: #fff;
  &__button {
    cursor: pointer;
    user-select: none;
    border: none;
  }
}
</style>
