<template>
  <div class="latestMusic" ref="latestMusic">
    <div class="topBox relative left-2/4 inline-flex h-[24px] mb-[10px] text-xs items-center overflow-hidden my-0 mx-auto">
      <div v-for="item in latestMusicTabBoxMock" class="item h-[24px] items-center box-border flex cursor-pointer px-[20px]" :class="{ active: topActive ==  item.key }" @click="topItemClick(item)">
        {{ item.title }}
      </div>
    </div>
    <div class="content">
      <latestMusicContentTab style="margin-bottom: 10px;" :tab-data="tabData" :tab-active="tabActive" @tab-click="tabClick">
        <div class="newSong" v-show="topActive == 'latestMusicContentTabMock'">
          <el-button round style="background-color: var(--purple-primary);" @click="playAllMusic">
            <el-image class=" w-[16px] mr-[2px] h-[16px]" :src="getAssetsFile('plays/play_resume.png')" title="播放" fit="fill" ></el-image>
            播放全部
          </el-button>
          <el-button round style="color: black;">收藏全部</el-button>
        </div>
        <div class="newDisc text-xs" v-show="topActive == 'newDiscContentTabMock'">
          <div class="right" :class="{ active: newDiscTabActive ==  'new' }" @click="newDiscRightTabClick('new')">全部</div>
          <span>|</span>
          <div class="left" :class="{ active: newDiscTabActive ==  'hot' }" @click="newDiscRightTabClick('hot')">推荐</div>
        </div>
      </latestMusicContentTab>

      <div>
        <latestMusicContentList  v-show="topActive == 'latestMusicContentTabMock'" :items="latestMusicData" @item-click="latestMusicItemClick"/>
        <!-- <newDiscvContentList  v-show="topActive == 'newDiscContentTabMock'" :grid-items="newDiscvData" @item-click="latestMusicItemClick" /> -->
        <template  v-for="(value,key,index) in yearMonthTopAlbumData">
          <newDiscvContentList @splic-ok="splicOk" :gridItemsIndex="index" :gridItemsLength="Object.keys(yearMonthTopAlbumData).length" v-show="topActive == 'newDiscContentTabMock'" :title="key" :grid-items="value" @item-click="latestMusicItemClick" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAssetsFile } from '@/utils'
import { latestMusicTabBoxMock, latestMusicContentTabMock, newDiscContentTabMock } from '@/mock'
import latestMusicContentTab from './cpts/latestMusicContentTab.vue'
import latestMusicContentList from './cpts/latestMusicContentList.vue'
import newDiscvContentList from './cpts/newDiscvContentList.vue'
import { getNewTopSong, getTopAlbum } from '@/services'
import { ref, toRefs, watch, reactive } from 'vue';
import { useRouter } from 'vue-router'
import usePlayStore from '@/stores/modules/play'
import { dayjs } from 'element-plus'


const props = defineProps({
  scrollTop: {
    type: Number,
    default: () => (0)
  },
  componentHeight: {
    type: Number,
    default: () => (0)
  }
})
let falg = true
const latestMusic = ref()
const splic = ref(0)
const { scrollTop, componentHeight } = toRefs(props)
const dateArr = (dayjs().format('YYYY-MM')).split('-')
const DataS = {
  year: dateArr[0],
  month: dateArr[1]
}

const playStore = usePlayStore()
const tabMock = {
  latestMusicContentTabMock,
  newDiscContentTabMock
}
const topActive = ref("latestMusicContentTabMock")
const allData = ref({})
// const topActive = ref("newDiscContentTabMock")
const tabActive = ref('0')
const newDiscTabActive = ref('new')
const tabData = ref(tabMock[topActive.value])
console.log('date', );
const latestMusicData = ref([])
const newDiscvData = ref([])
const page = reactive({
  offset: 0,
  limit: 30
})

let sum = 0
const getNewTopSongData = async (type) => {
  latestMusicData.value = [] 
  const res = await getNewTopSong(type)
  if (res.code == 200) {
    latestMusicData.value = res.data
  }
}
getNewTopSongData(tabActive.value)

