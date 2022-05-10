/**
 * @description  管理后台-管理员接口
 */
import request from '@/utils/request'

// 管理员列表
export function getAdminList(data) {
  return request({
    url: '/admin/list',
    method: 'post',
    data
  })
}

// 编辑管理员
export function addAdmin(data) {
  return request({
    url: '/admin/add',
    method: 'post',
    data
  })
}

// 删除管理员
export function delAdmin(id) {
  return request({
    url: `/admin/delete/${id}`,
    method: 'get'
  })
}

// 用户登陆
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 用户登出
export function logout() {
  return request({
    url: `/admin/logout`,
    method: 'get'
  })
}
