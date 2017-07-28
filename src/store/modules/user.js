import User from '@/api/user'
import { getToken } from '@/utils/auth'
// initial state
const state = {
  token: getToken(),
  roles: [],
  username: '',
  avatar: '',
  introduction: ''
}

// getters
const getters = {
  roles () {
    return state.roles
  }
}

// actions (异步操作)
const actions = {
  async getUserInfo ({commit, state}) {
    const result = await User.getUserInfo({token: state.token})
    const data = result.data || {}
    commit('SET_ROLES', data.roles)
    commit('SET_NAME', data.username)
    commit('SET_AVATAR', data.avatar)
    commit('SET_INTRODUCTION', data.introduction)

    return data
  }
}

// mutations (非异步操作)
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
