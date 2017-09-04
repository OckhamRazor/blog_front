import http from '@/config/http'

export default {
  // 获取文章分类列表
  getCategory () {
    return http.get('/article/category')
  },

  // 获取文章分类统计列表
  getCategoryStatisticsList () {
    return http.get('/article/category/statistics')
  },

  // 获取文章列表
  getPublishedArticleList (queryParams) {
    return http.get('/article', {
      params: queryParams
    })
  },

  // 根据ID获取已发布文章
  getPublishedArticleById (id, queryParams) {
    return http.get('/article/' + id, {
      params: queryParams
    })
  },

  // 获取暂存文章列表
  getTempArticleList (queryParams) {
    return http.get('/article/temp', {
      params: queryParams
    })
  },

  // 根据ID获取暂存文章
  getTempArticleById (id, queryParams) {
    return http.get('/article/temp/' + id, {
      params: queryParams
    })
  },

  // 保存文章
  save (id, data) {
    return http.patch('/article/temp/' + id, data)
  },

  // 创建文章
  add (data) {
    return http.post('/article/temp', data)
  },

  // 发布文章
  publish (id) {
    return http.post('/article/' + id)
  },

  // 删除文章
  delete (id) {
    return http.delete('/article/' + id)
  },

  // 获取文章评论
  getCommentList (id) {
    return http.get('/article/' + id + '/comment')
  },

  // 更新文章评论
  createComment (id, data) {
    return http.post('/article/' + id + '/comment', data)
  },

  // 更新文章评论
  updateComment (articleId, commentId, data) {
    return http.patch('/article/' + articleId + '/comment' + commentId, data)
  },

  // 删除文章评论
  deleteComment (articleId, commentId) {
    return http.delete('/article/' + articleId + '/comment' + commentId)
  }
}
