<template>
  <div class="songList">
    <song-list :items="items" :item-hieght="80" item-kye="resourceId">
      <template #="{ item,index }">
        <div class="item flex items-center px-[5px] py-[10px] box-border justify-between" @click="itemClick(item.data)">
          <div class="flex flex-1 items-center">
            <div class="w-[30px] ml-[10px] dark:text-white/50 text-black/80 text-xs">
                {{ index + 1 < 10 ? '0' + (index + 1) : index + 1  }}
            </div>
            <div class=" w-[60px] h-[60px] mr-[10px] overflow-hidden">
              <!-- <img class="img" v-lazy="{ src: item.data?.al?.picUrl, delay: 500 }" :title="item.data?.name" :alt="item.data?.name" /> -->
              <my-image class="w-[100%] h-[100%]" :url="item.data?.al?.picUrl" :title="item.data?.name" :alt="item.data?.name" />
                  
              <!-- <el-image loading="lazy" lazy class="img" :src="item.data?.al?.picUrl" fit="fill" :title="item.data?.name" :alt="item.data?.name"></el-image> -->
            </div>
            <div class="name">
              {{ item.data?.name }}
            </div>
          </div>
          <div class=" flex justify-between items-center text-xs flex-1 dark:text-white/50 text-black/80">
            <div class="singer flex-1 flex">
              <template v-for="info in item.data?.ar">
                <div class="name">
                  {{ info.name }}
                </div>
              </template>
            </div>
            <div class="playTime flex-1">
              <!-- {{ dayjs(item.playTime).format('YYYY.MM.DD') }} -->
              {{ playTime(item.playTime) }}
            </div>
          </div>
        </div>
      </template>
    </song-list>
  </div>
</template>

<script setup>
import { dayjs } from 'element-plus'
import { getVideoGroupList, getVideoCategoryList } from '@/services'
import { useRoute, useRouter } from 'vue-router'
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'
import songList from '@/components/songList.vue';
import usePlayStore from '@/stores/modules/play'
import { getAssetsFile } from '@/utils'
const playStore = usePlayStore()
const props = defineProps({
  items: {
    type: Array,
    default: () => ([])
  },
  pageCount: {
    type: Number,
    default: () => (0)
  },
})
const { items } = toRefs(props)
const itemClick = (item) => {
  const newPlayList = playStore.playList.filter(data => item.id != data.id)
  playStore.playList = [...newPlayList, item]
  playStore.playIndex = newPlayList.length
  playStore.getPlayUrl(item)
}
const playTime = time => {
  return dayjs(time).format('YYYY.MM.DD HH.mm.ss')
}
</script>

<style scoped lang="less">
.singer{
  .name::after{
    content: ' / ';
  }
  .name:last-child::after{
    content: '';
  }
}

:deep(.vue-recycle-scroller__item-view){
  cursor: pointer;
  &:hover{
    background: var(--vue-recycle-scroller__item-view-hover) !important;
  }
  &:nth-child(odd){
      background-color: var(--vue-recycle-scroller__item-view-nth-child);
    }
}
</style>