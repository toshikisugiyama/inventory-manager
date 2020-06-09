<template lang="pug">
.material-add
  section.material-add__container
    h2.material-add__container__title 原材料新規登録
    section.material-add__container__name
      label(for="name") 品名
      input#name(v-model="material.name" type="text" autofocus)
    section.material-add__container__supplier
      label(for="supplier") 仕入先
      input#supplier(v-model="material.supplier" type="text")
    section.material-add__container__unit
      label(for="unit") 単位
      input#unit(v-model="material.unit" type="text")
    .material-add__container__buttons
      button(@click="goBackToMaterialsPage") 戻る
      button(@click="confirmAddMaterialItem" :class="{disabled: validateEmpty}" :disabled="validateEmpty") 決定
</template>

<script lang="ts">
import Vue from 'vue'
import { MaterialItem } from '../store/types'
export default Vue.extend({
  computed: {
    validateEmpty (): boolean {
      return Object.values(this.material).includes('')
    },
    material: {
      get (): MaterialItem {
        return this.$store.state.materials.materialItem
      },
      set (value: MaterialItem) {
        this.$store.commit('materials/setMaterialItem', value)
      }
    }
  },
  methods: {
    async goBackToMaterialsPage () {
      await this.$store.dispatch('loading/commitLoadingState', true)
      await this.$store.dispatch('materials/resetMaterialState')
      await this.$store.dispatch('materials/fetchMaterialItems')
      this.$router.push({name: 'materialItems'})
      this.$store.dispatch('loading/commitLoadingState', false)
    },
    confirmAddMaterialItem () {
      this.$router.push({name: 'confirmAddMaterialItem'})
    }
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
      & > button.disabled {
        cursor: default;
        opacity: 0.3;
      }
    }
  }
}
</style>