const yearMonthTopAlbumData = ref({})
const getTopAlbumData = async () => {
  const res = await getTopAlbum({
    type: newDiscTabActive.value,
    area: tabActive.value,
    ...DataS,
    ...page

  })
  if (res.code == 200) {
    const data = res.monthData && res.monthData.length ? res.monthData : res.weekData
    if (!res.monthData.length) {
      // yearMonthTopAlbumData.value[`${DataS["year"]}-${DataS["month"]}`] = []
      let date = (dayjs().add(-1, 'month').startOf('month').format('YYYY-MM')).split('-')
      DataS["year"] = date[0]
      DataS["month"] = date[1]
      getTopAlbumData()
    } else {
      sum = 0
      allData.value[`${DataS["year"]}-${DataS["month"]}`] = res.monthData
      yearMonthTopAlbumData.value[`${DataS["year"]}-${DataS["month"]}`] = res.monthData.slice(sum, sum + 30)
      sum += 30
      setTimeout(() => {
        falg = true
      }, 1000)
    }
  }
}


const topItemClick = item => {
  if (item.key == 'latestMusicContentTabMock') {
    tabActive.value = '0'
    getNewTopSongData(tabActive.value)
  }
  if (item.key == 'newDiscContentTabMock') {
    tabActive.value = 'ALL'
    yearMonthTopAlbumData.value = {}
    DataS["year"] = (dayjs().format('YYYY-MM')).split('-')[0]
    DataS["month"] = (dayjs().format('YYYY-MM')).split('-')[1]
    getTopAlbumData()
  }
  topActive.value = item.key
  
  tabData.value = tabMock[item.key]
}

const playAllMusic = () => {
  playStore.playIndex = 0
  playStore.playList = latestMusicData.value
  playStore.getPlayUrl(latestMusicData.value[0])
}

const tabClick = item => {
  tabActive.value = item.key
  if (topActive.value == 'latestMusicContentTabMock') {
    getNewTopSongData(tabActive.value)
  }
  if (topActive.value == 'newDiscContentTabMock') {
    DataS["year"] = (dayjs().format('YYYY-MM')).split('-')[0]
    DataS["month"] = (dayjs().format('YYYY-MM')).split('-')[1]
    yearMonthTopAlbumData.value = {}
    getTopAlbumData()
  }
 
}
const newDiscRightTabClick = key => {
  newDiscTabActive.value = key
  getTopAlbumData()
}

const latestMusicItemClick = (item, index) => {
  const newPlayList = playStore.playList.filter(data => item.id != data.id)
  playStore.playList = [...newPlayList, item]
  playStore.playIndex = newPlayList.length
  playStore.getPlayUrl(item)
}


watch(scrollTop, (n) => { 
  const height = latestMusic.value?.clientHeight
  if (falg && componentHeight.value + n + 10 > height) {
    falg = false
    console.log('bottom');
    if (!allData.value[`${DataS["year"]}-${DataS["month"]}`].slice(sum, sum + 30).length) {
      sum = 0
      let date = (dayjs().add(-1, 'month').startOf('month').format('YYYY-MM')).split('-')
      DataS["year"] = date[0]
      DataS["month"] = date[1]
      getTopAlbumData()
    } else {
      yearMonthTopAlbumData.value[`${DataS["year"]}-${DataS["month"]}`].push(...allData.value[`${DataS["year"]}-${DataS["month"]}`].slice(sum, sum + 30))
      falg = true
      console.log(yearMonthTopAlbumData.value[`${DataS["year"]}-${DataS["month"]}`]);
      sum += 30
    }
  }
}, {
  deep: true,
  immediate: true
})
const splicOk = (type = true) => {

}
</script>

<style scoped lang="less">
.topBox{
  border-radius: 12px;
  border: 1px solid var(--rgda-255-005);
  transform: translateX(-50%);
  .item{
    border: 1px solid var(--rgda-255-005);
    border-radius: 12px;
    &:not(.active):hover{
      background: var(--hsla-01);
    }
    
  }
  .active{
    background:  var(--purple-primary);
  }
}

.newSong{
  :deep(.el-button.is-round ){
    padding: 0;
    padding: 2px 14px;
  }
  :deep(.el-button ){
    font-size: 12px;
    border: 1px solid var(--rgda-255-005);
    height: 24px;
    line-height: 24px;  
    color: var(--el-button-color);

  }
}

.newDisc{
  display: flex;
  .left,.right{
    cursor: pointer;
    border-radius: 10px;
    padding: 2px 14px;
    margin: 0 6px;
  }
  .active{
    background-color:  var(--purple-primary);
  }
}

.resume{
  width: 16px;
  margin-right: 2px;
  height: 16px;
}
</style>