import { constantRoutes } from '@/router'
import routes404 from '@/router/404routes'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES(state, routes) {
    state.addRoutes = routes
    state.routes = [...constantRoutes, ...routes, ...routes404]
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
