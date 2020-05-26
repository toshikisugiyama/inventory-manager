<template lang="pug">
ul.materials__list(v-if="materials.length > 0")
  li.materials__list__item(v-for="material in materials" :key="material.id")
    router-link.materials__list__item__content(:to="{name: 'materialItem', params: {materialId: material.id}}" tag="div")
      h3.materials__list__item__content__title {{ material.name }}
ul.materials__list(v-else)
  li 原材料が登録されていません。
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    materials () {
      return this.$store.state.materials.materialItems
    }
  }
})
</script>

<style lang="scss" scoped>
.materials__list {
  list-style: none;
  padding: 0;
  &__item {
    &__content {
      margin: 5px 0px;
      padding: 10px;
      cursor: pointer;
      background-color: #727272;
      &__title {
        margin: 0;
      }
    }
  }
}
</style>
