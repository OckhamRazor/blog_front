import http from '../config/http'

export default {
  // 获取文章
  getArticle (id, queryParams) {
    return http.get('/article/' + id, {
      params: queryParams
    })
  },

  // 获取文章列表
  getArticleList (queryParams) {
    return http.get('/article/list', {
      params: queryParams
    })
  },

  // 获取文章分类列表
  getCategoryList (queryParams) {
    return http.get('/article/category', {
      params: queryParams
    })
  },

  // 保存文章
  save (data) {
    return http.postJSON('/article/save', data)
  },

  // 编辑文章
  edit (data) {
    return http.postJSON('/article/edit', data)
  },

  // 新增文章
  add (data) {
    return http.postJSON('/article/add', data)
  },

  // 删除文章
  delete (data) {
    return http.postJSON('/article/delete', data)
  }
}
