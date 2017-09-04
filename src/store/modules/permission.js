import { routerMap } from '@/router/list'
import { deepClone } from '@/utils'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param role
 * @param route
 */
function hasPermission (role, route) {
  if (route.meta && route.meta.roles) {
    // 判断路由权限
    return route.meta.roles.indexOf(role) >= 0
  } else {
    return true
  }
}

/**
 * 递归过滤路由表，返回符合用户角色权限的路由表
 * @param routerMap
 * @param role
 */
function filterRouter (routerMap, role) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length > 0) {
        route.children = filterRouter(route.children, role)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// initial state
const state = {
  routers: filterRouter(deepClone(routerMap), 'visitor')
}

// getters
const getters = {
  permissionRouters (role) {
    return state.routers
  }
}

// actions (异步操作)
const actions = {
  generateRoutes ({ commit }, data) {
    const routers = deepClone(routerMap)

    return new Promise(resolve => {
      const { role } = data
      let accessedRouters
      if (role.indexOf('admin') >= 0) {
        accessedRouters = routers
      } else {
        accessedRouters = filterRouter(routers, role)
      }
      commit('SET_ROUTERS', accessedRouters)
      resolve()
    })
  }
}

// mutations (非异步操作)
const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.routers = deepClone(routers)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
