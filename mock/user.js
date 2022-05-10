
const tokens = {
  admin: {
    token: 'admin-token',
    userName: 'admin',
    routingTable: [{
      path: '/listPage',
      component: 'Layout',
      redirect: '/listPage',
      name: 'listPage',
      children: [{
        path: '/listPage',
        name: 'listPage',
        component: '/listPage/index',
        meta: {
          title: '列表测试页',
          icon: 'orderManage'
        }
      },
      {
        path: '/listPageDetail',
        name: 'listPageDetail',
        component: '/listPage/detail',
        meta: {
          title: '列表测试页详情页',
          icon: ''
        },
        hidden: true
      }
      ]
    }]
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/admin/login',
    type: 'post',
    response: config => {
      const { userName } = config.body
      const token = tokens[userName]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '账号密码输入错误'
        }
      }

      return {
        code: 10000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 10000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/admin/logout',
    type: 'get',
    response: _ => {
      return {
        code: 10000,
        data: 'success'
      }
    }
  }
]
