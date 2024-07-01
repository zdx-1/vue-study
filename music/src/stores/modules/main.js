import { defineStore } from 'pinia'
import { getNewTopSong, getHotSongList } from '@/services'

const useMainStore = defineStore('main', {
  state: () => ({
    newTopSong: {

    },
    hotSongList: [
      [{},{},{}]
    ]
  }),
  actions: {
    async fetchNewTopSongListData(type = 0) {
      if(this.newTopSong[type]) return
      const res = await getNewTopSong(type)
      this.newTopSong[type] = res["data"]
    },
    async fetchHotSongListData() {
      const res = await getHotSongList()
      this.hotSongList = res["playlist"]['tracks']
    },
  }
})

export default useMainStore
