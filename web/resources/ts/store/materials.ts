import { Materials, MaterialItem } from "./types"
import axios from "axios"
import { OK } from "../util"

const url: string = '/api/v1/materials'
const state: Materials = {
  materialItems: [],
  materialItem: null
}
const getters = {
  getMaterialItem: (state: Materials) => (materialId: number) => {
    return state.materialItems.find(materialItem => materialItem.id === materialId)
  }
}
const mutations = {
  setMaterialItems (state: Materials, materials: Array<MaterialItem>) {
    state.materialItems = materials
  },
  setMaterialItem (state: Materials, material: MaterialItem) {
    state.materialItem = material
  }
}
const actions = {
  async fetchMaterialItems ({commit}: {commit: Function}) {
    const response = await axios.get(url)
    if (response.status !== OK) {
      commit('error/setCode', response.status, {root: true})
      return false
    }
    commit('setMaterialItems', response.data.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
