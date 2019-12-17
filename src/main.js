import Vue from 'vue'
import App from "./App.vue"
import "@/styles/reset.css"
import router from "@/router/router.js"
// vant 组件
import {
  Toast
} from 'vant';
import {
  Icon
} from 'vant';
import {
  Uploader
} from 'vant';
import {
  Picker
} from 'vant';

// 调用vant 弹窗 import { Dialog } from 'vant';
import {
  Dialog
} from 'vant';
// vant 输入框
import {
  Field
} from 'vant';

import {
  Notify
} from 'vant'
import {
  Tab,
  Tabs
} from 'vant';
import {
  PullRefresh
} from 'vant'
import {
  List
} from 'vant';



Vue.use(Toast)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Notify)
Vue.use(Tab).use(Tabs)
Vue.use(PullRefresh)
Vue.use(List)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')