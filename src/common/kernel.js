
import Vue from 'vue'
import ELEMENT from 'element-ui'
import api from './api'
import Router from 'vue-router'

Vue.config.productionTip = false
Vue.prototype.$api = api
let router = new Router()

Vue.use(ELEMENT)

let kernel = function (options) {
  options = options || {}
  return new Vue(Object.assign({}, {
    el: '#app',
    router
  }, options))
}

export default kernel
