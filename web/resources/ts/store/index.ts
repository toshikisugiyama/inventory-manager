import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import error from './error'
import loading from './loading'
import materials from './materials'
import inventories from './inventories'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    error,
    loading,
    materials,
    inventories
  }
})

export default store
