import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, removeToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 进度条配置

const whiteList = ['/login'] // 重定向白名单
// let mark = false // 加载动态路由标识

// 全局路由守卫前置钩子
router.beforeEach(async(to, from, next) => {
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
        // if (!mark) {
        //   await routerLoading();
        //   next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
        // } else {
        //   next();
        // }
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
      // mark = false
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

// 加载路由
async function routerLoading() {
  const accessRoutes = await store.dispatch(
    'permission/generateRoutes',
    store.getters.roles
  )
  console.log(accessRoutes)
  router.addRoutes(accessRoutes)
  router.options.routes = store.getters.permission_routes // 第三步
  mark = true
}
