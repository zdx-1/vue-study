<template>
  <el-footer v-show="footerState" style="height: 80px;border-top: 1px solid var(--border-right-wyy);">
    <div class="myFooter px-[15px] h-[100%] flex items-center">
      <div class="left h-[100%] w-[30%]">
        
        <el-carousel height="80px" ref="carousel" :initial-index="initialIndex" direction="vertical" :autoplay="false" indicator-position="none"	>
          <el-carousel-item  :key="0">
            <div class="left_box flex items-center h-[100%]">
              <el-image class="w-[54px] h-[54px] cursor-pointer rounded" @click="musicInfoDrawerShow" v-if="PlayingInfo?.al?.picUrl || PlayingInfo.album?.picUrl" :src="PlayingInfo?.al?.picUrl || PlayingInfo.album?.picUrl" fit="fill" :title="PlayingInfo.name" :alt="PlayingInfo.name"></el-image>
              <div class=" min-w-[100px] ml-[10px] text-[14px]">
                <div class="title cursor-pointer">
                  {{ PlayingInfo.name }}
                </div>
                <div class="text-xs dark:text-white/50 text-black/80 cursor-context-menu">
                  <template v-for="item in PlayingInfo.ar ?  PlayingInfo.ar : PlayingInfo?.album?.artists">
                    <span @click="toArtistInfo(item)">
                      {{ item.name }}
                    </span>
                  </template>
                </div>
              </div>
            </div>
          </el-carousel-item>

          <el-carousel-item  :key="1">
            
            <div class="left_box2 flex items-center h-[100%]">
              <div @click="musicInfoDrawerShow">
                <el-icon :size="24" style="cursor: pointer;"><ArrowDown /></el-icon>
              </div>
              <div>

              </div>
            </div>
          </el-carousel-item>
        </el-carousel>

        

      </div>

      <div class="center flex h-[100%] flex-grow items-center justify-center flex-col" :style="{ pointerEvents: PlayingInfo.id ? 'all' : 'none' }">
        <div class="playControl mt-[15px] flex h-[50px] items-center">
          <!-- <el-image @click="musicPrevOrNext('prev')" class="prev" :src="getAssetsFile('plays/play_prev.png')" title="上一首" fit="fill" ></el-image> -->
          <div class="text-3xl cursor-pointer hover:text-[#ec4141]">
            <i class="las la-step-backward"></i>
          </div>
          <!-- <el-image @click="musicPlay" v-show="!playOrPaused" class="resume" :src="getAssetsFile('plays/play_resume.png')" title="播放" fit="fill" ></el-image> -->
          <!-- <el-image @click="musicPause" v-show="playOrPaused" class="pause" :src="getAssetsFile('plays/play_pause.png')" title="暂停" fit="fill" ></el-image> -->
          
          <div class="text-4xl cursor-pointer hover:text-[#ec4141] mx-4 dark:hover:bg-white/20 hover:bg-[rgb(229,229,229)] px-[2px] rounded-3xl" @click="musicPlay" v-show="!playOrPaused">
            <i class="las la-play"></i>
          </div>

          <div class="text-4xl cursor-pointer hover:text-[#ec4141] mx-4 dark:hover:bg-white/20 hover:bg-[rgb(229,229,229)] px-[2px] rounded-3xl" @click="musicPause" v-show="playOrPaused">
            <i class="las la-pause"></i>
          </div>

          <div class="text-3xl cursor-pointer hover:text-[#ec4141]" @click="musicPrevOrNext('next')">
            <i class="las la-step-forward"></i>
          </div>
          <!-- <el-image @click="musicPrevOrNext('next')" class="next" :src="getAssetsFile('plays/play_next.png')" title="下一首" fit="fill" ></el-image> -->
        </div>
        <div class="slider">
          <!-- 进度条 -->
          <span class="text-xs dark:text-white/50 text-black/80">{{ dayjs(currentTime).format('mm:ss') }}</span>
          <el-slider  @input="sliderInput" @change="sliderChange" :min="0" :max="100" v-model="musicProgress" :show-tooltip="false" class="sliderClass" style="width: 95%;"></el-slider>
          <span class="text-xs dark:text-white/50 text-black/80">{{ 
            dayjs(
              PlayingInfo.playTime ? PlayingInfo.playTime : 0
            ).format('mm:ss')}}
          </span>
        </div>
      
      </div>
      <div class="h-[100%] w-[30%] justify-center relative flex items-center">
        <div class="volume">
          <i @click="editVolume(false)" v-show="audioVolume > 0" class="iconfont icon-sound-on"></i>
          <i @click="editVolume(true)" v-show="audioVolume == 0" class="iconfont icon-sound-off"></i>
          <el-slider @input="sliderInputVolume" @change="sliderChangeVolume" :step="0.01" :min="0" :max="1" v-model="audioVolume" :show-tooltip="false" class="sliderClass  volumeSlider"></el-slider>
        </div>
        <el-icon @click="openPlayList"><Expand /></el-icon>

        <div v-if="!musicInfoDrawer || !drawer" class="fold" :style="{transform: footerState ? 'rotate(-90deg)' : 'rotate(90deg)', top: footerState ? '-22px' : '-40px'}">
          <el-image @click="clickFold" class="fold-img" :src="getAssetsFile('plays/fold.png')"></el-image>
        </div>
      </div>

      <el-drawer  v-model="drawer" title="" :with-header="false" :modal="false" :lock-scroll="false" modal-class="modalclass">
        <song-list :drawer="drawer" :playing-info="PlayingInfo" :play-list="playList" @item-click="itemClick"></song-list>
      </el-drawer>
      
      <el-drawer direction="btt" v-model="musicInfoDrawer" :with-header="false" :modal="false" :lock-scroll="false" modal-class="musicInfoModal">
        <el-scrollbar height="calc(100vh - 80px )">
          
          <music-info></music-info>
        </el-scrollbar>
      </el-drawer>
    </div>
  </el-footer>
