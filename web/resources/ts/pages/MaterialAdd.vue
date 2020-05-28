<template lang="pug">
.material-add
  section.material-add__container
    h2.material-add__container__title 原材料新規登録
    section.material-add__container__name
      label(for="name") 品名
      input#name(v-model="name" type="text" autofocus)
    section.material-add__container__supplier
      label(for="supplier") 仕入先
      input#supplier(v-model="supplier" type="text")
    section.material-add__container__unit
      label(for="unit") 単位
      input#unit(v-model="unit" type="text")
    .material-add__container__buttons
      button(@click="goToMaterialListsPage") 戻る
      button(@click="confirmAddMaterialItem") 決定
</template>

<script lang="ts">
import Vue from 'vue'
import { MaterialItem } from '../store/types'
export default Vue.extend({
  computed: {
    material (): MaterialItem {
      return this.$store.state.materials.materialItem
    },
    name: {
      get (): string | undefined {
        return this.material ? this.material.name : ''
      },
      set (value: string) {
        this.material.name = value
      },
    },
    supplier: {
      get (): string | undefined {
        return this.material ? this.material.supplier : ''
      },
      set (value: string) {
        this.material.supplier = value
      },
    },
    unit: {
      get (): string | undefined {
        return this.material ? this.material.unit : ''
      },
      set (value: string) {
        this.material.unit = value
      },
    }
  },
  methods: {
    goToMaterialListsPage () {
      this.$router.push({name: 'materialItems'})
    },
    confirmAddMaterialItem () {
      this.$router.push({name: 'confirmAddMaterialItem'})
      this.$store.commit('materials/setMaterialItem', this.material)
    },
  }
})
</script>

<style lang="scss" scoped>
.material-add {
  &__container {
    width: 80vw;
    margin: 0 auto;
    @media screen and (max-width: 600px) {
      padding: 0 10px;
      width: 100vw;
    }
    &__title {
      text-align: center;
    }
    &__name,
    &__supplier,
    &__unit {
      display: flex;
      flex-direction: column;
      margin: 0 0 30px;
      & > label {
        margin: 0 0 5px;
      }
      & > input {
        padding: 5px;
      }
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
