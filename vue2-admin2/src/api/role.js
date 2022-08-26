import request from '@/utils/request'

const prefix = ''

// 查询角色列表
export function listRole(query) {
  return request({
    url: `${prefix}/system/role/list`,
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(query) {
  return request({
    url: `${prefix}/system/role/`,
    method: 'get',
    params: query
  })
}

// 新增角色
export function addRole(query) {
  return request({
    url: `${prefix}/system/role`,
    method: 'post',
    data: query
  })
}

// 修改角色
export function updateRole(query) {
  return request({
    url: `${prefix}/system/role`,
    method: 'put',
    data: query
  })
}

// 角色数据权限
export function dataScope(query) {
  return request({
    url: `${prefix}/system/role/dataScope`,
    method: 'put',
    data: query
  })
}

// 角色状态修改
export function changeRoleStatus(query) {
  return request({
    url: `${prefix}/system/role/changeStatus`,
    method: 'put',
    data: query
  })
}

// 删除角色
export function delRole(query) {
  return request({
    url: `${prefix}/system/role/`,
    method: 'delete',
    data: query
  })
}

// 查询角色已授权用户列表
export function allocatedUserList(query) {
  return request({
    url: `${prefix}/system/role/authUser/allocatedList`,
    method: 'get',
    params: query
  })
}

// 查询角色未授权用户列表
export function unallocatedUserList(query) {
  return request({
    url: `${prefix}/system/role/authUser/unallocatedList`,
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: `${prefix}/system/role/authUser/cancel`,
    method: 'put',
    data: data
  })
}

// 批量取消用户授权角色
export function authUserCancelAll(data) {
  return request({
    url: `${prefix}/system/role/authUser/cancelAll`,
    method: 'put',
    params: data
  })
}

// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: `${prefix}/system/role/authUser/selectAll`,
    method: 'put',
    params: data
  })
}
