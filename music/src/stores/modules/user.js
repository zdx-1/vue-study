import { defineStore } from 'pinia'
import { getUserAccount, getUserSubcount, getUserPlaylist, getUserDetail, getUserVipInfo, getUserLikelist } from '@/services'
import { toRefs, watch } from 'vue'
const router = [
  {
    path: '/myLikemusic',
    title: '喜欢的音乐',
  },
  {
    path: '/recentlyPlay',
    title: '最近播放',
  },
  {
    path: '/myCollection',
    title: '我的收藏',
  },
  {
    path: '/myCearterSongSheet',
    title: '创建的歌单',
    children: []
  },
  {
    path: '/myLikeSongSheet',
    title: '收藏的歌单',
    children: []
  },

]
const routerKey = {
  '喜欢的音乐': 0,
  '创建的歌单': 0,
  '收藏的歌单': 10,
}
const addAccessRouter = (data) => {
  const noAccess = ['最近播放']
  const newRouter = data.reduce((obj, val, index, arr) => {
    if (!obj[val.creator?.djStatus]) {
      obj[val.creator.djStatus] = []
    }
    obj[val.creator.djStatus].push({
      title: val.name,
      path: `/songSheet?id=${val.id}`
    })
    return obj
  }, {})
  return router.map(item => {
    if(noAccess.includes(item.title)) return item
    switch (item.title) {
      case '喜欢的音乐':
        item.path = newRouter[routerKey[item.title]].slice(0, 1)[0]?.path
        break;
      case '创建的歌单':
        item.children = newRouter[routerKey[item.title]].slice(1, newRouter[0]?.length)
        break;
      case '收藏的歌单':
        item.children = newRouter[routerKey[item.title]]
        break;
    
      default:
        break;
    }
    return item
  })
} 

const useUserStore = defineStore('user', {
  state: () => ({
    loginStatus: false,
    cookie: '',
    userInfo: {
      userId: ''
    },
    userSubcount: {},
    likePlayList: [],
    collectSongSheetlists: [],
    createSongSheetList: [],
    collectSongSheetlistsRouter: [],
    createSongSheetListRouter: [],
    myMenuPathRouter: [...router],
    userDetail: {},
    userVipInfo: {},
  }),
  actions: {
    async initUserAllInfo() {
      const userInfoRes = await getUserAccount()
      if (userInfoRes.code == 200 && userInfoRes.profile) {
        this.userInfo = userInfoRes.profile
        const res = await getUserPlaylist(this.userInfo.userId)
        this.likePlayList = res.playlist
        const list = res.playlist
        if (!list.length) return
        this.myMenuPathRouter = addAccessRouter(list)
        const userDetailRes = await getUserDetail(this.userInfo.userId)
        this.userDetail = userDetailRes
        // const userSubcountRes = await getUserSubcount()
        const userVipInfoRes = await getUserVipInfo()
        this.userVipInfo = userVipInfoRes.data
        // const userLikelist = await getUserLikelist()
        // console.log(userLikelist, 'userLikelist');
      } else {
        localStorage.removeItem('cookie')
      }
    },
  }
})


export default useUserStore
