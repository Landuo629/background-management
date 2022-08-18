// import Layout from '@/layout'
const Layout = () => import('@/layout')
export default {
  path: '/jsx',
  component: Layout,
  redirect: '/jsx',
  name: 'jsx',
  children: [{
    path: '/jsx',
    name: 'jsx',
    component: () => import('@/views/jsx/index'),
    meta: {
      title: 'jsx',
      icon: 'orderManage',
      roles: ['superAdmin', 'admin']
    }
  }
  ]
}

