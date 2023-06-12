import Vue from 'vue'
import App from './App.vue'
import router from './router'
import plugin from './plugin'
import 'font-awesome/css/font-awesome.min.css'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

Vue.use(plugin)

const eventBus = {
  install(Vue) {
    Vue.prototype.$bus = new Vue()
  }
}
Vue.use(eventBus)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
