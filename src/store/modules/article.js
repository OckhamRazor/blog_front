// initial state
const state = {
  // 文章列表
  queryParams: {
    category: 'all',
    keywords: null
  }
}

// getters
const getters = {
  getQueryParams () {
    return state.queryParams
  },
  getQueryParamsKeywords () {
    return state.queryParams.keywords
  },
  getCategory () {
    return state.queryParams.category
  }
}

// actions (异步操作)
const actions = {
}

// mutations (非异步操作)
const mutations = {
  SET_QUERY_CATEGORY: (state, category) => {
    state.queryParams.category = category
  },
  SET_QUERY_KEYWORDS: (state, keywords) => {
    state.queryParams.keywords = keywords
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
