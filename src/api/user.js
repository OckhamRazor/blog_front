import http from '../config/http'

export default {

  // 登录
  signIn (queryParams) {
    return http.postJSON('/auth/token', queryParams)
  },

  // 根据token获取用户信息
  getUserInfo (queryParams) {
    return http.get('/user', {
      params: queryParams
    })
  }
}
