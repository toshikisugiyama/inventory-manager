import Vue from 'vue'
import VueRouter from 'vue-router'
import Inventory from './pages/Inventory.vue'
import Login from './pages/Login.vue'
import store from './store'

Vue.use(VueRouter)

const routes: any = [
  {
    path: '/',
    component: Inventory
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: (to: any, from: any, next: any) => {
      if (store.getters['auth/check']) {
        next('/')
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
