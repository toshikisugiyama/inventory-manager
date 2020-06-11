<template lang="pug">
ul.inventory__list(v-if="inventoryItems.length > 0")
  li.inventory__list__item(v-for="inventory in inventoryItems")
    .inventory__list__item__content
      ul.inventory__list__item__content__info(@click="goToInventoryItemPage(inventory.id)")
        li.inventory__list__item__content__info__lot_code
          span.title 製造番号: &nbsp;
          | {{ inventory.lot_code }}
        li.inventory__list__item__content__info__amount
          span.title 在庫: &nbsp;
          | {{ inventory.amount + ' ' + materialItem.unit }}
        li.inventory__list__item__content__info__dead_line
          span.title 期限: &nbsp;
          | {{ inventory.dead_line }}
ul.inventory__list(v-else)
  li 在庫はありません。
</template>

<script lang="ts">
import Vue from 'vue'
import { InventoryItem, MaterialItem } from '../store/types'
export default Vue.extend({
  computed: {
    inventoryItems (): Array<InventoryItem> {
      return this.$store.getters['inventories/getInventoryItems'](this.$route.params.materialId)
    },
    materialItem (): MaterialItem {
      return this.$store.state.materials.materialItem
    }
  },
  methods: {
    goToInventoryItemPage (inventoryId: string) {
      this.$router.push({
        name: 'consumeInventoryItem',
        params: {
          materialId: this.$route.params.materialId,
          inventoryId
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.inventory__list {
  list-style: none;
  padding: 0;
  height: 50vh;
  overflow: auto;
  &__item {
    margin: 0 0 5px;
    &__content {
      background-color: rosybrown;
      padding: 10px;
      &__info {
        list-style: none;
        padding: 0;
        cursor: pointer;
        & > li {
          font-size: 2vmin;
          & > .title {
            font-size: 1.8vmin;
          }
        }
        & > li:not(:last-child) {
          margin: 0 0 10px;
        }
      }
    }
  }
}
</style>
