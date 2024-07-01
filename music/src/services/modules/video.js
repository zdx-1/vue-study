import hyRequest from '../request'

// 获取视频标签列表
export function getVideoGroupList() {
  return hyRequest.get({
    url: `/video/group/list`
  })
}

// 获取视频分类列表
export function getVideoCategoryList() {
  return hyRequest.get({
    url: `/video/category/list`
  })
}

// 获取视频标签/分类下的视频
export function getVideoGroup(id, offset = 0) {
  return hyRequest.get({
    url: `/video/group?id=${id}&offset=${offset}&timestamp=${(new Date).getTime()}`
  })
}

// 获取视频
export function getVideoUrl(id) {
  return hyRequest.get({
    url: `/video/url?id=${id}`
  })
}
// 获取全部视频列表
export function getVideoTimelineAll(offset = 0) {
  return hyRequest.get({
    url: `/video/timeline/all?offset=${offset}`
  })
}
