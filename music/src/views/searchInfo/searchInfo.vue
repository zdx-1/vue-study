<template>
  <div class="searchInfo">
    <h2>
      搜索：{{serachStr}}
    </h2>
    <tabr :active="tabActive" @item-click="tabItemClick"></tabr>
    <div class="content">
      <component :pageCount="pageCount" :items="songs" :is="cpt"/>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch, defineAsyncComponent, markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSearchDefault, getSearchHotDetail, getSearchSuggest, getCloudsearch, getAllPlaylistDetail } from '@/services'
import tabr from './cpts/tabr.vue'

import useUserStore from '@/stores/modules/user'
import usePlayStore from '@/stores/modules/play'


const components = import.meta.glob('./cpts/*Box.vue')
const cpt = ref(null)
cpt.value = markRaw(defineAsyncComponent(components[`./cpts/songsBox.vue`]))

const playStore = usePlayStore()
const userStore = useUserStore()
// const {  } = toRefs()

const route = useRoute()
const router = useRouter()
const serachStr = ref(route.query.search)
const tabActive = ref('1')
const pageCount= ref(0)
const songs = ref([])
const getCloudsearchData = async () => {
  const res = await getCloudsearch(serachStr.value, tabActive.value)
  switch (tabActive.value) {
    case "1":
      songs.value = res.result.songs
      pageCount.value = res.result.songCount
      break;
    case "1000":
      songs.value = res.result.playlists
      pageCount.value = res.result.playlistCount
      break;

    case "100":
      songs.value = res.result.artists
      pageCount.value = res.result.artistCount
      break;
    case "10":
      songs.value = res.result.albums
      pageCount.value = res.result.albumCount
      console.log(res,'10');
      break;
  
    default:
      break;
  }
}
if (serachStr.value) {
  getCloudsearchData()
}


watch(route, n => {
  if (n && n.query.search) {
    serachStr.value = n.query.search
    tabActive.value = '1'
    getCloudsearchData()
  } else {
    console.log(n);
    if (n.name == 'searchinfo') {
      router.replace('/index')
    }
    
  }
}, {
  deep: true,
  immediate: true
})

const tabItemClick = item => {
  songs.value = []
  pageCount.value = 0
  const link = components[`./cpts/${item.key}Box.vue`]
  cpt.value = markRaw(defineAsyncComponent(link))
  tabActive.value = item.id
  getCloudsearchData()
}

</script>

<style scoped lang="less">
  .searchInfo{
    margin-top: 10px;
  }
  .content{
    margin: 20px 0;
  }
</style>