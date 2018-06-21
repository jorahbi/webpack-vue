// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './config/routers'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import camelCase from 'lodash/camelCase'
// import upperFirst from 'lodash/upperFirst'
import Footer from './components/footer.vue'
import Header from './components/header.vue'
import Menus from './components/menus.vue'

Vue.use(ElementUI)
Vue.component('Footer', Footer)
Vue.component('Header', Header)
Vue.component('Menus', Menus)

Vue.config.productionTip = false

/* eslint-disable no-new */

/* const requireComponent = require.context('./components', false, /[A-Za-z]\w+\.(vue|js)$/)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 取得组件的 Pascal 式命名
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')))
  // 以全局方式注册组件
  Vue.component(componentName, componentConfig.default || componentConfig)
}) */

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
