<template lang="pug">
.material-edit-confirm
  section.material-edit-confirm__container
    h2.material-edit-confirm__container__title 確認
    section.material-edit-confirm__container__name
      h3.material-edit-confirm__container__name__title 品名
      .material-edit-confirm__container__name__content {{ name }}
    section.material-edit-confirm__container__supplier
      h3.material-edit-confirm__container__supplier__title__supplier 仕入先
      .material-edit-confirm__container__supplier__content {{ supplier }}
    section.material-edit-confirm__container__unit
      h3.material-edit-confirm__container__unit__title__unit 単位
      .material-edit-confirm__container__unit__content {{ unit }}
    section.material-edit-confirm__container__buttons
      button.material-edit-confirm__container__buttons__back(@click="goBackPage") キャンセル
      button.material-edit-confirm__container__buttons__okay(@click="editMaterial") 決定
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
    goBackPage () {
      this.$router.go(-1)
    },
    async editMaterial () {
      this.$router.push({name: 'materialItem', params: {materialId: this.materialId}})
      await this.$store.dispatch('materials/updateMaterialItem', {materialId: this.materialId, payload: this.material})
      await this.$store.dispatch('materials/fetchMaterialItems')
    }
  }
})
</script>

<style lang="scss" scoped>
.material-edit-confirm {
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
