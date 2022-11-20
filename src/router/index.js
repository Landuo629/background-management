import Vue from 'vue'
import Router from 'vue-router'
import asyncRoutes from './asyncRouters'
import routes404 from './404routes'
import { routingMode } from '@/settings'

// import Layout from '@/layout/index'
const Layout = () => import('@/layout')
Vue.use(Router)

const statusRoutes = routingMode === 0 ? [...asyncRoutes, ...routes404] : []

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'homePage' }

      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  ...statusRoutes
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
