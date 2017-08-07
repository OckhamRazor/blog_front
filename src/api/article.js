import http from '../config/http'

export default {

  // 获取文章列表
  getArticleList (queryParams) {
    return http.get('/article', {
      params: queryParams
    })
  },

  // 获取文章分类列表
  getCategoryList (queryParams) {
    return http.get('/article/category', {
      params: queryParams
    })
  },

  // 获取文章
  getArticle (id, queryParams) {
    return http.get('/article/' + id, {
      params: queryParams
    })
  },

  // 保存文章
  save (id, data) {
    return http.put('/article/' + id + '/history', data)
  },

  // 编辑文章
  edit (id, data) {
    return http.patch('/article/' + id, data)
  },

  // 新增文章
  add (data) {
    return http.postJSON('/article', data)
  },

  // 删除文章
  delete (id) {
    return http.postJSON('/article' + id)
  },

  // 上传文件
  upload (file) {
    return http.post('/article/file', file)
  }
}
