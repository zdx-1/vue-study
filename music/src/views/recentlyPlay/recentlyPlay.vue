
<template>
  <div class="pt-[20px]">
    <div class="flex mb-[20px] justify-between items-center">
      <div class="flex items-baseline">
        <h2>
          最近播放
        </h2>
        <span class="pl-[10px] dark:text-white/50 text-black/80">
          共 {{ recordRecentSongListData.length ? recordRecentSongListData.length : 0 }} 首
        </span>
      </div>

      <div class="items-baseline cursor-pointer">清空列表</div>
    </div>

    <div>
      <song-list :items="recordRecentSongListData"></song-list>
    </div>
  </div>
</template>

<script setup>
import { getRecordRecentSongList } from '@/services'
import { useRoute, useRouter } from 'vue-router'
import { ref} from 'vue'

import songList from './cpts/songList.vue';
const recordRecentSongListData = ref([])
const getRecordRecentSongListData = async () => {
  const res = await getRecordRecentSongList()
  recordRecentSongListData.value = res.data?.list
}
getRecordRecentSongListData()
</script>

<style scoped lang="less">

</style>