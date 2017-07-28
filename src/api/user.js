import http from '../config/http'

export default {
  // 登录
  signIn (queryParams) {
    return http.postJSON('/user/signIn', queryParams)
  },
  // 根据token获取用户信息
  getUserInfo (queryParams) {
    return http.get('/user/info', {
      params: queryParams
    })
  }
}
