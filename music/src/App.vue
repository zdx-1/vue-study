<template>
  <div ref="app">
    <audio ref="audioRef" :src="playUrl" id="eventAudio" ></audio>
    <div class="home min-w-[1240px]" ref="el">
      <router-view name="myHeader" class="header" />
      <el-container>
        <el-container :style="{height: `calc(100vh - 70px - ${pageHeight})`}">
          <router-view name="myAside" class="aside"/>
          <el-main class="main"  >
            <div ref="mainRef" class="h-[100%]" style="overflow-y: auto; padding: 0px 60px 0 60px; box-sizing: border-box;">
              <router-view />
            </div>
            
            <div v-if="cnptisn" v-show="!footerState" class="fold text-[16px] absolute bottom-[40px] right-[20px] cursor-pointer">
              <el-image @click="clickFold" class="h-[20px] w-[20px]" :src="getAssetsFile('plays/fold.png')"></el-image>
            </div>
          </el-main>
        </el-container>
      </el-container>
      <router-view name="myFooter" />
    </div>
  </div>
</template>

<script setup>
import { getAssetsFile } from '@/utils'
import usePlayStore from '@/stores/modules/play'
import usePageStore from '@/stores/modules/page'
import { toRefs, ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import { useScroll } from '@vueuse/core'
import { getLoginStatus, getRegisterAnonimous } from '@/services'

const app = ref()
const pageStore = usePageStore()
const { pageHeight, footerState } = toRefs(pageStore)
const clickFold = () => {
  pageStore.footerState = !pageStore.footerState
  pageStore.pageHeight = pageStore.footerState ? '80px' : '0px'
} 
const userStore = useUserStore()

const mainRef = ref()
const { x, y, arrivedState } = useScroll(mainRef)
console.log(arrivedState);
watch( arrivedState, n => {
  pageStore.arrivedState = n
})

const route = useRoute()
const scrollbarRef = ref()
const playStore = usePlayStore()
const audioRef = ref()
const { playUrl } = toRefs(playStore)

const RegisterAnonimous = async () => {
  const res = await getRegisterAnonimous()
  console.log(res);
}
let cookie = localStorage.getItem('cookie')
if (cookie) {
  userStore.initUserAllInfo()
  userStore.loginStatus = true
} else {
  console.log("RegisterAnonimous");
  RegisterAnonimous()
}


// const isLS = async () => {
//   const res = await getLoginStatus()
//   if (res.data?.account?.type == 1 || res.data?.profile) {
//     userStore.initUserAllInfo()
//     userStore.loginStatus = true
//   }
// }
// isLS()

onMounted(() => {
  if (localStorage.getItem('audioVolume')) {
    audioRef.value.volume = localStorage.getItem('audioVolume') / 100
  }
  
  playStore.setAudioEl(audioRef.value)

})
const isn = ['VIDEODETAILS']
watch(route, (n) => {
  if(!route.name) return true
  if (isn.includes(n.name.toUpperCase()) && footerState.value) {
    pageStore.pageHeight = '0px'
  } else if(footerState.value) {
    pageStore.pageHeight = '80px'
  }else if(!footerState.value) {
    pageStore.pageHeight = '0px'
  }
  y.value = 0
})

const cnptisn = computed(() => {
  if(!route.name) return true
  return !isn.includes(route.name.toUpperCase())
})


</script>

<style scoped lang="less">
.home{
  height: 100vh;
  width: 100vw;
  .header{
    height: 70px;
    background: var(--head-bgd);
    padding: 0;
    box-sizing: unset;
  }
  .main{
    margin: 0 auto;
    padding: 0 !important;
  }
  // .aside{
  //   height: calc(100vh - v-bind(pageHeight));
  // }

  .footer{
    height: 80px;border-top: 1px solid var(--border-right-wyy);
  }
}
@media  screen and (min-width: 1981px) {
 .home .main {
    width: calc(100vw - 640px);
  }
}

:deep(.el-footer){
  padding: 0  !important;
}
.fold{
  transform: rotate(90deg);
}


</style>
