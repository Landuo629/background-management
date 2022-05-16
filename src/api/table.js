/**
 * @description  管理后台-用户信息
 */
import request from '@/utils/request'

// 分页查看用户列表
export function getuserList (data) {
  return request({
    url: `/admin/user/list`,
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUser (params) {
  return request({
    url: `/admin/user/delete/${params.id}`,
    method: 'post'
  })
}
// 查看用户详情
export function getDetail (params) {
  return request({
    url: `/admin/user/detail/${params.id}`,
    method: 'get',
    noLoading: true
  })
}
