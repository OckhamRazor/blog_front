import svgIcon from '@/components/svgIcon'

const components = {
  svgIcon
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
