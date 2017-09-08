import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import Vuelidate from 'vuelidate'
import mavonEditor from 'mavon-editor'
import VueWeChatTitle from 'vue-wechat-title'

// locale

// style
import 'normalize.css'
import 'vue-material/dist/vue-material.css'
import 'animate.css'
import 'mavon-editor/dist/css/index.css'
import '@/assets/styles/common.scss'
// fonts
import '@/assets/js/iconfont'
// components
import App from '@/App.vue'
// others
import store from '@/store'
import router from '@/router'
import i18n from '@/i18n'
// theme
import registerTheme from '@/assets/js/theme'
// directives
import registerDirectives from '@/assets/js/directives'
// global components
import customComponents from '@/components'

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(Vuelidate)
Vue.use(mavonEditor)
Vue.use(VueWeChatTitle)
Vue.use(customComponents)

// 注册主题
registerTheme()
// 注册全局指令
registerDirectives()

Vue.config.productionTip = false

// root instance
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

Vue.material.setCurrentTheme('daliy')
