import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang'

import '@/icons' // icon

import '@/permission' // 全局路由守卫
import permission from '@/directive/permission/index.js' // 权限判断指令
Vue.directive('permission', permission)

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

if (process.env.NODE_ENV === 'production') {
  // mock 环境
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示

new Vue({
  el: '#app',
  i18n, // 注入国际化
  router,
  store,
  render: (h) => h(App)
})
