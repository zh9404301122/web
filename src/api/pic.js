import request from '@/utils/request'

export function commodityList(data) {
  return request({
    url: '/steelserver/commodity/list',
    method: 'post',
    data
  })
}

export function commodityAddSteel(data) {
  return request({
    url: '/steelserver/commodity/addSteel',
    method: 'post',
    data
  })
}

export function commodityUpdateSteel(data) {
  return request({
    url: '/steelserver/commodity/updateSteel',
    method: 'post',
    data
  })
}

export function commodityAddSteelPrice(data) {
  return request({
    url: '/steelserver/commodity/addSteelPrice',
    method: 'post',
    data
  })
}

export function commodityHistoryList(data) {
  return request({
    url: '/steelserver/commodity/historyList',
    method: 'post',
    data
  })
}

//类型列表
export function commodityListType(data) {
  return request({
    url: '/steelserver/commodity/listType',
    method: 'post',
    data
  })
}

//新增类型
export function commodityAddType(data) {
  return request({
    url: '/steelserver/commodity/addType',
    method: 'post',
    data
  })
}

//修改类型
export function commodityUpdateType(data) {
  return request({
    url: '/steelserver/commodity/updateType',
    method: 'post',
    data
  })
}

//删除类型
export function commodityDeleteType(data) {
  return request({
    url: '/steelserver/commodity/deleteType',
    method: 'post',
    data
  })
}

//删除产品
export function commodityDelete(data) {
  return request({
    url: '/steelserver/commodity/delete',
    method: 'post',
    data
  })
}