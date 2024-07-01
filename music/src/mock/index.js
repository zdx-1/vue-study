export const indexTabsMock=[
  {
    label: '个性专属',
    name: 'personalizedMuicList',
  },
  // {
  //  label: '专属定制',
  //  name: 'exclusiveMusicSheet',
  //  path: exclusiveMusicSheet
  // },
  {
   label: '歌单',
   name: 'songSheet',
  },
  {
   label: '排行榜',
   name: 'theCharts',
  },
  {
   label: '歌手',
   name: 'singer',
  },
  {
   label: '最新音乐',
   name: 'latestMusic',
  },
]

export const artistTabsMock=[
  {
    title: '专辑',
    name: 'albumInfo',
    id: 'albumInfo',
  },
  {
    title: '歌手详情',
    name: 'artistsDesc',
    id: 'artistsDesc',
  },
  {
    title: '相似歌手',
    name: 'similarartist',
    id: 'similarartist',
  },
]


export const topSongMock = [
  {
    title: '全部',
    type: 0
   },
  {
    title: '欧美',
    type: 96
   },
  {
    title: '日本',
    type: 8
   },
  {
    title: '韩国',
    type: 16
   },
]

export const catKeyListMock = ['ACG', '经典', '华语']

export const songAlbumMock=[
  {
    title: '歌曲列表',
    type: 0
   },
  {
    title: '评论',
    type: 1
   }
]


let AZList = [...Array(26).keys()].map(i => String.fromCharCode(i + 65))
let AZArr = []
for (let i = 0; i < AZList.length; i++) {
  let obj = {}
  let key = AZList[i];
  obj['name'] = key
  obj['key'] = key
  AZArr.push(obj)
  
}

export const artistListClassMock=[
  {
    name: '语种',
    key: 'area',
    items: [
      {
        name: '全部',
        key: "-1"
      },
      {
        name: '华语',
        key: "7"
      },
      {
        name: '欧美',
        key: "96"
      },
      {
        name: '日本',
        key: "8"
      },
      {
        name: '韩国',
        key: "16"
      },
      {
        name: '其他',
        key: "0"
      },
    ]
   },
  {
    name: '分类',
    key: 'type',
    items: [
      {
        name: '全部',
        key: "-1"
      },
      {
        name: '男歌手',
        key: "1"
      },
      {
        name: '女歌手',
        key: "2"
      },
      {
        name: '乐队',
        key: "3"
      },
    ]
  },
  {
    name: '筛选',
    key: 'initial',
    items: [
      {
        name: '热门',
        key: "-1"
      },
      ...AZArr,
      {
        name: '#',
        key: "0"
      },
    ]
  }
]


export const latestMusicTabBoxMock = [
  {
    title: '新歌速递',
    key: 'latestMusicContentTabMock'
  },
  {
    title: '新碟上架',
    key: 'newDiscContentTabMock'
  },
]

export const latestMusicContentTabMock = [
  {
    name: '全部',
    key: "0"
  },
  {
    name: '华语',
    key: "7"
  },
  {
    name: '欧美',
    key: "96"
  },
  {
    name: '日本',
    key: "8"
  },
  {
    name: '韩国',
    key: "16"
  },
]

export const newDiscContentTabMock = [
  {
    name: '全部',
    key: "ALL"
  },
  {
    name: '华语',
    key: "ZH"
  },
  {
    name: '欧美',
    key: "EA"
  },
  {
    name: '日本',
    key: "JP"
  },
  {
    name: '韩国',
    key: "KR"
  },
]



