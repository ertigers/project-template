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

export function getRoleSelect() {
  return request({
    url: `${prefix}/system/role/optionselect`,
    method: 'get'
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
