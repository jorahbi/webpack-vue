import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index/Index.vue'
import Content from '../pages/content/Content.vue'
import Detail from '../pages/detail/Detail.vue'
import Login from '../pages/login/Login.vue'

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
