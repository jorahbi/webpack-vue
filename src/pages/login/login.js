// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Index from './Login.vue'

Vue.config.productionTip = false
Vue.prototype.$axios = null

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Index)
})
