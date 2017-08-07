import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import Vuelidate from 'vuelidate'
import CxltToastr from 'cxlt-vue2-toastr'
import mavonEditor from 'mavon-editor'
import RaComponents from '@/components/public/index'
import VueWeChatTitle from 'vue-wechat-title'

// locale

// style
import 'normalize.css'
import 'vue-material/dist/vue-material.css'
import 'animate.css'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import 'mavon-editor/dist/css/index.css'
import '@/assets/styles/remLayout.scss'
import '@/assets/styles/common.scss'
// fonts
import '@/assets/js/iconfont'
// components
import App from './App.vue'
// others
import store from './store'
import router from './router'
// theme
import registerTheme from '@/assets/js/customTheme'

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(Vuelidate)
Vue.use(mavonEditor)
Vue.use(VueWeChatTitle)
Vue.use(RaComponents)

var toastrConfigs = {
  position: 'bottom right',
  successColor: '#4caf50',
  infoColor: '#00bcd4',
  warningColor: '#ff9800',
  errorColor: '#f44336'
}
Vue.use(CxltToastr, toastrConfigs)

// 注册主题
registerTheme()

Vue.config.productionTip = false

// root instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
