// import Layout from '@/layout'
const Layout = () => import('@/layout')
export function handlerRoutes(routes) {
  // return routes.map(item => {
  //   item.component = Layout
  //   if (item.children) {
  //     item.children.forEach(_item => {
  //       _item.component = _import(_item.component)
  //       _item.children = []
  //       return _item
  //     })
  //   }
  //   return item
  // })
  return routes.map(item => ({
    ...item,
    component: Layout,
    children: item.children.map((_item) => ({
      ..._item,
      component: _import(_item.component)
    }))
  }))
}

function _import(component) {
  return resolve => require([`@/views${component}`], resolve)
}
