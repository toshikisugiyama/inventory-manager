<template lang="pug">
header.header
  nav.header__nav
    RouterLink(to="/") inventory-manager
    RouterLink(to="/login") login/register
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

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
  }
}
</style>
