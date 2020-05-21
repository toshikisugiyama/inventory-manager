import axios from 'axios'
import {ErrorState} from './types'

const state: ErrorState = {
  code: null
}
const getters = {}
const mutations = {
  setCode (state: ErrorState, code: string) {
    state.code = code
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
