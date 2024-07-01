<template>
  <div class="artistInfo">
    <artist-info-header :info="albumsHeaderInfo"></artist-info-header>

    <tabr :tabs="artistTabsMock" :active="activeName" @item-click="tabClick" class="sticky top-[0px] right-0 left-0"/>

    <div class="mt-3">
      <component :artistsDesc="artistsDesc" :simiArtists="simiArtists" :items="albums" :is="cpt"></component>
    </div>
    
  </div>
</template>

<script setup>
import tabr from '@/views/video/cpts/tabr.vue'
import { getArtistsTopSong, getArtistsDesc, getArtistsAlbum, getSimiArtists } from "@/services"
import { ref, toRefs, markRaw, defineAsyncComponent , reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import artistInfoHeader from './cpts/artistInfoHeader.vue'
import { artistTabsMock } from '@/mock'


const route = useRoute()
let id = route?.query?.id


const activeName = ref('albumInfo')
const tabIndex = ref(0)
const tabClick = item => {
  const index = artistTabsMock.findIndex(itemss => itemss.name == item.name)
  if(index == tabIndex.value) return
  tabIndex.value = index
  const name = artistTabsMock[tabIndex.value].id
  activeName.value = name
  cpt.value = markRaw(defineAsyncComponent(components[`./cpts/${name}.vue`]))
}
const components = import.meta.glob('./cpts/*.vue')
const cpt = ref(null)
cpt.value = markRaw(defineAsyncComponent(components[`./cpts/${artistTabsMock[tabIndex.value].id}.vue`]))


const getArtistsTopSongData = async () => {
  const res = await getArtistsTopSong(id)
  console.log('getArtistsTopSongData', res);
}
getArtistsTopSongData()


const albums = ref([])
const albumsHeaderInfo = ref({})
const albumsPage = reactive({
  limit: 100,
  offset: 0
})
const getArtistsAlbumData = async () => {
  const res = await getArtistsAlbum({
    id,
    ...albumsPage
  })
  albums.value = res.hotAlbums
  albumsHeaderInfo.value = res.artist
  console.log('getArtistsAlbumData', res);
}
getArtistsAlbumData()


const simiArtists = ref([])
const getSimiArtistsData = async () => {
  const res = await getSimiArtists(id)
  if (res.code == 200) {
    simiArtists.value = res.artists
  }
}
getSimiArtistsData()

const artistsDesc = ref({})
const getArtistsDescData = async () => {
  const res = await getArtistsDesc(id)
  if (res.code == 200) {
    res.introduction = res.introduction.map(item => {
      item.txt = (item.txt.replace(/\n/g, '<brT>')).split('<brT>')
      return item
    })
    artistsDesc.value = res
  }
  console.log('getArtistsDesc', res);
}
getArtistsDescData()


watch(route, n => {
  const nId = n.query.id
  console.log(n.name == "artistinfo",n);
  if (nId && n.name == "artistinfo") {
    id = nId
    tabIndex.value = "0"
    activeName.value = "albumInfo"
    cpt.value = markRaw(defineAsyncComponent(components[`./cpts/${artistTabsMock[tabIndex.value].id}.vue`]))
    getArtistsAlbumData()
    getSimiArtistsData()
    getArtistsDescData()
  }
})
</script>

<style scoped lang="less">
.artistInfo{
  margin-top: 20px;
}

:deep(.el-tabs__header){
  .el-tabs__item{
    // color: var(--el-button-text-color);
    // color: hsla(0, 0%, 100%, 0.4);
    &:hover{
      // color: hsla(0, 0%, 100%, 0.7);
    }

  }
  .el-tabs__active-bar{
    background-color: #fff;
  }
  .el-tabs__nav-wrap::after{
    background-color: hsla(0, 0%, 100%, 0.3);
  }
  .is-active{
    // color: hsla(0, 0%, 100%, 0.9);
  }
}
</style>