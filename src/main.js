import Vue from 'vue'
import App from "./App.vue"
import "@/styles/reset.css"
import router from "@/router/router.js"
// vant 组件
import {
  Toast
} from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')