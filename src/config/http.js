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
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
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
const get = (url, data) => {
  return instance
    .get(url, data)
    .catch(handleError)
}

const post = (url, data) => {
  return instance
    .post(url, data)
    .catch(handleError)
}

const postJSON = (url, data) => {
  data = Qs.stringify(data)
  return instance
    .post(url, data)
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
  postJSON: postJSON,
  post: post,
  get: get
}
