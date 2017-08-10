import axios from 'axios'
import store from '@/store'
import Qs from 'qs'
import router from '@/router'
// import { getToken } from '@/utils/auth'

const instance = axios.create({
  baseURL: '/api',
  timeout: 20000,
  headers: {
    'Accept': 'application/json'
  }
})

// http request 拦截器
instance.interceptors.request.use(
  config => {
    if (store.state.user.token) {
      config.headers.Authorization = `token ${store.state.user.token}`
    }
    // else {
    //   const token = getToken()
    //   if (token) {
    //     config.headers.Authorization = 'token ' + token
    //   }
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
instance.interceptors.response.use(
  response => {
    handleData(response.data)
    return response.data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          // store.commit('SIGN_OUT')
          store.commit('OPEN_DIALOG', 0)
          break
        case 404:
          // 跳转到404页面
          router.replace({
            path: '404',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
        case 500:
          // 跳转到500页面
          router.replace({
            path: '500',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
        default:
          break
      }
    }
    return Promise.reject(error.response.data)
  })

// 二次封装方法
// GET 获取信息
const getRequest = (url, data) => {
  return instance
    .get(url, data)
    .catch(handleError)
}
// POST 创建一个新资源
const postRequest = (url, data) => {
  return instance
    .post(url, data)
    .catch(handleError)
}
// POST 创建一个新资源
const postJSONRequest = (url, data) => {
  data = Qs.stringify(data)
  return instance
    .post(url, data)
    .catch(handleError)
}
// PATCH 更新指定信息
const patchRequest = (url, data) => {
  return instance
    .patch(url, data)
    .catch(handleError)
}
// PUT 提供所有信息
const putRequest = (url, data) => {
  return instance
    .put(url, data)
    .catch(handleError)
}
// DELETE 删除资源
const deleteRequest = (url, data) => {
  return instance
    .delete(url, data)
    .catch(handleError)
}

// 捕获请求错误
function handleError (error) {
  Promise.reject(error)
}

// 处理数据
function handleData (data) {
  // code处理
}

export default {
  postJSON: postJSONRequest,
  post: postRequest,
  get: getRequest,
  patch: patchRequest,
  put: putRequest,
  delete: deleteRequest
}
