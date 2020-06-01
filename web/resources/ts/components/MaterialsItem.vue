<template lang="pug">
ul.materials__list(v-if="materials.length > 0")
  li.materials__list__item(v-for="material in materials" :key="material.id")
    div.materials__list__item__content
      div.materials__list__item__content__info(@click="goToMaterialPage(material.id)")
        h3.materials__list__item__content__info__title {{ material.name }}
      div.materials__list__item__content__checkbox
        input(:value="material.id" v-model="selectedMaterialIds" @change="changeCheckbox" type="checkbox")
ul.materials__list(v-else)
  li 原材料が登録されていません。
</template>

<script lang="ts">
import Vue from 'vue'
import { MaterialItem } from '../store/types'
export default Vue.extend({
  data (): {
    materialIds: Array<number>
  } {
    return {
      materialIds: []
    }
  },
  computed: {
    materials (): Array<MaterialItem> {
      return this.$store.state.materials.materialItems
    },
    isSelectedAllMaterials (): boolean {
      return this.$store.state.materials.isSelectedAllMaterials
    },
    selectedMaterialIds: {
      get (): Array<number | undefined> {
        return this.$store.state.materials.selectedMaterialIds
      },
      set (value: Array<number>) {
        this.materialIds = value
        this.$store.commit('materials/setSelectedMaterialIds', this.materialIds)
      }
    }
  },
  methods: {
    goToMaterialPage (materialId: string) {
      this.$router.push({name: 'materialItem', params: {materialId}})
    },
    changeCheckbox () {
      this.$store.commit('materials/isNotSelectedAllMaterials')
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__info {
        flex-grow: 99;
        &__title {
          margin: 0;
        }
      }
      &__checkbox {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        & > input {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
