import Vue from 'vue'
import Router from 'vue-router'
import Storage from '../common/storage'
import PassportLogin from '../pages/passport/login/login.vue'
import IndexList from '../pages/index/list/list.vue'
import DemoList from '../pages/demo/list/list.vue'
import GetDirectAgent from '../pages/index/getDirectAgent/getDirectAgent.vue'
import GetPlayerList from '../pages/index/getPlayerList/getPlayerList.vue'
import ResourceList from '../pages/acl/resourceList/resourceList.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/admin/passport/login',
      name: 'PassportLogin',
      component: PassportLogin
    },
    {
      path: '/admin/index/list',
      name: 'IndexList',
      component: IndexList
    },
    {
      path: '/demo/list',
      name: 'DemoList',
      component: DemoList
    },
    {
      path: '/admin/index/getDirectAgent/:id/:name',
      name: 'GetDirectAgent',
      component: GetDirectAgent
    },
    {
      path: '/admin/index/getPlayerList/:id/:name',
      name: 'GetPlayList',
      component: GetPlayerList
    },
    {
      path: '/admin/acl/resourceList',
      name: 'ResourceList',
      component: ResourceList
    }
  ]
})

let init = true

router.beforeEach((to, from, next) => {
  Storage.set(to.name, to.params)
  if (!init) {
    // window.location.href = to.path
  }
  init = false
  next()
})

export default router