</template>

<script setup>
import { useRouter } from 'vue-router'
import songList from './cpts/songList.vue'
import musicInfo from './cpts/musicInfo.vue'
import {
  Expand,
  ArrowDown
} from '@element-plus/icons-vue'
import { dayjs } from 'element-plus'
import usePlayStore from '@/stores/modules/play'
import { getAssetsFile } from '@/utils'
import { toRefs, ref, reactive, watch } from 'vue'
import { useDocumentVisibility } from '@vueuse/core'
import usePageStore from '@/stores/modules/page'
const pageStore = usePageStore()
const { pageHeight, footerState } = toRefs(pageStore)
const router = useRouter()
const musicInfoDrawer = ref(false)
const initialIndex = ref(0)
const carousel = ref()
const musicInfoDrawerShow = () => {
  initialIndex.value = initialIndex.value ? 0 : 1
  musicInfoDrawer.value = !musicInfoDrawer.value
  carousel.value?.setActiveItem(initialIndex.value)
}

const playStore = usePlayStore()
const { PlayingInfo, playList, audioRef, playIndex } = toRefs(playStore)
let { playOrPaused } = toRefs(playStore)

const clickFold = () => {
  pageStore.footerState = !pageStore.footerState
  pageStore.pageHeight = pageStore.footerState ? '80px' : '0px'
}
let timeoutVolume;
const audioVolume = ref(1)
if (localStorage.getItem('audioVolume')) {
  audioVolume.value = localStorage.getItem('audioVolume') * 1 * 10
}
const sliderChangeVolume = (val) => {
  audioRef.value.volume = val 
  audioVolume.value = val 
  localStorage.setItem('audioVolume', val)
}
const sliderInputVolume = (val) => {
  if(timeoutVolume) return
  timeoutVolume = setTimeout(() => {
    audioVolume.value = val 
    audioRef.value.volume = val 
    timeoutVolume = null
  }, 0)
}
const editVolume = (type) => {
  if (type) {
    audioRef.value.volume = 1
    audioVolume.value = 1
    localStorage.setItem('audioVolume', 1)
  } else {
    audioRef.value.volume = 0
    audioVolume.value = 0
    localStorage.setItem('audioVolume', 0)
  }
}
const currentTime = ref(0)
const musicProgress = ref(0)

const playSong = (type = false) => {
  if (type) {
    type === 'prev' ? playIndex.value -= 1 : playIndex.value += 1
  } else {
    playStore.playIndex += 1
  }
  
  if (playList.value.length == 1) {
    console.log(1231313);
    playIndex.value = 0
    audioRef.value.currentTime = 0
    console.log(audioRef.value.currentTime)
    audioRef.value.play()
    getCurrentTime()
    return
  }
  if(playIndex.value == playList.value.length) playIndex.value = 0
  if (playIndex.value < 0) playIndex.value = playList.value.length - 1
  
  playStore.getPlayUrl(playList.value[playIndex.value])
}


let interval;
const getCurrentTime = (time = 300) => {
  interval = setInterval(() => {
    const audioCurrentTime = audioRef.value.currentTime
    const musicDt = PlayingInfo.value.playTime
    if (audioCurrentTime) {
      musicProgress.value =( audioCurrentTime / ( musicDt / 1000 )) * 100
      currentTime.value = (audioCurrentTime * 1000) 
      if(Math.trunc(audioCurrentTime) >= Math.trunc(musicDt / 1000)){
        clearInterval(interval)
        interval = null
        playSong()
      }
    }
  }, time)
}

