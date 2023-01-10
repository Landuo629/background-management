import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
const render = ElementUI.Input.render

console.log(ElementUI, 'ElementUI')
// 初始化elemntUI的默认值
ElementUI.Input.props.clearable.default = true
ElementUI.Input.render = function() {
  // 设置组件默认原生属性（attr）
  this.$attrs.maxlength || (this.$attrs.maxlength = 200)
  return render.apply(this, arguments)
}

ElementUI.Form.props.labelWidth = {
  type: String,
  default: 'auto'
}
ElementUI.Form.props.size = {
  type: String,
  default: 'small'
}

ElementUI.Table.props.border = {
  type: Boolean,
  default: true
}
ElementUI.Table.props.size = {
  type: String,
  default: 'small'
}

ElementUI.TableColumn.props.showOverflowTooltip = {
  type: Boolean,
  default: false
}

ElementUI.Pagination.props.layout.default = 'total, sizes, prev, pager, next, jumper'
ElementUI.Pagination.props.pageSize.default = 10
ElementUI.Pagination.props.pageSizes.default = [10, 20, 50, 100]

ElementUI.Dialog.props.width.default = '500px'
ElementUI.Dialog.props.modalAppendToBody.default = false
ElementUI.Dialog.props.customClass.default = 'dialogClass'

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.component(CollapseTransition.name, CollapseTransition)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
