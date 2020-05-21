import axios from 'axios'
import {AuthState, User, LoginError} from './types'
import {OK, UNPROCESSABLE_ENTITY} from '../util'

const state: AuthState = {
  user: null,
  apiStatus: null,
  loginError: null
}

const getters = {
  check: (state: AuthState) => !! state.user,
  username: (state: AuthState) => state.user ? state.user.name : ''
}
const mutations = {
  setUser (state: AuthState, user: User) {
    state.user = user
  },
  setApiStatus (state: AuthState, apiStatus: boolean) {
    state.apiStatus = apiStatus
  },
  setLoginErrorMessages (state: AuthState, messages: LoginError) {
    state.loginError = messages
  }
}
const actions = {
  async register (context: any, data: User) {
    const response = await axios.post('/api/v1/register', data)
    context.commit('setUser', response.data)
  },
  async login (context: any, data: User) {
    context.commit('setUser', null)
    context.commit('setLoginErrorMessages', null)
    const response = await axios.post('/api/v1/login', data)
      .catch(error => error.response || error)
    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }
    context.commit('setApiStatus', false)
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit('setLoginErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
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
