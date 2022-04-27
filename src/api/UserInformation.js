/**
 * @description  管理后台-用户信息
 */
import request from '@/utils/request'
// 删除用户
export function deleteUser(params) {
  return request({
    url: `/admin/user/delete/${params.id}`,
    method: 'post'
  })
}
// 查看用户详情
export function getUserDetail(params) {
  return request({
    url: `/admin/user/detail/${params.id}`,
    method: 'get'
  })
}
// 给用户添加试听课程
export function addAuditionCourse(data) {
  return request({
    url: `/admin/user/addAudition`,
    method: 'post',
    data
  })
}
// 查看课程类型
export function getCourseType() {
  return request({
    url: `/admin/common/getCourseType`,
    method: 'get'
  })
}
// 分页查看用户试听待试听课程列表
export function AuditionCourseList(data) {
  return request({
    url: `/admin/user/listCourse`,
    method: 'post',
    data
  })
}
// 给用户删除试听课程
export function deleteAuditionCourse(data) {
  return request({
    url: `/admin/user/deleteAudition`,
    method: 'post',
    data
  })
}
// 导入用户信息
export function importUser(data) {
  return request({
    url: `/admin/user/importUser`,
    method: 'post',
    data
  })
}
// 分页查看用户列表
export function getuserList(data) {
  return request({
    url: `/admin/user/list`,
    method: 'post',
    data
  })
}
// 更新用户
export function updateUsers(data) {
  return request({
    url: `/admin/user/update`,
    method: 'post',
    data
  })
}
// 查看行业类型
export function getIndustryType() {
  return request({
    url: `/admin/common/getIndustryType`,
    method: 'get'
  })
}
// 查看公司规模
export function getCompanyScale() {
  return request({
    url: `/admin/common/getCompanyScale`,
    method: 'get'
  })
}
// 查看期望改善的方向
export function getExpectTargetType() {
  return request({
    url: `/admin/common/getExpectTargetType`,
    method: 'get'
  })
}
// 查看职位类型
export function getPositionType() {
  return request({
    url: `/admin/common/getPositionType`,
    method: 'get'
  })
}

// 判断用户是否需要补充个人信息
export function getShouldCompleteUserInfo(params) {
  return request({
    url: `/admin/user/shouldCompleteUserInfo/${params.userId}`,
    method: 'get'
  })
}
