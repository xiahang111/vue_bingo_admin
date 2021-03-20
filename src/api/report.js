import request from '@/utils/request-local'

export function ordermakerReport(query) {

  return request({
    url: process.env.ADMIN_API + '/report/ordermaker',
    method: 'post',
    data: query
  })
}

export function ordermakersaleReport(query) {

  return request({
    url: process.env.ADMIN_API + '/report/ordermakersale',
    method: 'post',
    data: query
  })
}


export function storeAllWeightTop(query) {

  return request({
    url: process.env.ADMIN_API + '/report/storeAllWeightTop',
    method: 'post',
    data: query
  })
}

export function storeAllPriceTop(query) {

  return request({
    url: process.env.ADMIN_API + '/report/storeAllPriceTop',
    method: 'post',
    data: query
  })
}

export function storeNumReport(query) {

  return request({
    url: process.env.ADMIN_API + '/report/storeNumReport',
    method: 'post',
    data: query
  })
}

export function storeInOutReport(query) {

  return request({
    url: process.env.ADMIN_API + '/report/storeInOutReport',
    method: 'post',
    data: query
  })
}

export function salesmanNumReport(query) {

  return request({
    url: process.env.ADMIN_API + '/report/salesmanNumReport',
    method: 'post',
    data: query
  })
}

export function salesmanPriceReport(query) {

  return request({
    url: process.env.ADMIN_API + '/report/salesmanPriceReport',
    method: 'post',
    data: query
  })
}

export function salesmanMonthReport(query) {

  return request({
    url: process.env.ADMIN_API + '/report/salesmanMonthReport',
    method: 'post',
    data: query
  })
}

export function getOrderTypePie(query) {

  return request({
    url: process.env.ADMIN_API + '/report/getOrderTypePie',
    method: 'post',
    data: query
  })
}
