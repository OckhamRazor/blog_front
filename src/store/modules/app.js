import store from 'storejs'

// initial state
const state = {
  sidebar: {
    opened: !+store.get('sidebarStatus')
  },
  theme: 'default',
  dialog: {
    code: 0,
    opened: false
  }
}

// getters
const getters = {
  getSideBarStatus () {
    return state.sidebar.opened
  },
  getDialogStatus () {
    return state.dialog.opened
  },
  getDialogCode () {
    return state.dialog.code
  }
}

// actions (异步操作)
const actions = {

}

// mutations (非异步操作)
const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      store.set('sidebarStatus', 1)
    } else {
      store.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
  },
  // 打开window dialog
  OPEN_DIALOG: (state, code) => {
    state.dialog.opened = true
    state.dialog.code = code
  },
  // 关闭window dialog
  CLOSE_DIALOG: (state) => {
    state.dialog.opened = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
