const Mock = require('mockjs')
let data
try {
  Mock.setup({ // 模拟网络延迟
    timeout: '500-1000'
  })

  data = Mock.mock({
    'items|30': [{
      id: '@id',
      nickName: '@string(2,3)',
      sex: '@integer(0, 1)',
      userName: '@cname',
      birthday: '@time("yyyy-MM-dd")',
      phone: '@integer(13499999999,13699999999)',
      remark: '@string()',
      image: '@dataImage("150x150")'
    }]
  })
} catch (error) {
  console.log(error)
}

module.exports = [
  {
    url: '/admin/user/list',
    type: 'post',
    response: config => {
      console.log(config)
      const { body: { page = 1, size = 10 } } = config
      const items = data.items
      return {
        code: 10000,
        data: {
          total: items.length,
          records: items.slice((page - 1) * size, page * size)
        }
      }
    }
  },
  {
    url: '/admin/user/delete\.*',
    type: 'post',
    response: config => {
      return {
        code: 10000,
        data: {
          msg: '删除成功'
        }
      }
    }
  },
  {
    url: '/admin/user/detail\.*',
    type: 'get',
    response: config => {
      return {
        code: 10000,
        data: Mock.mock(
          {
            id: '@id',
            nickName: '@string(2,3)',
            sex: '@integer(0, 1)',
            userName: '@cname',
            birthday: '@time("yyyy-MM-dd")',
            phone: '@integer(13499999999,13699999999)',
            remark: '@string()',
            image: '@dataImage("150x150")'
          }
        )
      }
    }
  },
  {
    url: '/admin/upload',
    type: 'post',
    response: config => {
      return {
        code: 10000,
        data: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F15%2F20181215115148_gianw.thumb.200_200_c.gif&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655369912&t=14b779e32298cd8d187a7c283b8af86d'
      }
    }
  }
]
