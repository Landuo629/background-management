/**
 * @description  管理后台-用户信息
 */
import request from '@/utils/request'

// 分页查看列表
export function getTableList(data) {
  return request({
    url: `/admin/table/list`,
    method: 'post',
    data
  })
}

// 新增或者编辑数据
export function addTable(data) {
  return request({
    url: `/admin/table/add`,
    method: 'post',
    data
  })
}

// 删除用户
export function delTable(params) {
  return request({
    url: `/admin/table/delete`,
    method: 'post',
    params
  })
}
// 查看用户详情
export function getTableDetail(params) {
  return request({
    url: `/admin/table/detail/${params.id}`,
    method: 'get',
    noLoading: true
  })
}
