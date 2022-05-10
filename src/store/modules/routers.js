const state = {
  routes: []
}

const mutations = {
  SET_ROUTES(state, routes) {
    state.routes = routes
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
