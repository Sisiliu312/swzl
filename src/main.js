import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false


Vue.use(VueAxios, axios)
Vue.use(ElementUI)


Vue.directive('title',  function (el, binding) {
  document.title = el.dataset.title
})



import {formatTime} from "./utils/time";
import {formatDay} from './utils/day';
Vue.filter('format', formatTime)
Vue.filter('formatDay', formatDay)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
