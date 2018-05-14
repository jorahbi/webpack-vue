import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/admin/index/index.vue'
import Content from '../pages/index/content/content.vue'
import Detail from '../pages/index/detail/detail.vue'
import Login from '../pages/admin/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
