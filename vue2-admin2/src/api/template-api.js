import request from '@/utils/request'

const prefix = ''

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
    url: `${prefix}/system/user`,
    method: 'delete',
    data: query
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
