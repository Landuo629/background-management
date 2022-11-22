import Layout from '@/layout/index'

export default [
  {
    path: 'pageList',
    component: Layout,
    redirect: '/pageList',
    children: [
      {
        path: '/pageList',
        name: 'pageList',
        component: () => import('@/views/pageList/index'),
        meta: { title: '列表页', icon: 'el-icon-tickets' }
      }
    ]
  }
]
