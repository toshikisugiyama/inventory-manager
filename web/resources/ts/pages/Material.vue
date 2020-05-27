<template lang="pug">
.material
  section.material__container(v-if="material")
    h1.material__container__name {{material.name}}
    h2.material__container__supplier {{ material.supplier }}
    div.material__container__buttons
      button.material__container__buttons__back(@click="goBackPage") 戻る
      router-link.material__container__buttons__edit(:to="{name: 'editMaterialItem', params: {materialId: materialId}}" tag="button") 編集
  section(v-else)
</template>

<script lang="ts">
import Vue from 'vue'
import { MaterialItem } from '../store/types'
export default Vue.extend({
  computed: {
    material () {
      const materialId: number = Number(this.$route.params.materialId)
      return this.$store.getters['materials/getMaterialItem'](materialId)
    },
    materialId (): string {
      return this.$route.params.materialId
    }
  },
  methods: {
    goBackPage () {
      this.$router.push({name: 'materialItems'})
      this.$store.commit('materials/setMaterialItem', null)
    }
  },
})
</script>

<style lang="scss" scoped>
.material {
  &__container {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 600px) {
      padding: 10px;
      width: 100vw;
    }
    &__supplier {
      text-align: right;
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
