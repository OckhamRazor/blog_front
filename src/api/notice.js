import http from '../config/http'

export default {

  // 获取公告信息
  getInfo (queryParams) {
    return http.get('/notice/info', {
      params: queryParams
    })
  },

  // 编辑公告信息
  edit (data) {
    return http.postJSON('/notice/edit', data)
  }
}
