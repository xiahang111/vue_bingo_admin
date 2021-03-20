import request from '@/utils/request-local'

export function getProcessRecord(query) {

  return request({
    url: process.env.ADMIN_API + '/order-process/getProcessRecord',
    method: 'post',
    data: query
  })
}

export function updateProcessRecord(query) {

  return request({
    url: process.env.ADMIN_API + '/order-process/updateProcessRecord',
    method: 'post',
    data: query
  })
}

export function getProcessHistoryPage(query) {

  return request({
    url: process.env.ADMIN_API + '/order-process/getProcessHistoryPage',
    method: 'post',
    data: query
  })
}

export function getOrderExpress(query) {

  return request({
    url: process.env.ADMIN_API + '/order-express/getOrderExpress',
    method: 'post',
    data: query
  })
}

export function saveOrderExpress(query) {

  return request({
    url: process.env.ADMIN_API + '/order-express/saveOrderExpress',
    method: 'post',
    data: query
  })
}
