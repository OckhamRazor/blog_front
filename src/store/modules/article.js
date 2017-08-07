// initial state
const state = {
  // 文章列表
  queryParams: {
    code: null,
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
  getCateGoryCode () {
    return state.queryParams.code
  }
}

// actions (异步操作)
const actions = {
}

// mutations (非异步操作)
const mutations = {
  SET_QUERY_CODE: (state, code) => {
    state.queryParams.code = code
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
