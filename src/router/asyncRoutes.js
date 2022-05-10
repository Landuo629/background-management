import Layout from '@/layout'
export default [{
  path: '/listPage',
  component: Layout,
  redirect: '/listPage',
  name: 'listPage',
  children: [{
    path: '/listPage',
    name: 'listPage',
    component: () => import('@/views/listPage/index'),
    meta: {
      title: '列表测试页',
      icon: 'orderManage',
      roles: ['superAdmin', 'admin']
    }
  },
  {
    path: '/listPageDetail',
    name: 'listPageDetail',
    component: () => import('@/views/listPage/detail'),
    meta: {
      title: '列表测试页详情页',
      icon: '',
      roles: ['superAdmin', 'admin']
    },
    hidden: true
  }
  ]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]
