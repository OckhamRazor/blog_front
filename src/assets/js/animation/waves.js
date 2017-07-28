// 绘制波浪
var Siren = require('siren-wave')

let defaultConfig = {
  target: 'wave',
  height: 200,
  color: 'red',
  width: 600,
  waves: [
    // small
    {
      alpha: 0.15,
      yOffset: 40,
      speed: 0.02 * 0.4,
      angleStep: 0.0075,
      peak: 35,
      isPositive: true
    },
    // large
    {
      alpha: 0.15,
      yOffset: -20,
      speed: 0.05 * 0.4,
      angleStep: 0.0055,
      peak: 45,
      isPositive: true
    },
    // middle
    {
      alpha: 0.25,
      yOffset: 0,
      speed: 0.025 * 0.4,
      angleStep: 0.0055,
      peak: 30,
      isPositive: true
    }
  ]
}

export default function drawWaveCanvas (options) {
  let _options = Object.assign({}, defaultConfig, options)
  console.log('waves options', _options)
  var siren = new Siren(_options)
  siren.draw()
}
