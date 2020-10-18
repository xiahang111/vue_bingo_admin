import request from '@/utils/request-local'


export function getStoreTotalData(query) {
  return request({
    url: process.env.DATA_API + '/store/getTotalData',
    method: 'post',
    data: query
  })
}
