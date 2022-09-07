import request from '@/utils/request'

const prefix = ''
const server = ''

export function getParams() {
  return request({
    url: `${prefix}/tsinglink/sqlconfig`,
    method: 'get'
  })
}
export function setParams(query) {
  return request({
    url: `${prefix}/params/set`,
    method: 'post',
    data: query
  })
}
export function testConnect(query) {
  return request({
    url: `${server}/tsinglink/sqltest`,
    method: 'post',
    data: query
  })
}
export function getVersion(query) {
  return request({
    url: `${prefix}/version`,
    method: 'get',
    params: query
  })
}
export function initDatabase(query) {
  return request({
    url: `${prefix}/database/init`,
    method: 'post',
    data: query
  })
}
export function upgradeDatabase(query) {
  return request({
    url: `${prefix}/database/upgrade`,
    method: 'post',
    data: query
  })
}
// 获得系统参数
export function getServerParams() {
  return request({
    url: `${server}/tsinglink/serverconfig`,
    method: 'get'
  })
}

// 保存服务相关配置
export function setServerParams(query) {
  return request({
    url: `${server}/tsinglink/serverconfig`,
    method: 'post',
    data: query
  })
}

// 保存数据库配置
export function saveSqlConfig(query) {
  return request({
    url: `${server}/tsinglink/sqlconfig`,
    method: 'post',
    data: query
  })
}
