// import Layout from '@/layout'
const Layout = () => import('@/layout')
export default {
  path: '/loading',
  component: Layout,
  redirect: '/loading',
  name: 'loading',
  children: [{
    path: '/loading',
    name: 'loading',
    component: () => import('@/views/loading/index'),
    meta: {
      title: 'loading',
      icon: 'orderManage',
      roles: ['superAdmin', 'admin']
    }
  }
  ]
}
