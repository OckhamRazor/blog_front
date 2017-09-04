import WebStorageCache from 'web-storage-cache'

let wsCache = new WebStorageCache()

const TokenKey = 'token'

export function getToken () {
  return wsCache.get(TokenKey)
}

export function setToken (token, exp) {
  return wsCache.set(TokenKey, token, {exp: exp})
}

export function removeToken () {
  return wsCache.delete(TokenKey)
}
