import request from '@/utils/request'

const prefix = ''

// 登录
export function login(query) {
  return request({
    url: `${prefix}/login`,
    method: 'post',
    data: query
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: `${prefix}/getInfo`,
    method: 'get'
  })
}

// 退出方法-todo
export function logout() {
  return request({
    url: `${prefix}/logout`,
    method: 'get'
  })
}

