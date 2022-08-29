import request from '@/utils/request'

const prefix = ''

// 查询角色列表
export function getRoleList(query) {
  return request({
    url: `${prefix}/system/role/list`,
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
export function setRole(query) {
  return request({
    url: `${prefix}/system/role`,
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
