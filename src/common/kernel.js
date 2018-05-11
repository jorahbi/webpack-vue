
import Vue from 'vue'
import ELEMENT from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ELEMENT)
Vue.config.productionTip = false
Vue.prototype.$http = null

let kernel = function (options) {
  options = options || {}
  return new Vue(Object.assign({}, {
    el: '#app'
  }, options))
}

export default kernel
