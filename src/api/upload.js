import http from '@/config/http'
import axios from 'axios'

export default {
  // 获取上传token凭证
  getUploadToken () {
    return http.post('/upload/token')
  },
  // 上传文件
  upload (formdata) {
    return axios({
      url: 'http://up-z2.qiniu.com',
      method: 'post',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).catch((error) => {
      Promise.reject(error)
    })
  }
}
