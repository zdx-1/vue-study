<template>
  <div style="">
    <h2>官方榜</h2>
    <officialChartsSkleton :loading="!officialTopSheetPlaylist.length">
      <template v-for="item in officialTopSheetPlaylist">
        <official-top-sheet-play :play-item="item" @song-sheet-click="songSheetClick" />
      </template>
    </officialChartsSkleton>
  </div>
</template>

<script setup>
import officialChartsSkleton from '../skeletonCpts/officialChartsSkleton.vue'
import officialTopSheetPlay from './officialTopSheetPlay.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  officialTopSheetPlaylist: {
    type: Array,
    default: ()=> []
  }
})

const songSheetClick = (item) => {
  router.push(`/songSheet?id=${item.id}`)
}
</script>