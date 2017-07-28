import store from '@/store'
import router from './list'
import { filterByWhiteList } from './filter'

// 登录拦截器
router.beforeEach(async (to, from, next) => {
  if (store.state.user.token) {  // 通过vuex state获取当前的token是否存在
    // 判断当前用户是否拉取user info
    if (store.getters.roles.length === 0) {
      const data = await store.dispatch('getUserInfo')
      const roles = data.roles
      await store.dispatch('GenerateRoutes', { roles })
      router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      next({ ...to }) // hack方法 确保addRoutes已完成
    } else {
      next()
    }
  } else {
    if (filterByWhiteList(to.path)) { // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: '/404'
      })
    }
  }
})

router.afterEach((to, from, next) => {
  // LoadingBar.finish()
})

export default router
