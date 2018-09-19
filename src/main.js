import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

Vue.use(require('vue-moment'));

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
