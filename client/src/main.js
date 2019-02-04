import Vue from 'vue'
import App from './App.vue'
import 'vue-loaders/dist/vue-loaders.css'
import * as VueLoaders from 'vue-loaders'

Vue.use(VueLoaders)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
