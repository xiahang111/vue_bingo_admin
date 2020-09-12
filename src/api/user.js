import request from '@/utils/request-local'

export function getAllUser(query) {

  return request({
    url: process.env.ADMIN_API + '/user/getAllUser',
    method: 'post',
    data: query
  })
}

export function getAllRole(query) {

  return request({
    url: process.env.ADMIN_API + '/user/getAllRole',
    method: 'post',
    data: query
  })
}

export function saveUser(query) {

  return request({
    url: process.env.ADMIN_API + '/user/saveUser',
    method: 'post',
    data: query
  })
}

