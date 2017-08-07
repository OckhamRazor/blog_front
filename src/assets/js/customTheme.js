import Vue from 'vue'

export default function registerTheme () {
  Vue.material.registerTheme({
    custom: {
      primary: {
        color: 'grey',
        hue: 100
      }
    },
    about: {
      primary: 'indigo'
    },
    contact: {
      primary: 'teal'
    },
    orange: {
      primary: {
        color: 'orange',
        hue: 500
      }
    }
  })
}
