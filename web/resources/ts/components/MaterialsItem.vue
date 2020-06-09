<template lang="pug">
ul.materials__list(v-if="materials.length > 0")
  li.materials__list__item(v-for="material in materials" :key="material.id")
    .materials__list__item__content
      ul.materials__list__item__content__info(@click="goToMaterialPage(material.id)")
        li.materials__list__item__content__info__id
          span.title 管理番号: &nbsp;
          | {{ material.id }}
        li.materials__list__item__content__info__name
          span.title 品名: &nbsp;
          | {{ material.name }}
        li.materials__list__item__content__info__supplier
          span.title 仕入先: &nbsp;
          | {{ material.supplier }}
      .materials__list__item__content__checkbox
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
    async goToMaterialPage (materialId: string) {
      const materialItem: MaterialItem = this.$store.getters['materials/getMaterialItem'](Number(materialId))
      await this.$store.dispatch('materials/resetMaterialState')
      this.$store.commit('materials/setMaterialItem', materialItem)
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
  height: 60vh;
  overflow: auto;
  &__item {
    &__content:hover {
      background-color: #727272;
    }
    &__content {
      margin: 5px 0px;
      padding: 10px;
      cursor: pointer;
      background-color: #a1a1a1;
      translate: background-color 0.8s;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__info {
        flex-grow: 99;
        padding: 0;
        list-style: none;
        &__name {
          font-weight: bold;
          font-size: 2.5vmin!important;
        }
        & > li {
          display: flex;
          align-items: center;
          font-size: 2vmin;
          & > .title {
            font-size: 1.8vmin;
            font-weight: normal;
          }
        }
        & > li:not(:last-child) {
          margin: 0 0 10px;
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
