import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueShowdown from 'vue-showdown'
import './showdown.ext-sbmd'

Vue.use(VueShowdown, {
  options: {
    emoji: false,
  },
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
