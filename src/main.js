import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import App from './App.vue'
import { store } from './store/store'

Vue.use(Vue2TouchEvents)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
