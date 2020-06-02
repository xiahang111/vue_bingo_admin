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
      meta: { title: 'dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    hidden: true,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/sale',
    component: Layout,
    redirect: '/tools/material-calculate',
    name: 'Example',
    meta: { title: '销售管理', icon: 'money' },
    children: [
      {
        path: 'order',
        name: '销售订单',
        component: () => import('@/views/sale/sale-order'),
        meta: { title: '销售订单' }
      },
      {
        path: 'order',
        name: '销售退货',
        component: () => import('@/views/sale/sale-return'),
        meta: { title: '销售退货' }
      }
    ]
  },
  {
    path: '/tools',
    component: Layout,
    redirect: '/tools/material-calculate',
    name: 'Example',
    meta: { title: '工具', icon: 'lock' },
    children: [
      {
        path: 'production-order',
        name: '订单制作',
        component: () => import('@/views/tools/production-order/index'),
        meta: { title: '订单制作' }
      },
      {
        path: 'glass-calculate',
        name: '玻璃计算',
        component: () => import('@/views/tools/glass-calculate/index'),
        meta: { title: '玻璃计算' }
      },
      {
        path: 'glass-excel',
        name: '玻璃历史记录',
        component: () => import('@/views/tools/glass-calculate/complex-table'),
        meta: { title: '玻璃计算历史' }
      },
      {
        hidden: true,
        path: 'material-calculate',
        name: '下料计算',
        component: () => import('@/views/tools/material-calculate/index'),
        meta: { title: '型材计算' }
      },
      {
        hidden: true,
        path: 'material-excel',
        name: '型材计算历史',
        component: () => import('@/views/tools/material-calculate/material-record'),
        meta: { title: '型材计算历史' }
      }
    ]
  },


  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    hidden: true,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [

  {
    path: '/sale',
    component: Layout,
    redirect: '/tools/material-calculate',
    name: 'Example',
    meta: { title: '销售管理', icon: 'money',roles: ['admin','root'] },
    children: [
      {
        path: 'order',
        name: '销售订单',
        component: () => import('@/views/sale/sale-order'),
        meta: { title: '销售订单' }
      },
      {
        path: 'order',
        name: '销售退货',
        component: () => import('@/views/sale/sale-return'),
        meta: { title: '销售退货' }
      }
    ]
  }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
