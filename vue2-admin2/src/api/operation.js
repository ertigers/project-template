import request from '@/utils/request'

const prefix = ''

// 查询操作集权限
export function getPermissionList() {
  return request({
    url: `${prefix}/system/operation/optioncascader`,
    method: 'get'
  })
}

