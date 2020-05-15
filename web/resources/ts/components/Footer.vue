<template lang="pug">
footer.footer
  button.footer__button Logout
  RouterLink.footer__button(to="/login") Login / Register
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

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
