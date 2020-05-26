<template lang="pug">
.material-edit
  section.material-edit__container
    .material-edit__container__name
      label(for="name") 品名
      input#name(type="text" v-model="name" autofocus)
    .material-edit__container__supplier
      label(for="supplier") 仕入先
      input#supplier(type="text" v-model="supplier")
    .material-edit__container__unit
      label(for="unit") 単位
      input#unit(type="text" v-model="unit")
    .material-edit__container__buttons
      button.material-edit__container__buttons__back(@click="goBackPage") 戻る
      router-link.material-edit__container__buttons__okay(:to="{name: 'confirmEditMaterialItem', params: {materialId: materialId}}" tag='button') 決定
</template>

<script lang="ts">
import Vue from 'vue'
import { MaterialItem } from '../store/types'
export default Vue.extend({
  computed: {
    materialId (): string {
      return this.$route.params.materialId
    },
    material (): MaterialItem {
      const material: number = Number(this.materialId) - 1
      return this.$store.state.materials.materialItems[material]
    },
    name: {
      get (): string | null | undefined {
        return this.material ? this.material.name : null
      },
      set (newValue: string) {
        this.material.name = newValue
      }
    },
    supplier: {
      get (): string | null | undefined {
        return this.material ? this.material.supplier : null
      },
      set (newValue: string) {
        this.material.supplier = newValue
      }
    },
    unit: {
      get (): string | null | undefined {
        return this.material ? this.material.unit : null
      },
      set (newValue: string) {
        this.material.unit = newValue
      }
    }
  },
  methods: {
    async goBackPage () {
      await this.$store.commit('loading/setLoadingState', true)
      this.$router.go(-1)
      await this.$store.dispatch('materials/fetchMaterialItems')
      this.$store.commit('loading/setLoadingState', false)
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
    }
  }
}
</style>

