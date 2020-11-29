import request from '@/utils/request-local'

export function getCustomer(params) {
  return request({
    url: process.env.PERSON_API + '/customer/getCustomer',
    method: 'post',
    data: params
  })
}

export function saveCustomer(params) {
  return request({
    url: process.env.PERSON_API + '/customer/saveCustomer',
    method: 'post',
    data: params
  })
}

export function saveCompany(params) {
  return request({
    url: process.env.PERSON_API + '/company/saveCompany',
    method: 'post',
    data: params
  })
}

export function getCompany(params) {
  return request({
    url: process.env.PERSON_API + '/company/getCompany',
    method: 'post',
    data: params
  })
}

export function searchCustomer(params) {
  return request({
    url: process.env.PERSON_API + '/customer/searchCustomer',
    method: 'get',
    params
  })
}
