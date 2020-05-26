<template lang="pug">
.materials
  section.materials__container
    h2.materials__container__title Materials
    MaterialsItem
</template>

<script lang="ts">
import Vue from 'vue'
import MaterialsItem from '../components/MaterialsItem.vue'
export default Vue.extend({
  components: {
    MaterialsItem
  }
})
</script>

<style lang="scss" scoped>
.materials {
  &__container {
    width: 80vw;
    margin: 0 auto;
    @media screen and (max-width: 600px) {
      padding: 0 10px;
      width: 100vw;
    }
  }
}
</style>
