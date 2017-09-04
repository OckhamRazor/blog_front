const escapeGoat = require('escape-goat')

/**
 * 深拷贝对象
 * @param {obejct} source
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/**
 * 处理特殊字符
 * @param {string} str 原始数据
 */
export function escape (str) {
  if (typeof str === 'undefined' || str === '') return ''

  let newString = escapeGoat.escape(str)
  // newString = newString.replace(/\n/g, '\\n').replace(/\r/g, '\\r') // 替换换行符

  return newString
}

/**
 * 解析特殊字符
 * @param {string} str 原始数据
 */
export function unescape (str) {
  if (typeof str === 'undefined' || str === '') return ''

  return escapeGoat.unescape(str)
}

