import { Inventories, InventoryItem } from './types'
import axios from 'axios'
import { OK } from '../util'

const url: string = '/api/v1/inventories/'
const state: Inventories = {
  inventoryItems: []
}
const getters = {
  getInventoryItems: (state: Inventories) => (materialId: number) => {
    return state.inventoryItems.filter((item: InventoryItem) => item.material_id == materialId)
  }
}
const mutations = {
  setInventoryItems: (state: Inventories, inventoryItems: Array<InventoryItem>) => {
    state.inventoryItems = inventoryItems
  }
}
const actions = {
  async fetchInventoryItems ({commit}: {commit: Function}) {
    const response = await axios.get(url)
    if (response.status !== OK) {
      commit('error/setCode', response.status, {root: true})
      return false
    }
    commit('setInventoryItems', response.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
