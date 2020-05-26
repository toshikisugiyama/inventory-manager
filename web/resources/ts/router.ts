import Vue from 'vue'
import VueRouter from 'vue-router'
import Inventory from './pages/Inventory.vue'
import Login from './pages/Login.vue'
import Materials from './pages/Materials.vue'
import Material from './pages/Material.vue'
import MaterialEdit from './pages/MaterialEdit.vue'
import MaterialEditConfirm from './pages/MaterialEditConfirm.vue'
import SystemError from './pages/errors/System.vue'
import store from './store'

Vue.use(VueRouter)

const routes: any = [
  {
    path: '/',
    component: Materials
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
  },
  {
    path: '/500',
    component: SystemError
  },
  {
    path: '/:materialId',
    name: 'materialItem',
    component: Material
  },
  {
    path: '/edit/:materialId',
    name: 'editMaterialItem',
    component: MaterialEdit
  },
  {
    path: '/edit/confirm/:materialId',
    name: 'confirmEditMaterialItem',
    component: MaterialEditConfirm
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
