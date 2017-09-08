import Vue from 'vue'

export default function registerTheme () {
  Vue.material.registerTheme({
    daliy: {
      primary: 'teal',
      accent: {
        color: 'deep-orange',
        hue: 'A200'
      },
      warn: 'deep-orange',
      background: 'white'
    },
    eyeProtect: {
      primary: {
        color: 'grey',
        hue: 800
      },
      accent: {
        color: 'blue-grey',
        hue: 900
      },
      warn: 'deep-orange',
      background: 'white'
    }
  })
}
