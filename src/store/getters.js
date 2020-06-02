const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  menu: state => state.user.menu,
  name: state => state.user.name,
  addRouters: state => state.permission.addRouters
}
export default getters
