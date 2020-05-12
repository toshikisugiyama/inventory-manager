import Vue from 'vue'
import VueRouter from 'vue-router'
import Inventory from './pages/Inventory.vue'
import Login from './pages/Login.vue'

Vue.use(VueRouter)

const routes: any = [
  {
    path: '/',
    component: Inventory
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
