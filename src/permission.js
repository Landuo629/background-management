import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, removeToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
let mark = false // 加载动态路由标识

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // const hasGetUserInfo = store.getters.name;

      // if (hasGetUserInfo) {
      //   next();
      // } else {
      try {
        // if (!mark) {
        //   await routerLoading();
        //   next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
        // } else {
        //   next();
        // }
        next()
      } catch (error) {
        // remove token and go to login page to re-login
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        removeToken()
        NProgress.done()
        // }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      mark = false
      next()
    } else {
      Message.error('登陆失效，请重新登录！')
      removeToken()
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
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
