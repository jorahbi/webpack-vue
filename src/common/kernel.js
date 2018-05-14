
import Vue from 'vue'
import ELEMENT from 'element-ui'
import api from './api'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.use(ELEMENT)
let kernel = function (options) {
  options = options || {}
  return new Vue(Object.assign({}, {
    el: '#app'
  }, options))
}

export default kernel
