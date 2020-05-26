<template lang="pug">
.materials
  section.materials__container
    .materials__container__head
      h2.materials__container__head__title Materials
      .materials__container__head__buttons
        button(@click="selectAll" :class="{disabled: !materialsIds.length}" :disabled="!materialsIds.length") {{ text.selectbutton }}
        button(@click="deleteMaterials" :class="{disabled: !materialSelected}" :disabled="!materialSelected") 削除
        button(@click="goToAddPage") + 新しい原材料を登録
    MaterialsItem
</template>

<script lang="ts">
import Vue from 'vue'
import MaterialsItem from '../components/MaterialsItem.vue'
import { MaterialItem, Materials } from '../store/types'
export default Vue.extend({
  data () {
    return {
      isAbleToClickDelete: false
    }
  },
  computed: {
    text (): {
      selectbutton: string
    } {
      return {
        selectbutton: this.isSelectedAllMaterials ? '選択をクリア' : 'すべて選択'
      }
    },
    selectedMaterialIds: {
      get (): Array<number> {
        return this.$store.state.materials.selectedMaterialIds
      },
      set (value: Array<number>) {
        this.$store.commit('materials/setSelectedMaterialIds', value)
      }
    },
    getSelectedMaterials (): Array<MaterialItem> {
      return this.$store.getters['materials/getSelectedItems']
    },
    materialSelected (): boolean {
      if (this.selectedMaterialIds) {
        return this.selectedMaterialIds.length > 0
      }
      return false
    },
    isSelectedAllMaterials (): boolean {
      return this.$store.state.materials.isSelectedAllMaterials
    },
    unselectedMaterials (): Array<Materials> {
      return this.$store.getters['materials/getUnselectedItems']
    },
    materialsIds (): Array<number> {
      return this.$store.getters['materials/getMaterialsIds']
    }
  },
  components: {
    MaterialsItem
  },
  methods: {
    goToAddPage () {
      this.$router.push({name: 'addMaterialItem'})
      this.$store.dispatch('materials/resetMaterialState')
    },
    async deleteMaterials () {
      if (this.selectedMaterialIds.length > 0) {
        this.$store.dispatch('loading/commitLoadingState', true)
        const materialIds: Array<number> = await this.selectedMaterialIds
        await this.$store.dispatch('materials/deleteMaterlialItem', materialIds)
        await this.$store.commit('materials/setSelectedMaterialIds', [])
        this.selectedMaterialIds = []
        this.$store.commit('materials/isNotSelectedAllMaterials')
        this.$store.dispatch('loading/commitLoadingState', false)
      }
    },
    async selectAll () {
      if (!this.materialsIds.length) return
      await this.$store.commit('materials/toggleIsSelectedAllMaterials')
      if (!this.isSelectedAllMaterials) {
        this.$store.commit('materials/setSelectedMaterialIds', [])
      } else {
        this.$store.commit('materials/setSelectedMaterialIds', this.materialsIds)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.materials {
  &__container {
    width: 80vw;
    margin: 0 auto;
    @media screen and (max-width: 600px) {
      padding: 0 10px;
      width: 100vw;
    }
    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &__title {
        flex-grow: 4;
      }
      &__buttons {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        & > button {
          cursor: pointer;
        }
        & > button:not(:last-child) {
          margin: 0 10px 0 0;
        }
        & > button.disabled {
          cursor: default;
          opacity: 0.3;
        }
      }
    }
  }
}
</style>
