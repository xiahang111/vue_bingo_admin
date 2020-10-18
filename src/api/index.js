import request from '@/utils/request-local'


export function indexOrderAndSaleCount(query) {
  return request({
    url: process.env.ADMIN_API + '/index/getIndexData',
    method: 'post',
    data: query
  })
}

export function getLineData(query) {
  return request({
    url: process.env.ADMIN_API + '/index/getLineData',
    method: 'post',
    data: query
  })
}

export function getIndexOrderInfo(query) {
  return request({
    url: process.env.ADMIN_API + '/index/getIndexOrderInfo',
    method: 'get',
    param: query
  })
}

export function getStoreTotalData(query) {
  return request({
    url: process.env.DATA_API + '/store/getTotalData',
    method: 'post',
    data: query
  })
}
