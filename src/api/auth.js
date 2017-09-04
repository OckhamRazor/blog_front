import http from '../config/http'

export default {

  // 登录
  signIn (queryParams) {
    return http.post('/auth', queryParams)
  },

  // Github OAuth登录
  signInByGithub (data) {
    return http.post('/auth/github', data)
  }
}
