import request from '@/utils/request'

const prefix = '/api/v1'


/**
 * 页面查询
 * @param {*} query
 */
export const pageOne = (query) => {
  return request({
    url: `${prefix}/lego/page`,
    method: 'get',
    params: query
  })
}
