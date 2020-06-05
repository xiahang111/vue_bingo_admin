import request from '@/utils/request-local'

export function getAllProduct(query) {
  return request({
    url: process.env.ADMIN_API + '/product/getAllProduct',
    method: 'get',
    data: query
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
