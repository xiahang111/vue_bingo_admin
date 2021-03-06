import request from '@/utils/request-local'


export function indexOrderAndSaleCount(query) {
  return request({
    url: process.env.ADMIN_API + '/index/getIndexData',
    method: 'post',
    data: query
  })
}
