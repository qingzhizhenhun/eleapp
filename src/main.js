
import Vue from 'vue'
import App from './App'
import resource from 'vue-resource'
import router from './router/index'
import vueBus from 'vue-bus'
Vue.use(resource)
Vue.use(vueBus)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

