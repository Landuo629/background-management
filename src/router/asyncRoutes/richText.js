// import Layout from '@/layout'
const Layout = () => import('@/layout')
export default {
  path: '/richText',
  component: Layout,
  redirect: '/richText',
  name: 'richText',
  children: [{
    path: '/richText',
    name: 'richText',
    component: () => import('@/views/richText/index'),
    meta: {
      title: '富文本',
      icon: 'orderManage',
      roles: ['superAdmin', 'admin']
    }
  }
  ]
}

