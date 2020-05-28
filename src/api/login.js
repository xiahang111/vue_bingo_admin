import request from '@/utils/request-local'

export function login(param) {
  return request({
    url: process.env.ADMIN_API + '/auth/login',
    method: 'post',
    data: param
  })
}

export function getInfo(token) {
  return request({
    url: process.env.ADMIN_API + '/auth/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: process.env.ADMIN_API + '/auth/logout',
    method: 'post'
  })
}
