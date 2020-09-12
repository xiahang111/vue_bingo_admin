import {asyncRoutes, constantRoutes} from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return route.meta.role.indexOf(roles) >= 0
  } else {
    return true
  }
}

const permission = {
  state: {
    routes: constantRoutes,
    addRoutes: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {

      state.addRoutes = routers
      console.log(routers)
      state.routes = constantRoutes.concat(routers).concat({path: '*', redirect: '/404', hidden: true})

    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const roles = data;
        const accessedRouters = asyncRoutes.filter(v => {
          if (roles == 'admin') return true;
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false;
              });
              return v
            } else {
              return v
            }
          }
          return false;
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
};

export default permission;
