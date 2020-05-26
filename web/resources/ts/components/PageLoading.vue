<template lang="pug">
section.loading
  h1.loading__title ...Loading
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>

<style lang="scss" scoped>
.loading{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: .8);
  display: flex;
  align-items: center;
  justify-content: center;
  &__title {
    color: #fff;
    user-select: none;
  }
}
</style>
