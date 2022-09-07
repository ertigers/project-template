import request from '@/utils/request'

const prefix = ''

// 获取用户列表
export function getUserList(query) {
  return request({
    url: `${prefix}/system/user/list`,
    method: 'get',
    params: query
  })
}

// 添加用户
export function addUser(query) {
  return request({
    url: `${prefix}/system/user`,
    method: 'post',
    data: query
  })
}

// 删除用户
export function delRole(query) {
  return request({
    url: `${prefix}/system/user/` + query,
    method: 'delete'
  })
}

// 修改用户信息
export function setUser(query) {
  return request({
    url: `${prefix}/system/user`,
    method: 'put',
    data: query
  })
}

// 获取用户列表
export function getUser(query) {
  return request({
    url: `${prefix}/system/user`,
    method: 'get',
    params: query
  })
}

// 修改用户信息
export function setUserRole(query) {
  return request({
    url: `${prefix}/system/user/authRole`,
    method: 'put',
    data: query
  })
}

// 重置用户密码
export function resetUser(query) {
  return request({
    url: `${prefix}/system/user/resetPwd`,
    method: 'put',
    data: query
  })
}

