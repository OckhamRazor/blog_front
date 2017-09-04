import http from '../config/http'

export default {
  // 获取用户信息
  getUserInfo (queryParams) {
    return http.get('/user', {
      params: queryParams
    })
  },

  // 编辑用户信息
  editUserInfo (queryParams) {
    return http.put('/user', queryParams)
  }
}
