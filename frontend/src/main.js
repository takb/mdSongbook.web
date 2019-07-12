import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import MarkFlat from 'markflat.vue'
Vue.use(MarkFlat, {mbAddStyle: true, mbEnableZoom: true})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
