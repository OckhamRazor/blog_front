import store from '@/store'
import router from './list'

// 登录拦截器
router.beforeEach(async (to, from, next) => {
  if (store.state.user.token) {
    // 如果角色仍然为游客，则更新拉取用户信息
    if (store.getters.role === 'visitor') {
      const data = await store.dispatch('getUserInfo')
      const role = data.role
      await store.dispatch('generateRoutes', { role })
    }
  }

  if (to.meta.requireAuth) {
    // 判断当前用户是否具有权限
    if (to.meta.roles.indexOf(store.getters.role) !== -1) {
      next()
    } else {
      // 判断是否登录
      if (store.getters.role === 'visitor') {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      } else {
        next({path: '/401'})
      }
    }
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  // LoadingBar.finish()
})

export default router
