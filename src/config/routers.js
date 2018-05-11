import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index/index.vue'
import Content from '../pages/content/content.vue'
import Detail from '../pages/detail/detail.vue'
import Login from '../pages/login/login.vue'

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
