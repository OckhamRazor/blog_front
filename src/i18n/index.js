import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'en': require('./locale/en.json'),
    'zh': require('./locale/zh.json')
  },
  fallbackLocale: 'zh'
})

if (module.hot) {
  module.hot.accept(['./locale/en.json', './locale/zh.json'], () => {
    i18n.setLocaleMessage('en', require('./locale/en.json'))
    i18n.setLocaleMessage('ja', require('./locale/zh.json'))
    console.log('hot reload', this, arguments)
  })
}

export default i18n
