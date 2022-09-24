// import Layout from '@/layout'
const Layout = () => import('@/layout')
export default {
  path: '/newList',
  component: Layout,
  redirect: '/newList',
  name: 'newList',
  children: [{
    path: '/newList',
    name: 'newList',
    component: () => import('@/views/newList/index'),
    meta: {
      title: '新型列表',
      icon: 'orderManage',
      roles: ['superAdmin', 'admin']
    }
  },
  {
    path: '/newListDetail',
    name: 'newListDetail',
    component: () => import('@/views/newList/detail'),
    meta: {
      title: '列表详情页',
      icon: '',
      roles: ['superAdmin', 'admin']
    },
    hidden: true
  }
  ]
}
