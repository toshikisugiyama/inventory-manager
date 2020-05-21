import axios from 'axios'
import {AuthState, User} from './types'

const state: AuthState = {
  user: null
}

const getters = {
  check: (state: AuthState) => !! state.user,
  username: (state: AuthState) => state.user ? state.user.name : ''
}
const mutations = {
  setUser (state: AuthState, user: User) {
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
  },
  async logout (context: any) {
    const response = await axios.post('/api/v1/logout')
    context.commit('setUser', null)
  },
  async currentUser (context: any) {
    const response = await axios.get('/api/v1/user')
    const user: User = response.data || null
    context.commit('setUser', user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
