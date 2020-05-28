<template lang="pug">
.materials
  section.materials__container
    .materials__container__head
      h2.materials__container__head__title Materials
      .materials__container__head__button
        button(@click="goToAddPage") + 新しい原材料を登録
    MaterialsItem
</template>

<script lang="ts">
import Vue from 'vue'
import MaterialsItem from '../components/MaterialsItem.vue'
import { MaterialItem } from '../store/types'
export default Vue.extend({
  components: {
    MaterialsItem
  },
  methods: {
    goToAddPage () {
      this.$router.push({name: 'addMaterialItem'})
      const materialItem: MaterialItem = {
        name: '',
        supplier: '',
        unit: ''
      }
      this.$store.commit('materials/setMaterialItem', materialItem)
    }
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
    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &__title {
        flex-grow: 4;
      }
      &__button {
        flex-grow: 1;
        text-align: right;
        & > button {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
