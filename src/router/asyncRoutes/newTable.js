// import Layout from '@/layout'
const Layout = () => import('@/layout')
export default {
  path: '/newTable',
  component: Layout,
  redirect: '/newTable',
  name: 'newTable',
  children: [{
    path: '/newTable',
    name: 'newTable',
    component: () => import('@/views/newTable/index'),
    meta: {
      title: '新型表格',
      icon: 'orderManage',
      roles: ['superAdmin', 'admin']
    }
  }
  ]
}
