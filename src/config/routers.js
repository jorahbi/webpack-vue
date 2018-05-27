import Vue from 'vue'
import Router from 'vue-router'
import PassportLogin from '../pages/passport/login/login.vue'
import IndexList from '../pages/index/list/list.vue'
import DemoList from '../pages/demo/list/list.vue'
import GetDirectAgent from '../pages/index/getDirectAgent/getDirectAgent.vue'

Vue.use(Router)

export default new Router({
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
      path: '/admin/index/getDirectAgent/:id',
      name: 'GetDirectAgent',
      component: GetDirectAgent
    }
  ]
})
