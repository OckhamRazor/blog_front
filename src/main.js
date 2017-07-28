import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import Vuelidate from 'vuelidate'
import CxltToastr from 'cxlt-vue2-toastr'
// locale

// style
import 'normalize.css'
import 'vue-material/dist/vue-material.css'
import 'animate.css'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import '@/assets/styles/common.scss'
import '@/assets/styles/remLayout.scss'
// fonts
import '@/assets/js/iconfont'
// components
import App from './App.vue'
import IconSvg from '@/components/IconSvg'
// others
import store from './store'
import router from './router'
// theme
import registerTheme from '@/assets/js/customTheme'

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(Vuelidate)

var toastrConfigs = {
  position: 'bottom right',
  successColor: '#4caf50',
  infoColor: '#00bcd4',
  warningColor: '#ff9800',
  errorColor: '#f44336'
}
Vue.use(CxltToastr, toastrConfigs)

// 自定义组件注册
Vue.component('iconSvg', IconSvg)
// 注册主题
registerTheme()

Vue.config.productionTip = false

// root instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
