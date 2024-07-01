import hyRequest from '../request'

export function getHomeBanner() {
  return hyRequest.get({
    url: "/banner?type=1"
  })
}


// 新歌速递
// 全部:0,华语:7,欧美:96,日本:8,韩国:16
export function getNewTopSong(type = 0) {
  return hyRequest.get({
    url: `/top/song?type=${type}`
  })
}

// 新碟上架
export function getTopAlbum(data) {
  return hyRequest.get({
    url: `/top/album?offset=${data.offset}&limit=${data.limit}&type=${data.type}&area=${data.area}&year=${data.year}&month=${data.month}`
  })
}

// 热门歌手
export function getHotArtists(offset = 0, limit = 5) {
  return hyRequest.get({
    url: `/top/artists?offset=${offset}&limit=${limit}`
  })
}

// 获取歌曲详情
export function getSongUrl(id) {
  return hyRequest.get({
    url: `/song/url?id=${id}`
  })
}

// 所有榜单内容摘要
export function getAllDetail() {
  return hyRequest.get({
    url: `/toplist/detail`
  })
}

// 歌曲评论区
export function getSongCommentArea(id, limit = 30) {
  return hyRequest.get({
    url: `/comment/music?id=${id}&limit=${limit}`,
  })
}

// 点赞
export function setCommentlike(data) {
  return hyRequest.get({
    url: `/comment/like?id=${data.id}&cid=${data.cid}&t=${data.t}&type=${data.type}`,
  })
}

// 获取歌词
export function getMusicIyric(id) {
  return hyRequest.get({
    url: `/lyric?id=${id}`,
  })
}



// 获取歌手分类列表
export function getArtistList(data, page) {
  return hyRequest.get({
    url: `/artist/list?offset=${page.offset}&limit=${page.limit}&type=${data.type}&area=${data.area}&initial=${data.initial}`,
  })
}
// 获取最近播放歌曲
export function getRecordRecentSongList() {
  return hyRequest.get({
    url: `/record/recent/song?timestamp=${(new Date).getTime()}`,
  })
}
// 获取歌曲评论
export function getCommentMusic(params) {
  return hyRequest.get({
    url: `/comment/music`,
    params
  })
}

