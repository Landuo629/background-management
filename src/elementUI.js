import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

console.log(ElementUI, 'ElementUI.Input.props')
// 初始化elemntUI的默认值
ElementUI.Input.props.clearable.default = true

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.component(CollapseTransition.name, CollapseTransition)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
