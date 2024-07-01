import hyRequest from '../request'

// 获取收藏的歌手列表
export function getArtistSublist() {
  return hyRequest.get({
    url: "/artist/sublist"
  })
}
// 获取收藏的专栏
export function getTopicSublist() {
  return hyRequest.get({
    url: "/topic/sublist?limit=2&offset=1"
  })
}
// 获取收藏视频
export function getVideoSub() {
  return hyRequest.get({
    url: "/video/sub"
  })
}
// 获取已收藏专辑列表
export function getAlbumSublist() {
  return hyRequest.get({
    url: "/album/sublist"
  })
}
// 获取我的数字专辑
export function getDigitalAlbumPurchased() {
  return hyRequest.get({
    url: "/digitalAlbum/purchased"
  })
}
// 收藏的 MV 列表
export function getMvSublist() {
  return hyRequest.get({
    url: "/mv/sublist"
  })
}

