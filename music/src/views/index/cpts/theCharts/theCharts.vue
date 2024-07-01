<template>
  <div class="theCharts">
    <officialCharts :officialTopSheetPlaylist="officialTopSheetPlaylist" />
    <songSheetBox :renderSum="10" :is-all="false" @song-sheet-click="songSheetClick" title="全球榜" :song-sheet-list="globalPlaylist"/>

  </div>
</template>

<script setup>
import officialCharts from './cpts/officialCharts.vue'

import { getAllDetail, getPlaylistDetail } from '@/services'
import { ref, watch } from 'vue'
import songSheetBox from '@/components/songSheetBox/songSheetBox.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const allDetailInfo = ref({})
const globalPlaylist = ref([])
const officialTopSheetPlaylist = ref([])
const getAllDetailData = async () => {
  const res = await getAllDetail()
  allDetailInfo.value = res
}
getAllDetailData()
const promiseArr = []
const topSheetIds = [19723756,3779629,2884035,3778678]
for (let i = 0; i < topSheetIds.length; i++) {
  const id = topSheetIds[i];
  promiseArr.push(getPlaylistDetail(id))
}
Promise.all(promiseArr).then((values) => {
  const playlist = values.map(item => item.playlist)
  officialTopSheetPlaylist.value = playlist
});

const songSheetClick = (item) => {
  console.log(item);
  router.push(`/songSheet?id=${item.id}`)
}

watch(allDetailInfo, n => {
  if (n.list && n.list.length) {
    globalPlaylist.value = n.list.slice(4, n.list.length)
  }
})
</script>

<style scoped lang="less">

</style>