import axios from 'axios'
import {AuthState} from './types'

const state: AuthState = {
  user: null
}

const getters = {}
const mutations = {
  setUser (state: any, user: any) {
    state.user = user
  }
}
const actions = {
  async register (context: any, data: any) {
    const response = await axios.post('/api/v1/register', data)
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
