import hyRequest from '../request'

// 获取默认搜索关键词
export function getSearchDefault() {
  return hyRequest.get({
    url: `/search/default`
  })
}

// 获取搜索歌单 歌单 专辑 等等
export function getSearchSuggest(keywords) {
  return hyRequest.get({
    url: `/search/suggest?keywords=${keywords}`
  })
}
// 获取 猜你想搜
export function getCloudsearch(keywords, type = 1) {
  return hyRequest.get({
    url: `/cloudsearch?keywords=${keywords}&type=${type}`
  })
}


// 获取热搜列表(详细)
export function getSearchHotDetail() {
  return hyRequest.get({
    url: `/search/hot/detail`
  })
}
