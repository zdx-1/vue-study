
import hyRequest from '../request'

// 获取最新 mv
export function getMvFirst(area = '全部', limit = 8) {
  return hyRequest.get({
    url: `/mv/first?area=${area}&limit=${limit}`,
  })
}

// 获取 网易出品 mv
export function getMvExclusiveRcmd(offset = 0, limit = 8) {
  return hyRequest.get({
    url: `/mv/exclusive/rcmd?offset=${offset}&limit=${limit}`,
  })
}

// 获取 全部mv
export function getMvAll(data = {
  area: '全部',
  order: '最热',
  offset: 0,
  limit: 8
}) {
  return hyRequest.get({
    url: `/mv/all?area=${data.area}&order=${data.order}&offset=${data.offset}&limit=${data.limit}`,
  })
}

// 获取 mv url
export function getMvUrl(id = '') {
  return hyRequest.get({
    url: `/mv/url?id=${id} `,
  })
}