// import Layout from '@/layout'
const Layout = () => import('@/layout')
export default {
  path: '/language',
  component: Layout,
  redirect: '/language',
  name: 'language',
  children: [{
    path: '/language',
    name: 'language',
    component: () => import('@/views/language/index'),
    meta: {
      title: '切换语言',
      icon: 'orderManage',
      roles: ['superAdmin', 'admin']
    }
  }
  ]
}

