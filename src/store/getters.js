const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  menu: state => state.user.menu,
  addRouters: state => state.permission.addRoutes,
  name: state => state.user.name,
  realName: state => state.user.realName,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes


}
export default getters
