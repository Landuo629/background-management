import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, removeToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import { routingMode } from '@/settings'

NProgress.configure({ showSpinner: false }) // 进度条配置

const whiteList = ['/login'] // 重定向白名单
let routingMark = false // 加载动态路由标识

// 全局路由守卫前置钩子
router.beforeEach(async(to, from, next) => {
  console.log(store.getters.routes, 'store.getters.routers')
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  const hasGetUserInfo = store.getters.name
  if (hasToken && hasGetUserInfo) {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      try {
        if (!routingMark && routingMode === 1) {
          await routerLoading1()
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        }
        if (!routingMark && routingMode === 2) {
          await routerLoading2()
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        }
        next()
      } catch (error) {
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        removeToken()
        NProgress.done()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      // routingMark = false
      next()
    } else {
      Message.error('登陆失效，请重新登录！')
      removeToken()
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 全局路由守卫后置钩子
router.afterEach(() => {
  NProgress.done()
})

// 加载路由方式1
async function routerLoading1() {
  const accessRoutes = await store.dispatch(
    'permission/generateRoutes',
    store.getters.roles
  )
  router.addRoutes(accessRoutes)
  router.options.routes = store.getters.permission_routes
  routingMark = true
}

// 加载路由方式2
async function routerLoading2() {
  const { addRoutes, routes } = store.getters
  router.addRoutes(addRoutes)
  router.options.routes = routes
  routingMark = true
}
