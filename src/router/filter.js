import pathMatch from 'path-match'

let route = pathMatch({
  sensitive: false,
  strict: true,
  end: true
})

function genterateMatcher (list) {
  let arr = []
  for (let i = 0, len = list.length; i < len; i++) {
    let match = route(list[i])
    arr.push(match)
  }
  return arr
}

// 白名单
const whiteList = ['/login', '/home', '/more', '/more/*', '/article', '/article/list', '/article/:id', '/404', '/demo', '/demo/*'] // 不重定向白名单
const whiteListMatch = genterateMatcher(whiteList)

// 白名单匹配
export function filterByWhiteList (path) {
  let result = false
  for (var i = 0, len = whiteListMatch.length; i < len; i++) {
    let match = whiteListMatch[i]
    let params = match(path)

    if (params !== false) {
      result = true
      break
    }
  }

  return result
}
