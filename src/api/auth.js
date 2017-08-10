import http from '../config/http'

export default {

  // 登录
  signIn (queryParams) {
    return http.postJSON('/auth', queryParams)
  }
}
