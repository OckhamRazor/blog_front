import raIconSvg from './iconSvg'
import raProgressLoader from './progressLoader'
import raScrollToTop from './scrollToTop'
import raSlideUpDown from './slideUpDown'

const components = {
  raIconSvg,
  raProgressLoader,
  raScrollToTop,
  raSlideUpDown
}

const install = function (Vue = {}) {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};

export default install
