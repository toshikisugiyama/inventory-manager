<template lang="pug">
.material
  section.material__container(v-if="material")
    h1.material__container__name {{material.name}}
    h2.material__container__supplier {{ material.supplier }}
    InventoryListItem
    div.material__container__buttons
      button.material__container__buttons__back(@click="goBackToMaterialsPage") 戻る
      button.material__container__buttons__edit(@click="editMaterialItem") 編集
  section(v-else)
</template>

<script lang="ts">
import Vue from 'vue'
import { MaterialItem } from '../store/types'
import InventoryListItem from '../components/InventoryListItem.vue'
export default Vue.extend({
  components: {
    InventoryListItem
  },
  computed: {
    material (): MaterialItem {
      return this.$store.state.materials.materialItem
    },
    materialId (): string {
      return this.$route.params.materialId
    }
  },
  methods: {
    async goBackToMaterialsPage () {
      await this.$store.dispatch('loading/commitLoadingState', true)
      await this.$store.dispatch('materials/resetMaterialState')
      await this.$store.dispatch('materials/fetchMaterialItems')
      await this.$store.dispatch('inventories/fetchInventoryItems')
      this.$router.push({name: 'materialItems'})
      this.$store.dispatch('loading/commitLoadingState', false)
    },
    editMaterialItem () {
      this.$store.commit('materials/setMaterialItem', this.material)
      this.$router.push({name: 'editMaterialItem', params: {materialId: this.materialId}})
    }
  }
})
</script>

<style lang="scss" scoped>
.material {
  &__container {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 600px) {
      padding: 10px;
      width: 100vw;
    }
    &__supplier {
      text-align: right;
    }
    &__buttons {
      width: 150px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > button {
        cursor: pointer;
      }
    }
  }
}
</style>
