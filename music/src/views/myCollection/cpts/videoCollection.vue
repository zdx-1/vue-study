<template>
  <div>
    <myCollectionSearch :items="videoCollectionData" :placeholder="'搜索我收藏的视频'">
      <template #title>
        <div class="flex items-center font-black">
          <h2>收藏的视频</h2>
          <span v-if="videoCollectionData.length" class="text-xs  dark:text-white/50 text-black/50"> ({{ videoCollectionData.length }})</span>
        </div>
      </template>

      <template v-slot="{ items }">
        <div class="videoList flex flex-wrap">
          <myLoading v-if="loading" class="mt-[10px] w-[100%]">
            <span>加载中...</span>
          </myLoading>
          <template v-for="(item, index) in items">
            <videoItem
              class="w-[25%] videoItem"
              :img-src="item.coverUrl" 
              :title="item.title" 
              :name="item.creator[0]?.userName" 
              :id="item.vid" 
              :item="item" 
              :index="index"
              @videoItemClick="videoItemClick"
            />
          </template>
        </div>
      </template>
    </myCollectionSearch>


  </div>
</template>

<script setup>
import myCollectionSearch from './myCollectionSearch.vue';
import videoItem from '@/components/video/videoItem.vue'
import { getDigitalAlbumPurchased, getAlbumSublist, getMvSublist, getTopicSublist, getArtistSublist } from '@/services'
import { ref, toRefs, defineAsyncComponent, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import myLoading from '@/components/myLoading.vue'

const router = useRouter()
const videoCollectionData = ref([])
const loading = ref(true)
const getMvSublistData = async () => {
  const res = await getMvSublist()
  loading.value = false
  videoCollectionData.value = res.data
}
getMvSublistData()

const videoItemClick = id => {
  router.push(`/videoDetails?id=${id}&mode=video`)
}
</script>