<template lang="pug">
.inventory-item
  section.inventory-item__container(v-if="inventoryItem")
    h1.inventory-item__container__lot-code {{ inventoryItem.lot_code }}
    h2.inventory-item__container__amount {{ inventoryItem.amount}}
    h3.inventory-item__container__dead-line {{ inventoryItem.dead_line}}
  section(v-else)
</template>

<script lang="ts">
import Vue from 'vue'
import { InventoryItem, MaterialItem } from '../store/types'
export default Vue.extend({
  computed: {
    inventoryId (): number {
      return Number(this.$route.params.inventoryId)
    },
    inventoryItem (): InventoryItem {
      return this.$store.getters['inventories/getInventoryItem'](this.inventoryId)
    },
    materialItem (): MaterialItem {
      return this.$store.state.materials.materialItem
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
