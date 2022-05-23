// import Layout from '@/layout'
const Layout = () => import('@/layout')
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
      title: '列表',
      icon: 'orderManage',
      roles: ['superAdmin', 'admin']
    }
  },
  {
    path: '/listPageDetail',
    name: 'listPageDetail',
    component: () => import('@/views/listPage/detail'),
    meta: {
      title: '列表详情页',
      icon: '',
      roles: ['superAdmin', 'admin']
    },
    hidden: true
  }
  ]
},
{
  path: '/uploadPage',
  component: Layout,
  redirect: '/uploadPage',
  name: 'uploadPage',
  children: [{
    path: '/uploadPage',
    name: 'uploadPage',
    component: () => import('@/views/uploadPage/index'),
    meta: {
      title: '上传',
      icon: 'el-icon-upload2',
      roles: ['superAdmin', 'admin']
    }
  }
  ]
},
{
  path: '/language',
  component: Layout,
  redirect: '/language',
  name: 'language',
  children: [{
    path: '/language',
    name: 'language',
    component: () => import('@/views/language/index'),
    meta: {
      title: '国际化',
      icon: 'el-icon-eleme',
      roles: ['superAdmin', 'admin']
    }
  }
  ]
},
{
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
      icon: 'el-icon-rank',
      roles: ['superAdmin', 'admin']
    }
  }
  ]
}
]
