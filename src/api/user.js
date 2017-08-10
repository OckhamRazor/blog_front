import http from '../config/http'

export default {
  // 根据token获取用户信息
  getUserInfo (queryParams) {
    return http.get('/user', {
      params: queryParams
    })
  }
}
