<template>
      <myCollectionSearch :items="albumSublistData" :placeholder="'搜索收藏的专辑'">
      <template #title>
        <div class="flex items-center font-black">
          <h2>收藏的专辑</h2>
          <span v-if="albumSublistData.length" class="text-xs  dark:text-white/50 text-black/50"> ({{ albumSublistData.length }})</span>
        </div>
      </template>

      <template v-slot="{ items }">
        <myLoading v-if="loading" class="mt-[10px] w-[100%]">
            <span>加载中...</span>
        </myLoading>
        <song-list :items="items" :item-hieght="80" item-kye="id" v-if="items.length">
          <template #="{ item,index }">
            <div class="item flex items-center px-[5px] py-[10px] pr-[16px] box-border justify-between" @click="itemClick(item)">
              <div class="left flex flex-1 items-center">
                <div class="imgBox">
                  <my-image class="img" :url="item.picUrl" :title="item.name" :alt="item.name" />
                </div>
                <div class="name">
                  {{ item.name }}
                </div>
              </div>
              <div class="right flex flex-1 items-center justify-between text-xs dark:text-white/50 text-black/50">
                <div class="flex-1">
                  <span v-for="artistsInfo in item.artists">
                    {{ artistsInfo.name }}
                  </span>
                </div>
                <div class="flex-1">
                  {{ item.size }} 首
                </div>
              </div>
            </div>
          </template>
        </song-list>
      </template>
    </myCollectionSearch>
</template>

<script setup>
import myCollectionSearch from './myCollectionSearch.vue';
import songList from '@/components/songList.vue';
import { getDigitalAlbumPurchased, getAlbumSublist, getVideoSub, getTopicSublist, getArtistSublist } from '@/services'
import { ref, toRefs, defineAsyncComponent, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import myLoading from '@/components/myLoading.vue'

const loading = ref(true)
const router = useRouter()
const albumSublistData = ref([])
const getAlbumSublistData = async () => {
  const res = await getAlbumSublist()
  loading.value = false
  if (res.data && res.data.length) {
    res.data.forEach(item =>{
      item.isShow = true
    })
    albumSublistData.value = res.data
  }
  
  
}
getAlbumSublistData()

const itemClick = item => {
  // router.push(`/artistInfo?id=${item.id}`)
  router.push(`/songalbum?id=${item.id}`)
}
</script>

<style scoped lang="less">
  .item{

    .right{
      .singer{
        display: flex;
        .name::after{
          content: ' / ';
        }
        .name:last-child::after{
          content: '';
        }
      }
    }
    .imgBox{
      width: 60px;
      height: 60px;
      margin-right: 10px;
      overflow: hidden;
      .img{
        width: 100%;
        height: 100%;
      }
    }

  :deep(.vue-recycle-scroller__item-view){
    cursor: pointer;
    &:hover{
      background: var(--hsla-01) !important;
    }
    &:nth-child(odd){
        background-color: hsla(0, 0%, 100%, 0.04);
      }
  }
}
</style>