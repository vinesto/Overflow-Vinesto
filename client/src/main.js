import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from "vue-wysiwyg"

Vue.config.productionTip = false
Vue.use(wysiwyg,{
  hideModules: { "bold": true },
  forcePlainTextOnPaste:true,
  maxHeight: "500px"
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
