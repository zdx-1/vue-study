import hyRequest from '../request'

// 歌单 ( 网友精选碟 )
export function getCatPlaylist(cat = "全部", limit = 5) {
  return hyRequest.get({
    url: `/top/playlist?order=hot&cat=${cat}&limit=5&offset=0`
  })
}

// 热歌榜单
export function getHotSongList(cat = "全部", limit = 5) {
  return hyRequest.get({
    url: `/playlist/detail?id=19723756`
  })
}

// 歌单评论区
export function getCommentPlaylist(id, data = {
  offset: 0,
  limit: 30
}
) {
  return hyRequest.get({
    url: `comment/playlist?id=${id}&offset=${data.offset}&limit=${data.limit}`,
  })
}

// 获取歌单详情
export function getPlaylistDetail(id) {
  return hyRequest.get({
    url: `/playlist/detail?id=${id}`
  })
}
// 获取获取每日推荐歌单
export function getRecommendResource(id) {
  return hyRequest.get({
    url: `/recommend/resource`
  })
}

// 获取歌单详情里全部的歌曲
export function getAllPlaylistDetail(id) {
  return hyRequest.get({
    url: `/song/detail?ids=${id}`
  })
}

// 推荐歌单
export function getNewSongSheet(limit = 5) {
  return hyRequest.get({
    url: `/personalized?limit=${limit}`
  })
}


// 歌单分类
export function getLaylistatlist() {
  return hyRequest.get({
    url: `playlist/catlist`
  })
}


// 最上面的歌单精品
export function getTopPlayHighquality(cat) {
  return hyRequest.get({
    url: `top/playlist/highquality?limit=1&cat=${cat}`
  })
}


// 歌单 ( 网友精选碟 )
export function getCatPlaylists(data) {
  return hyRequest.get({
    url: `/top/playlist?order=hot&cat=${data.cat}&limit=${data.limit}&offset=${data.offset}`
  })
}


// 新建歌单
export function getSheetPlaylistCreate(test, privacys = false) {
  let privacy = privacys ? "&privacy=10" : ''
  return hyRequest.get({
    url: `/playlist/create?name=${test}${privacy}`
  })
}




