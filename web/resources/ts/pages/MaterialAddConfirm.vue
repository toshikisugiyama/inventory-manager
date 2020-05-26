<template lang="pug">
.material-add-confirm
  section.material-add-confirm__container(v-if="newMaterial")
    h2.material-add-confirm__container__title 原材料新規登録確認
    section.material-add-confirm__container__name
      h3.material-add-confirm__container__name__title 品名
      .material-add-confirm__container__name__content {{ newMaterial.name }}
    section.material-add-confirm__container__supplier
      h3.material-add-confirm__container__supplier__title 仕入先
      .material-add-confirm__container__supplier__content {{ newMaterial.supplier }}
    section.material-add-confirm__container__unit
      h3.material-add-confirm__container__unit__title 単位
      .material-add-confirm__container__unit__content {{ newMaterial.unit }}
  section.material-add-confirm__container__buttons
    button.material-add-confirm__container__buttons__back(@click="goBackToMaterialAddPage") キャンセル
    button.material-add-confirm__container__button__okay(v-if="newMaterial" @click="addMaterial") 決定
</template>

<script lang="ts">
import Vue from 'vue'
import { MaterialItem } from '../store/types'
export default Vue.extend({
  computed: {
    newMaterial (): MaterialItem {
      return this.$store.state.materials.materialItem
    }
  },
  methods: {
    goBackToMaterialAddPage () {
      this.$router.push({name: 'addMaterialItem'})
    },
    async addMaterial () {
      await this.$store.dispatch('loading/commitLoadingState', true)
      await this.$store.dispatch('materials/addNewMaterialItem', this.newMaterial)
      this.$store.dispatch('materials/resetMaterialState')
      this.$router.push({name: 'materialItems'})
      this.$store.dispatch('loading/commitLoadingState', false)
    }
  },
  created () {
    if (Object.values(this.$store.state.materials.materialItem).includes('')) {
      this.goBackToMaterialAddPage()
    }
  }
})
</script>

<style lang="scss" scoped>
.material-add-confirm {
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
