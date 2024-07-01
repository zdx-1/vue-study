<template>
  <div class="songSheet" ref="songSheetRef">
    <songSheetBoutiqueCard :cardInfoSLN="cardInfoSLN" v-if="cardInfo.name" :card-info="cardInfo"></songSheetBoutiqueCard>
    <songSheetLaylistatlist :active="laylistatlistActive" :categorieItems="laylistatlist" @item-click="laylistatlistActiveClick"></songSheetLaylistatlist>
    <songSheetBox :renderSum="30" :is-all="false" @song-sheet-click="songSheetClick"  :song-sheet-list="songSheetList"/>
    <div v-if="isBottom" class="mb-[20px]">
      <my-loading >
        <span>加载中...</span>
      </my-loading>
    </div>
  </div>
</template>

<script setup>
import songSheetLaylistatlist from './cpts/songSheetLaylistatlist.vue'
import songSheetBoutiqueCard from './cpts/songSheetBoutiqueCard.vue'
import { getCatPlaylists, getLaylistatlist, getTopPlayHighquality } from '@/services'
import { ref, toRefs, reactive, watch } from 'vue'
import songSheetBox from '@/components/songSheetBox/songSheetBox.vue'
import { useRouter } from 'vue-router'
import myLoading from '@/components/myLoading.vue'


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
let isBottom = ref(false)
const { scrollTop, componentHeight } = toRefs(props)
const router = useRouter()
const page = reactive({
  limit: 30,
  offset: 0
})
const songSheetList = ref([])
const songSheetRef = ref()
const laylistatlist = ref({})
const cardInfo = ref({})
const laylistatlistActive = ref('全部')
const getLaylistatlistData = async () => {
  const res = await getLaylistatlist()
  if (res.code == 200) {
    const obj = {}
    for (const key in res.categories) {
      const arr = res.sub.filter(item => item.category == key)
      obj[key] = arr
    }
    laylistatlist.value.name = res.categories
    laylistatlist.value.list = obj
    laylistatlist.value.hot = res.sub.filter(item => item.hot)
  }
  
}
getLaylistatlistData()
const laylistatlistActiveClick = val => {
  songSheetList.value = []
  laylistatlistActive.value = val
  page.limit = 30
  page.offset = 0
  getCatPlaylistsData()
  getTopPlayHighqualityData()
}
const getCatPlaylistsData = async () => {
  const res = await getCatPlaylists({
    cat: laylistatlistActive.value,
    limit: page.limit,
    offset: page.limit * page.offset
  })
  if (res.code == 200) {
    songSheetList.value = [...songSheetList.value ,...res.playlists]
    isBottom.value = false
  }
}
getCatPlaylistsData()

const cardInfoSLN = ref(true)
const getTopPlayHighqualityData = async () => {
  cardInfoSLN.value = true
  const res = await getTopPlayHighquality(laylistatlistActive.value)
  cardInfo.value = res.playlists[0] ? res.playlists[0] : {}
  cardInfoSLN.value = false
}
getTopPlayHighqualityData()

const songSheetClick = (item) => {
  router.push(`/songSheet?id=${item.id}`)
}

watch(scrollTop, n => {
  const height = songSheetRef.value?.clientHeight
  if (!isBottom.value && componentHeight.value + n + 10 > height) {
    isBottom.value = true
    page.offset++ 
    getCatPlaylistsData()
  }
})
</script>

<style scoped lang="less">

</style>