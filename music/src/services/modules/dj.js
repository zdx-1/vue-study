import hyRequest from '../request'

// 电台 banner
export function getDjBanner() {
  return hyRequest.get({
    url: "/dj/banner"
  })
}

// 电台个性推荐
export function getDjPersonalizeRecommend() {
  return hyRequest.get({
    url: "/dj/personalize/recommend?limit=6"
  })
}


// 电台 - 分类
export function getDjCatelist() {
  return hyRequest.get({
    url: "/dj/catelist"
  })
}
// 电台 - 分类推荐
export function getDjRecommendType(type) {
  return hyRequest.get({
    url: `/dj/recommend/type?type=${type}`
  })
}



