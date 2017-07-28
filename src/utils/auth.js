import store from 'storejs'

const TokenKey = 'Admin-Token'

export function getToken () {
  return store.get(TokenKey)
}

export function setToken (token) {
  return store.set(TokenKey, token)
}

export function removeToken () {
  return store.remove(TokenKey)
}
