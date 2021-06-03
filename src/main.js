import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
Vue.config.productionTip = false
import {db} from "./firebase";
console.log(db);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
