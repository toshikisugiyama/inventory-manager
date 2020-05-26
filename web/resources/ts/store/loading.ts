import { Loading } from "./types"

const state: Loading = {
  loadingState: true
}
const getters = {}
const mutations = {
  setLoadingState (state: Loading, payload: boolean) {
    state.loadingState = payload
  }
}
const actions = {
  commitLoadingState ({commit}: {commit: Function}, payload: boolean) {
    commit('setLoadingState', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
