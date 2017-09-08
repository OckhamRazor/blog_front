// initial state
const state = {
  sidebar: {
    opened: false
  },
  theme: 'default',
  appName: 'GC\'S World',
  loginDialog: {
    opened: false
  }
}

// getters
const getters = {
  getSideBarStatus () {
    return state.sidebar.opened
  },

  getLoginDialogStatus () {
    return state.loginDialog.opened
  }
}

// actions (异步操作)
const actions = {

}

// mutations (非异步操作)
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
  },
  // 打开登录窗口
  OPEN_LOGIN_DIALOG: state => {
    state.loginDialog.opened = true
  },
  // 关闭登录窗口
  CLOSE_LOGIN_DIALOG: state => {
    state.loginDialog.opened = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
