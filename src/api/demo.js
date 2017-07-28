import http from '../config/http'

export default {
  // demo
  getDemoOption (queryParams) {
    return http.get('/demo/list', {
      params: queryParams
    })
  }
}
