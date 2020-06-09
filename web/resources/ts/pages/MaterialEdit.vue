<template lang="pug">
.material-edit
  section.material-edit__container
    .material-edit__container__name
      label(for="name") 品名
      input#name(type="text" v-model="material.name" autofocus)
    .material-edit__container__supplier
      label(for="supplier") 仕入先
      input#supplier(type="text" v-model="material.supplier")
    .material-edit__container__unit
      label(for="unit") 単位
      input#unit(type="text" v-model="material.unit")
    .material-edit__container__buttons
      button.material-edit__container__buttons__back(@click="goBackPage") 戻る
      button.material-edit__container__buttons__okay(@click="confirmEditMaterialItem" :class="{disabled: validateEmpty}" :disabled="validateEmpty") 決定
</template>

<script lang="ts">
import Vue from 'vue'
import { MaterialItem } from '../store/types'
export default Vue.extend({
  computed: {
    material: {
      get (): MaterialItem {
        return this.$store.state.materials.materialItem
      },
      set (value: MaterialItem) {
        this.$store.commit('materials/setMaterialItem', value)
      }
    },
    materialId (): string {
      return this.$route.params.materialId
    },
    validateEmpty (): boolean {
      return Object.values(this.material).includes('')
    }
  },
  methods: {
    async goBackPage () {
      this.$store.dispatch('loading/commitLoadingState', true)
      await this.$store.dispatch('materials/showMaterialItem', this.materialId)
      this.$router.push({name: 'materialItem', params: {materialId: this.materialId}})
      this.$store.dispatch('loading/commitLoadingState', false)
    },
    confirmEditMaterialItem () {
      this.$router.push({name: 'confirmEditMaterialItem', params: {materialId: this.materialId}})
    }
  }
})
</script>

<style lang="scss" scoped>
.material-edit {
  &__container {
    width: 80vw;
    margin: 0 auto;
    @media screen and (max-width: 600px) {
      padding: 0 10px;
      width: 100vw;
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

