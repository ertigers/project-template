import request from '@/utils/request'

const prefix = ''

// 查询操作集权限
export function getLogsList(query) {
  return request({
    url: `${prefix}/system/logs/list`,
    method: 'get',
    params: query
  })
}

export function getTypeSelect() {
  return request({
    url: `${prefix}/system/logs/select`,
    method: 'get'
  })
}

