import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import error from './error'
import loading from './loading'
import materials from './materials'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    error,
    loading,
    materials
  }
})

export default store
