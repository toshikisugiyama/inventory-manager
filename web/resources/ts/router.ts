import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './pages/Login.vue'
import Materials from './pages/Materials.vue'
import Material from './pages/Material.vue'
import MaterialEdit from './pages/MaterialEdit.vue'
import MaterialEditConfirm from './pages/MaterialEditConfirm.vue'
import MaterialAdd from './pages/MaterialAdd.vue'
import MaterialAddConfirm from './pages/MaterialAddConfirm.vue'
import InventoryConsume from './pages/InventoryConsume.vue'
import InventoryConsumeConfirm from './pages/InventoryConsumeConfirm.vue'
import InventoryAdd from './pages/InventoryAdd.vue'
import InventoryAddConfirm from './pages/InventoryAddConfirm.vue'
import SystemError from './pages/errors/System.vue'
import store from './store'

Vue.use(VueRouter)

const routes: any = [
  {
    path: '/login',
    component: Login,
    beforeEnter: (next: any) => {
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
    path: '/:materialId/add/confirm',
    name: 'confirmAddInventoryItem',
    component: InventoryAddConfirm
  },
  {
    path: '/:materialId/add',
    name: 'addInventoryItem',
    component: InventoryAdd
  },
  {
    path: '/:materialId/consume/confirm/:inventoryId',
    name: 'consumeConfirmInventoryItem',
    component: InventoryConsumeConfirm
  },
  {
    path: '/:materialId/consume/:inventoryId',
    name: 'consumeInventoryItem',
    component: InventoryConsume
  },
  {
    path: '/add/confirm',
    name: 'confirmAddMaterialItem',
    component: MaterialAddConfirm
  },
  {
    path: '/add',
    name: 'addMaterialItem',
    component: MaterialAdd
  },
  {
    path: '/edit/confirm/:materialId',
    name: 'confirmEditMaterialItem',
    component: MaterialEditConfirm
  },
  {
    path: '/edit/:materialId',
    name: 'editMaterialItem',
    component: MaterialEdit
  },
  {
    path: '/:materialId',
    name: 'materialItem',
    component: Material
  },
  {
    path: '/',
    name: 'materialItems',
    component: Materials
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
