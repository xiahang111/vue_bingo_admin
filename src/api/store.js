import request from '@/utils/request-local'

export function getStoreSummary(query) {

  return request({
    url: process.env.ADMIN_API + '/store/getStoreSummary',
    method: 'post',
    data: query
  })
}

export function getStoreOrigin(query) {

  return request({
    url: process.env.ADMIN_API + '/store/getStoreOrigin',
    method: 'post',
    data: query
  })
}

export function getStoreStatement(query) {

  return request({
    url: process.env.ADMIN_API + '/store/getStoreStatement',
    method: 'post',
    data: query
  })
}

export function getStoreOriginRecord(query) {

  return request({
    url: process.env.ADMIN_API + '/store/getStoreOriginRecord',
    method: 'post',
    data: query
  })
}

export function getStoreRecord(query) {

  return request({
    url: process.env.ADMIN_API + '/store/getStoreRecord',
    method: 'post',
    data: query
  })
}

export function saveStoreRecord(query) {

  return request({
    url: process.env.ADMIN_API + '/store/saveStoreRecord',
    method: 'post',
    data: query
  })
}

export function saveStoreOriginalRecord(query) {

  return request({
    url: process.env.ADMIN_API + '/store/saveStoreOriginalRecord',
    method: 'post',
    data: query
  })
}

export function saveStoreSummary(query) {

  return request({
    url: process.env.ADMIN_API + '/store/saveStoreSummary',
    method: 'post',
    data: query
  })
}

export function saveStoreOrigin(query) {

  return request({
    url: process.env.ADMIN_API + '/store/saveStoreOrigin',
    method: 'post',
    data: query
  })
}

export function deleteStoreSummary(query) {

  return request({
    url: process.env.ADMIN_API + '/store/deleteStoreSummary',
    method: 'post',
    data: query
  })
}

export function deleteStoreOrigin(query) {

  return request({
    url: process.env.ADMIN_API + '/store/deleteStoreOrigin',
    method: 'post',
    data: query
  })
}

export function getStoreNameList(params) {
  return request({
    url: process.env.ADMIN_API + '/store/getStoreNameList',
    method: 'get',
    params
  })
}

export function getOriginNameList(params) {
  return request({
    url: process.env.ADMIN_API + '/store/getOriginNameList',
    method: 'get',
    params
  })
}

export function callbackStoreRecord(params) {
  return request({
    url: process.env.ADMIN_API + '/store/callbackStoreRecord',
    method: 'get',
    params
  })
}

export function getStoreOutsideList(query) {

  return request({
    url: process.env.ADMIN_API + '/store-outside/getStoreOutsideList',
    method: 'post',
    data: query
  })
}

export function saveStoreOutSideRecord(query) {

  return request({
    url: process.env.ADMIN_API + '/store-outside/saveStoreOutSideRecord',
    method: 'post',
    data: query
  })
}

export function updateStoreOutSideData(query) {

  return request({
    url: process.env.ADMIN_API + '/store-outside/updateStoreOutSideData',
    method: 'post',
    data: query
  })
}

export function saveRemindConfig(query) {

  return request({
    url: process.env.ADMIN_API + '/store-remind/saveRemindConfig',
    method: 'post',
    data: query
  })
}

export function getRemindConfigList(query) {

  return request({
    url: process.env.ADMIN_API + '/store-remind/getRemindConfigList',
    method: 'post',
    data: query
  })
}
export function getMessageRemindList(query) {

  return request({
    url: process.env.ADMIN_API + '/store-remind/getMessageRemindList',
    method: 'post',
    data: query
  })
}

export function deleteRemindConfigByUid(params) {
  return request({
    url: process.env.ADMIN_API + '/store-remind/deleteRemindConfigByUid',
    method: 'get',
    params
  })
}

export function getMessageRemindPage(query) {

  return request({
    url: process.env.ADMIN_API + '/store-remind/getMessageRemindPage',
    method: 'post',
    data: query
  })
}





