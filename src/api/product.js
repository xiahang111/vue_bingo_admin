import request from '@/utils/request-local'

export function getAllProduct(params) {
  return request({
    url: process.env.ADMIN_API + '/product/getAllProduct',
    method: 'get',
    params
  })
}

export function glassCalculate(query) {

  return request({
    url: process.env.ADMIN_API + '/product/glassCalculate',
    method: 'post',
    data: query
  })

}

export function getAllGlassCalculate(query) {

  return request({
    url: process.env.ADMIN_API + '/product/getAllGlassCalculate',
    method: 'get',
    data: query
  })
}

export function getGlassRecordByQuery(query) {

  return request({
    url: process.env.ADMIN_API + '/product/getGlassRecordByQuery',
    method: 'post',
    data: query
  })
}

export function materialCalculate(query) {

  return request({
    url: process.env.ADMIN_API + '/product/materialCalculate',
    method: 'post',
    data: query
  })

}

export function getMaterialRecordByQuery(query) {

  return request({
    url: process.env.ADMIN_API + '/product/getMaterialRecordByQuery',
    method: 'post',
    data: query
  })
}

export function commitOrder(query) {

  return request({
    url: process.env.ADMIN_API + '/order/commitOrder',
    method: 'post',
    data: query,
  })
}

export function commitCBDOrder(query) {

  return request({
    url: process.env.ADMIN_API + '/order/commitCBDOrder',
    method: 'post',
    data: query,
  })
}

export function getOrderByUser(query) {

  return request({
    url: process.env.ADMIN_API + '/order/getByUser',
    method: 'post',
    data: query,
  })
}

export function getMaterialVOById(params) {

  return request({
    url: process.env.ADMIN_API + '/order/getMaterialVOById',
    method: 'get',
    params
  })
}

export function getFileNamesByOrderUid(params) {

  return request({
    url: process.env.ADMIN_API + '/order/getFileNamesByOrderUid',
    method: 'get',
    params
  })
}

export function deleteByOrderUid(params) {

  return request({
    url: process.env.ADMIN_API + '/order/deleteByOrderUid',
    method: 'get',
    params
  })
}

export function saveOrderAgain(params) {

  return request({
    url: process.env.ADMIN_API + '/order/saveOrderAgain',
    method: 'get',
    params
  })
}

export function getGlassInfo(query) {

  return request({
    url: process.env.ADMIN_API + '/product/getGlassInfo',
    method: 'post',
    data: query
  })
}

export function getSalemenStatement(query) {

  return request({
    url: process.env.ADMIN_API + '/order/SalemenStatement',
    method: 'post',
    data: query
  })
}


