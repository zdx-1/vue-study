import hyRequest from '../request'

// 获取歌手详情
export function getArtistsDetail(id) {
  return hyRequest.get({
    url: `/artist/detail?id=${id}`
  })
}

// 获取歌手单曲
export function getArtists(id) {
  return hyRequest.get({
    url: `/artists?id=${id}`
  })
}

// 获取歌手描述
export function getArtistsDesc(id) {
  return hyRequest.get({
    url: `/artist/desc?id=${id}`
  })
}

// 获取歌手专辑
export function getArtistsAlbum(data = {}) {
  return hyRequest.get({
    url: `/artist/album?id=${data.id}&limit=${data.limit}&offset=${data.offset}`
  })
}

// 歌手热门 50 首歌曲
export function getArtistsTopSong(id) {
  return hyRequest.get({
    url: `/artist/top/song?id=${id}`
  })
}
// 获取相似歌单
export function getSimiArtists(id) {
  return hyRequest.get({
    url: `/simi/artist?id=${id}`
  })
}
