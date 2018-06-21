
import Vue from 'vue'
import ELEMENT from 'element-ui'
import api from './api'
import router from '../config/routers'

Vue.config.productionTip = false
Vue.prototype.$api = api
// let router = new Router()

Vue.use(ELEMENT)

let kernel = function (options) {
  options = options || {}
  let vueOptions = Object.assign({}, {
    el: '#app',
    router
  }, options)
  return new Vue(vueOptions)
}

export default kernel
