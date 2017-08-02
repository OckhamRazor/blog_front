// initial state
const state = {
  currentCategory: {
    code: 12,
    name: '新技术',
    total: 8
  }
}

// getters
const getters = {
  getCateGoryCode () {
    return state.currentCategory.code
  }
}

// actions (异步操作)
const actions = {
}

// mutations (非异步操作)
const mutations = {
  SET_CATEGORY: (state, gateGory) => {
    state.currentCategory = gateGory
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
