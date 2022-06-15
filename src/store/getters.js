import { handlerRoutes } from '@/utils/handlerRoutes'
const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  permission_routes: (state) => state.permission.routes,
  addRoutes: state => handlerRoutes(state.routers.addRoutes),
  routes: state => state.routers.routes,
  buttons: state => state.buttons.buttons
}
export default getters
