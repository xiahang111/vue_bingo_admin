import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'dashboard', icon: 'dashboard'}
    }]
  },


  {
    path: '/tools',
    component: Layout,
    redirect: '/tools/material-calculate',
    name: 'tools',
    meta: {title: '工具', icon: 'lock'},
    children: [
      {
        path: 'production-order',
        name: '订单制作',
        component: () => import('@/views/tools/production-order/index'),
        meta: {title: '订单制作'}
      },
      {
        path: 'laminate-order',
        name: '层板单制作',
        component: () => import('@/views/tools/laminate-order/index'),
        meta: {title: '层板单制作'}
      },
      {
        path: 'glass-calculate',
        name: '玻璃计算',
        component: () => import('@/views/tools/glass-calculate/index'),
        meta: {title: '玻璃计算'}
      },
      {
        path: 'glass-excel',
        name: '玻璃历史记录',
        component: () => import('@/views/tools/glass-calculate/complex-table'),
        meta: {title: '玻璃计算历史'}
      },
      {
        hidden: true,
        path: 'material-calculate',
        name: '下料计算',
        component: () => import('@/views/tools/material-calculate/index'),
        meta: {title: '型材计算'}
      },
      {
        hidden: true,
        path: 'material-excel',
        name: '型材计算历史',
        component: () => import('@/views/tools/material-calculate/material-record'),
        meta: {title: '型材计算历史'}
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/glass-history',
    name: 'Example',
    meta: {title: '生产管理', icon: 'monitor'},
    children: [
      {
        path: 'glass-history',
        name: '玻璃历史详情',
        component: () => import('@/views/product/glass/glass-history'),
        meta: {title: '玻璃历史详情'}
      }
    ]
  },
  // 404 page must be placed at the end !!!
  //{path: '*', redirect: '/404', hidden: true}
]

export const asyncRoutes = [

  {
    path: '/sale',
    component: Layout,
    redirect: '/tools/material-calculate',
    name: 'sale',
    meta: {title: '销售管理', icon: 'money', role: ['admin','clerk']},
    children: [
      {
        path: 'order',
        name: '销售订单',
        component: () => import('@/views/sale/sale-order'),
        meta: {title: '销售订单', role: ['admin','clerk']}
      },
      {
        path: 'order-return',
        name: '销售退货',
        component: () => import('@/views/sale/sale-return'),
        meta: {title: '销售退货', role: ['admin','clerk']}
      }
    ]
  },{
    path: '/store',
    component: Layout,
    redirect: '/store/store-all',
    name: 'store',
    meta: {title: '仓库管理', icon: 'education', role: ['admin','store']},
    children: [

      {
        path: 'store-all',
        name: '库存详情',
        component: () => import('@/views/store/store-all'),
        meta: {title: '库存详情', role: ['admin','store']}
      },
      {
        path: 'store-out',
        name: '出库管理',
        component: () => import('@/views/store/store-out'),
        meta: {title: '出库管理', role: ['admin','store']}
      },
      {
        path: 'store-in',
        name: '入库管理',
        component: () => import('@/views/store/store-in'),
        meta: {title: '入库管理', role: ['admin','store']}
      },

      {
        path: 'store-original',
        name: '坯料详情',
        component: () => import('@/views/store/store-original'),
        meta: {title: '坯料详情', role: ['admin','store']}
      },
      {
        path: 'store-original-in',
        name: '坯料入库',
        component: () => import('@/views/store/store-original-in'),
        meta: {title: '坯料入库', role: ['admin','store']}
      },
      {
        path: 'store-original-out',
        name: '坯料出库',
        component: () => import('@/views/store/store-original-out'),
        meta: {title: '坯料出库', role: ['admin','store']}
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    redirect: '/person/person-all',
    name: 'person',
    meta: {title: '资源信息', icon: 'skill', role: ['admin','clerk']},
    children: [
      {
        path: 'person-all',
        name: '客户信息',
        component: () => import('@/views/person/person-all'),
        meta: {title: '客户信息', role: ['admin','clerk']}
      },
      {
        path: 'person-info',
        name: '上游厂家信息',
        component: () => import('@/views/person/person-info'),
        meta: {title: '上游厂家信息', role: ['admin','clerk']}
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/person/user-all',
    name: 'person',
    meta: {title: '用户管理', icon: 'user1', role: ['admin']},
    children: [
      {
        path: 'user-all',
        name: '系统用户管理',
        component: () => import('@/views/user/user-all'),
        meta: {title: '系统用户管理', role: ['admin']}
      },
      {
        path: 'role-all',
        name: '权限信息',
        component: () => import('@/views/user/role-all'),
        meta: {title: '权限信息', role: ['admin']}
      }
    ]
  }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
