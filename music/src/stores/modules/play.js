import { defineStore } from 'pinia'
import { getSongUrl, getPlaylistDetail, getAllPlaylistDetail } from '@/services'
import { toRefs, watch } from 'vue'
let time;

const usePlayStore = defineStore('play', {
  state: () => ({
    playUrl: '',
    playList: [],
    PlayingInfo: {},
    playOrPaused: false,
    audioRef: null,
    playIndex: -1,
    playingCurrentTime: 0
  }),
  actions: {
    async getPlayUrl(info) {
      const res = await getSongUrl(info.id)
      this.playUrl = res['data'][0].url
      setTimeout(() => {
        let playPromise = this.audioRef.play()
 
        if (playPromise !== undefined) {
          playPromise.then(_ => {
            this.playOrPaused = true
            this.audioRef.pause()
            this.PlayingInfo = info
            this.PlayingInfo.playTime = this.audioRef.duration * 1000
            this.audioRef.play()
          }).catch(error => {
            console.log(error);
          });
        }
      },50)
    },
    setAudioEl(el) {
      
      this.audioRef = el
    },
    play(){
      this.audioRef.play()
      this.playOrPaused = true
    },
    pause(){
      this.audioRef.pause()
      this.playOrPaused = false
    },
    async getSheetList(item) {

    }
  }
})


export default usePlayStore
