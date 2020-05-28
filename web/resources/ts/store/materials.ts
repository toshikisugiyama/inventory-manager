import { Materials, MaterialItem } from "./types"
import axios from "axios"
import { OK } from "../util"

const url: string = '/api/v1/materials'
const state: Materials = {
  materialItems: [],
  materialItem: {
    name: '',
    supplier: '',
    unit: ''
  }
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
  },
  async updateMaterialItem ({commit}: {commit: Function}, {materialId, payload}: {materialId: string, payload: MaterialItem}) {
    const response = await axios.put(url + '/' + materialId, payload)
    if (response.status !== OK) {
      commit('error/setCode', response.status, {root: true})
      return false
    }
  },
  async addNewMaterialItem ({commit}: {commit: Function}, payload: MaterialItem) {
    const response = await axios.post(url, payload)
    if (response.status !== OK) {
      commit('error/setCode', response.status, {root: true})
      return false
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
