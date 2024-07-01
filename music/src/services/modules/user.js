import hyRequest from '../request'
// 游客登录
export function getRegisterAnonimous() {
  return hyRequest.get({
    url: `/register/anonimous`,
  })
}
// 退出登入
export function getLogout() {
  return hyRequest.get({
    url: `/logout`,
  })
}
// 获取用户详情
export function getUserDetail(id) {
  return hyRequest.get({
    url: `/user/detail?uid=${id}`,
  })
}
// 二维码 key 生成接口
export function getloginQrKey() {
  return hyRequest.get({
    url: `/login/qr/key`,
  })
}
// 二维码生成接口
export function getloginQrCreate(key) {
  return hyRequest.get({
    url: `/login/qr/create?timestamp=${(new Date).getTime()}`,
    params: {
      qrimg: true,
      key: key
    },
  })
}

// 二维码 key 状态
export function getloginQrCheck(key) {
  return hyRequest.get({
    url: `/login/qr/check?key=${key}&timestamp=${(new Date).getTime()}`
  })
}

// 获取个人信息
export function getUserAccount() {
  return hyRequest.get({
    url: `/user/account`
  })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getUserSubcount() {
  return hyRequest.get({
    url: `/user/subcount`
  })
}
// 获取Vip Info
export function getUserVipInfo() {
  return hyRequest.get({
    url: `/vip/info`
  })
}

// 获取用户歌单
export function getUserPlaylist(uid) {
  return hyRequest.get({
    url: `/user/playlist?uid=${uid}`
  })
}

// 获取自己喜欢的音乐
export function getUserLikelist() {
  return hyRequest.get({
    url: `/likelist`
  })
}

// 验证登录状态
export function getLoginStatus() {
  return hyRequest.get({
    url: `/login/status`
  })
}
