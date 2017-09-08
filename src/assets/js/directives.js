import Vue from 'vue'

const directives = {
  focus: {
    inserted: function (el, {value}) {
      el.focus()
    }
  }
}

function registerDirectives () {
  for (let key in directives) {
    Vue.directive(key, directives[key])
  }
}

export default registerDirectives