watch(PlayingInfo, (n,v) => {
  if (n && n.id) {
    currentTime.value = 0
    clearInterval(interval)
    interval = null
    getCurrentTime()
  }  
},
  {
    deep: true,
    immediate: true
})

const musicPlay = async () => {
  playStore.play()
  getCurrentTime()
}
const musicPause = async () => {
  clearInterval(interval)
  interval = null
  playStore.pause()
}

const musicPrevOrNext = (type) => {
  currentTime.value = 0
  playSong(type)
}
const sliderChange = (val) => {
  clearInterval(interval)
  interval = null
  currentTime.value = PlayingInfo.value.playTime * val / 100
  musicProgress.value = val
  audioRef.value.currentTime  = (PlayingInfo.value.playTime * val / 100) / 1000
  getCurrentTime()
}
const sliderInput = (val) => {
  clearInterval(interval)
  interval = null
  currentTime.value = PlayingInfo.value.playTime * val / 100
}

const drawer = ref(false)
const openPlayList = () => {
  drawer.value = drawer.value ? false : true
}

const itemClick = (res, index) => {
  clearInterval(interval)
  interval = null
  musicProgress.value = 0
  playStore.playIndex = index
  playStore.getPlayUrl(res)
}

watch(currentTime, n => {
  playStore.playingCurrentTime = n
}, {
  deep: true,
  immediate: true
})

const visibility = useDocumentVisibility()
watch(visibility , n => {
  if (n == 'hidden') {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  } else if(n == 'visible') {
    if (!audioRef.value.paused) getCurrentTime()
  }
}, {
  deep: true
})

const toArtistInfo = item => {
  router.push(`/artistInfo?id=${item.id}`)
  console.log('toArtistInfo', item);
}
</script>

<style scoped lang="less">
.myFooter{
  .center{
    .playControl{
      .prev,.next{
        width: 26px;
        height: 26px;
        cursor: pointer;
      }
      .pause,.resume{
        cursor: pointer;
        padding: 5px;
        margin: 0 15px;
        width: 40px;
        height: 40px;
      }
    }
    .slider{
      flex: 1;
      width: 100%;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      .sliderClass{
        margin: 0 10px;
      }
    }
  }
}

:deep(.el-slider__runway){
  height: 2px;
  background: rgb(229,229,229);
  .el-slider__bar{
    background: rgb(236,65,65);
    height: 2px !important;
    &:hover{
      cursor: pointer;
    }
  }
  .el-slider__button-wrapper{
    &:hover{
      cursor: pointer !important;
    }
    .el-tooltip__trigger{
      &:hover{
      cursor: pointer !important;
    }
    }
  }
  .el-slider__button-wrapper{
    // visibility:hidden;
    display: none;
    height: 33px;
    .el-slider__button{
      width: 12px;
      height: 12px;
      border-color: rgb(236,65,65);
    }
  }
  .el-slider__button-wrapper.hover{
    height: 33px;
    .el-slider__button{
      width: 12px;
      height: 12px;
    }
  }
  &:hover{
    height: 4px;
    .el-slider__bar{
      background: rgb(236,65,65);
      height: 4px !important;
      
    }
    .el-slider__button-wrapper{
      z-index: 999;
      // visibility: visible;
      display: inline-block;
    }
  }
}

:deep(.modalclass){
  z-index: 9999!important;
  position: unset !important;
  .el-drawer{
    box-shadow: 0 0px 1px #888;
  }
  .el-drawer.ltr, .el-drawer.rtl{
    width: 330px !important;
    box-sizing: border-box;
    height: calc(100vh - 80px);
    // background: var(--page-bgd);
    // padding: 0 8px 15px;
  }
  .el-drawer__body{
    padding: 0 !important;
    box-sizing: border-box;
    // background: var(--page-bgd);
  }
  .el-scrollbar{
    height: calc(100vh - 80px - 40px) !important;
  }
}




.volume{
  margin: 0 10px;
  display: flex;
  align-items: center;
  .volumeSlider{
    margin: 0 10px;
    width: 70px;
    &:hover{
      :deep(.el-slider__button){
        width: 8px;
        height: 8px;
      }
    }
  }
}




:deep(.musicInfoModal){
  z-index: 9999;
  position: unset !important;
  
  .el-drawer{
    box-sizing: border-box;
    height: calc(100vh - 80px) !important;
    // background-color: rgba(30, 30, 30, 1);
    box-shadow: 0 0px 1px #888;
    // padding: 0 8px 15px;
  }
  .el-drawer.btt{
    bottom: 80px !important;
  }
  .el-drawer__body{
    padding: 0 !important;
  }
}

:deep(.el-slider__button-wrapper){
  width: auto !important;
}

.fold{
  
  font-size: 16px;
  position: absolute;
  top: -10px;
  right: 0;
  cursor: pointer;
  .fold-img{
    height: 20px;
    width: 20px;
  }
}
</style>