import store from 'storejs'

// initial state
const state = {
  sidebar: {
    opened: !+store.get('sidebarStatus')
  },
  theme: 'default'
}

// getters
const getters = {
  getSideBarStatus () {
    return state.sidebar.opened
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
