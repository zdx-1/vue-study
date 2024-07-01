<template>
  <div class="searchBox">
      <el-popover
        :width="400"
        trigger="click"
        placement="bottom"
        :show-arrow="false"
        popper-class="popover"
        :teleported="false"
        :hide-after="50"
        :visible="visible"
      >
        <template #reference>
          <el-input ref="serachRef" @change="searchChange" @blur="searchBlur" @focus="searchFocus" :prefix-icon="Search" @input="searchInputVal" class="search" v-model="searchInput" :placeholder="searchDefaultData.showKeyword" />
        </template>
        <template #default>
            <el-scrollbar ref="scrollbar" max-height="400px" class="songList" >
          
              <defaultBox @hot-item-click="hotItemClick" v-show="searchInputVal == '' || !Object.keys(searchSuggestData).length" :searchNamesData="searchNamesData"></defaultBox>
            
              <result @itemClick="resultItemClick" v-show="searchInputVal && Object.keys(searchSuggestData).length" :searchSuggestData="searchSuggestData"></result>
     
            </el-scrollbar>
        </template>
      </el-popover>
  </div>
</template>

<script setup>
import { throttle, debounce } from 'underscore'
import {
  Search,
} from '@element-plus/icons-vue'

import { ref, toRefs, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSearchDefault, getSearchHotDetail, getSearchSuggest, getCloudsearch, getAllPlaylistDetail } from '@/services'
import useUserStore from '@/stores/modules/user'
import usePlayStore from '@/stores/modules/play'
import defaultBox from './cpts/default.vue'
import result from './cpts/result.vue'

const searchNamesData = ref([])
let searchNames = localStorage.getItem('searchNames')
if (searchNames) {
  searchNamesData.value = searchNames
}
const playStore = usePlayStore()
const userStore = useUserStore()
const {  } = toRefs(userStore)


const searchInput = ref('')
const scrollbar = ref()
const serachRef = ref()
const visible = ref(false)

const route = useRoute()
const router = useRouter()

const searchDefaultData = ref({})
const getSearchDefaultData = async () => {
  const res = await getSearchDefault()
  searchDefaultData.value = res.data
}
getSearchDefaultData()

let time;
const searchSuggestData = ref({})
const getSearchSuggestData = async (val) => {
  if(!searchInput.value) return
  const resList = await Promise.all([getCloudsearch(searchInput.value), getSearchSuggest(searchInput.value)])
  const guessList = resList[0].result.songs
  // searchSuggestData.value = { guessList, ...resList[1].result }
  searchSuggestData.value = {  ...resList[1].result }

}
const searchInputVal = val => {
  if (val.trim()) {
    clearTimeout(time)
    time = null
    time = setTimeout(() => {
      getSearchSuggestData()
    }, 400)
  }else{
    searchSuggestData.value = {}
  }
  
}
const searchBlur = () => {
  visible.value = false
  if (!searchInput.value) {
    searchSuggestData.value = {}
  }
  
}
const searchFocus = () => {
  visible.value = true
}

const resultItemClick = async (item, key) => {
  console.log(item, key);
  switch (key) {
    case 'playlists':
      router.push(`/songSheet?id=${item.id}`)
      break;
    case 'artists':
    router.push(`/artistInfo?id=${item.id}`)
      break;
    case 'songs':
      const res = await getAllPlaylistDetail(item.id)
      const newPlayList = playStore.playList.filter(data => item.id != data.id)
      playStore.playList = [...newPlayList, item]
      playStore.playIndex = newPlayList.length
      playStore.getPlayUrl(res.songs[0])

      break;
  
    default:
      break;
  }
}

const searchChange = e => {
  visible.value = false
  serachRef.value?.blur()
  if (e) {
    router.push(`/searchInfo?search=${searchInput.value}`)
  }
}

const hotItemClick = item => {
  getSearchSuggestData(item.searchWord)
  searchInput.value = item.searchWord
  visible.value = false
  serachRef.value?.blur()
  router.push(`/searchInfo?search=${searchInput.value}`)
}

watch(route, n => {
  if (n && n.path == '/searchInfo' && n.query && n.query.search) {
    const sahStr = n.query.search
    searchInput.value = sahStr
    getSearchSuggestData(sahStr)
  }
})
</script>

<style scoped lang="less">
:deep(.el-popper){
  padding: 0 !important;
}
:deep(.el-input__inner){
  color: #fff;
}

.search{
  border-radius: 24px;
  height: 38px;
  width: 340px;
  background-color: var(--page-bgd);
  
  :deep(.el-input__wrapper){
    border-radius: 24px;
    // box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
    background-color: var(--hsla-01);
    box-shadow: none;
    .el-icon{
      font-size: 20px;
    }
  }
}

  
</style>