import User from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'
// initial state
const state = {
  token: getToken(),
  role: 'visitor',
  username: '',
  avatar: '',
  email: '',
  introduction: ''
}

// getters
const getters = {
  role () {
    return state.role
  }
}

// actions (异步操作)
const actions = {
  async getUserInfo ({commit, state}) {
    const result = await User.getUserInfo()
    const data = result.data || {}
    commit('SET_ROLE', data.role)
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
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar || '/static/images/avatar-placeholder.jpg'
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SIGN_OUT: (state) => {
    removeToken()
    window.location.href = '/'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
