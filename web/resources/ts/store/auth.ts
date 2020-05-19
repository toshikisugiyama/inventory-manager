import axios from 'axios'
import {AuthState, User} from './types'

const state: AuthState = {
  user: null
}

const getters = {}
const mutations = {
  setUser (state: any, user: User) {
    state.user = user
  }
}
const actions = {
  async register (context: any, data: User) {
    const response = await axios.post('/api/v1/register', data)
    context.commit('setUser', response.data)
  },
  async login (context: any, data: User) {
    const response = await axios.post('/api/v1/login', data)
    context.commit('setUser', response.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
