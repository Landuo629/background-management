// import Layout from '@/layout'
const Layout = () => import('@/layout')
export default {
  path: '/drag',
  component: Layout,
  redirect: '/drag',
  name: 'drag',
  children: [{
    path: '/drag',
    name: 'drag',
    component: () => import('@/views/drag/index'),
    meta: {
      title: '拖拽',
      icon: 'orderManage',
      roles: ['superAdmin', 'admin']
    }
  }
  ]
}

