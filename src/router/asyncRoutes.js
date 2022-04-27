import Layout from '@/layout'
export default [
  {
    path: '/userInfor',
    component: Layout,
    name: 'userInfor',
    children: [{
      path: '/userInformation',
      name: 'userInformation',
      component: () => import('@/views/userInformation/index'),
      meta: {
        title: '用户信息',
        icon: 'user',
        roles: ['superAdmin', 'admin']
      }
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      component: () => import('@/views/userInformation/detail'),
      meta: {
        title: '编辑用户',
        icon: '',
        roles: ['superAdmin', 'admin']
      },
      hidden: true
    }
    ]
  },
  {
    path: '/operationManage',
    component: Layout,
    name: 'operationManage',
    meta: {
      title: '运营管理',
      icon: 'operationManage'
    },
    children: [{
      path: '/bannerManagement',
      name: 'bannerManagement',
      component: () =>
        import('@/views/operationManagement/bannerManagement/index'),
      meta: {
        title: 'banner管理',
        icon: '',
        roles: ['superAdmin']
      }
    },
    {
      path: '/courseManagement',
      name: 'courseManagement',
      component: () =>
        import('@/views/operationManagement/courseManagement/index'),
      meta: {
        title: '课程管理',
        icon: '',
        roles: ['superAdmin', 'admin']
      }
    },
    {
      path: '/courseManagementDetails',
      name: 'courseManagementDetails',
      hidden: true,
      component: () =>
        import('@/views/operationManagement/courseManagement/details'),
      meta: {
        title: '课程详情',
        icon: '',
        roles: ['superAdmin', 'admin']
      }
    },
    {
      path: '/courseManagementAdd',
      name: 'courseManagementAdd',
      hidden: true,
      component: () =>
        import('@/views/operationManagement/courseManagement/add'),
      meta: {
        title: '发布课程',
        roles: ['superAdmin', 'admin']
      }
    },
    {
      path: '/checkInList',
      name: 'checkInList',
      hidden: true,
      component: () =>
        import('@/views/operationManagement/courseManagement/checkInList'),
      meta: {
        title: '签到名单',
        roles: ['superAdmin', 'admin']
      }
    }
    ]
  },
  {
    path: '/questionnaireManage',
    component: Layout,
    name: 'questionnaireManage',
    children: [{
      path: '/questionnaireManagement',
      name: 'questionnaireManagement',
      component: () => import('@/views/questionnaireManagement/index'),
      meta: {
        title: '问卷管理',
        icon: 'questionnaireM',
        roles: ['superAdmin', 'admin']
      }
    }]
  },
  {
    path: '/questionnaireTempl',
    component: Layout,
    name: 'questionnaireTempl',
    meta: {
      title: '问卷模版',
      icon: 'questionnaireT',
      roles: ['superAdmin']
    },
    children: [{
      path: '/questionTemplate',
      name: 'questionTemplate',
      component: () =>
        import('@/views/questionnaireTemplate/questionTemplate/index'),
      meta: {
        title: '提问模版',
        icon: ''
      }
    },
    {
      path: '/evaluationTemplate',
      name: 'evaluationTemplate',
      component: () =>
        import('@/views/questionnaireTemplate/evaluationTemplate/index'),
      meta: {
        title: '评价模版',
        icon: ''
      }
    }
    ]
  },
  {
    path: '/appraiseManage',
    component: Layout,
    name: 'appraiseManage',
    children: [{
      path: '/appraiseManagement',
      name: 'appraiseManagement',
      component: () => import('@/views/appraiseManagement/index'),
      meta: {
        title: '评价管理',
        icon: 'evaluationM',
        roles: ['superAdmin', 'admin']
      }
    }]
  },
  {
    path: '/customerServiceManage',
    component: Layout,
    name: 'customerServiceManage',
    children: [{
      path: '/customerServiceManagement',
      name: 'customerServiceManagement',
      component: () => import('@/views/customerServiceManagement/index'),
      meta: {
        title: '客服管理',
        icon: 'customerServiceM',
        roles: ['superAdmin']
      }
    }]
  },
  {
    path: '/systemManage',
    component: Layout,
    name: 'systemManage',
    meta: {
      title: '系统管理',
      icon: 'dashboard',
      roles: ['superAdmin']
    },
    children: [{
      path: '/accountManagement',
      name: 'accountManagement',
      component: () =>
        import('@/views/systemManagement/accountManagement/index'),
      meta: {
        title: '账号管理',
        icon: 'accountM'
      }
    }
      // {
      //   path: "/roleManagement",
      //   name: "roleManagement",
      //   component: () =>
      //     import("@/views/systemManagement/roleManagement/index"),
      //   meta: { title: "角色管理", icon: "dashboard" },
      // },
    ]
  },
  {
    path: '/messageManage',
    component: Layout,
    name: 'messageManage',
    meta: {
      title: '消息管理',
      icon: 'messageM',
      roles: ['superAdmin']
    },
    children: [{
      path: '/messageConfiguration',
      name: 'messageConfiguration',
      component: () =>
        import('@/views/messageManagement/messageConfiguration/index'),
      meta: {
        title: '消息配置',
        icon: ''
      }
    },
    {
      path: '/messageConfigurationAdd',
      name: 'messageConfigurationAdd',
      component: () =>
        import('@/views/messageManagement/messageConfiguration/add'),
      meta: {
        title: '',
        icon: ''
      },
      hidden: true
    },
    {
      path: '/noticeNotice',
      name: 'noticeNotice',
      component: () =>
        import('@/views/messageManagement/messageTemplate/index'),
      meta: {
        title: '消息模版',
        icon: ''
      }
    },
    {
      path: '/messageConfigurationDetail',
      name: 'messageConfigurationDetail',
      component: () =>
        import('@/views/messageManagement/messageConfiguration/detail'),
      meta: {
        title: '',
        icon: ''
      },
      hidden: true
    },
    {
      path: '/messageCenter',
      name: 'messageCenter',
      component: () =>
        import('@/views/messageManagement/messageCenter/index'),
      meta: {
        title: '消息中心',
        icon: ''
      }
    }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
