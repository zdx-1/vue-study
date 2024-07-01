<template>
  <div class="my-[30px] px-[15px] box-border">
    <div class="contentBox flex mb-[10px]">
      <el-image class="img w-[200px] mr-[10px]" style="height: 200px;"  :src="playItem.coverImgUrl" fit="fill"></el-image>
      <div class="list flex-1 flex flex-col">
        <div class="item p-[5px] box-border flex h-[40px] items-center cursor-pointer" v-for="(item, index) in playItem?.tracks.slice(0, 5)" @click="itemClick(item, index)">
          <div class="left flex-1 flex">
            <span class="index" :class="{ 'text-red-500': index < 3,}">
              {{ index + 1 }}
            </span>
            <div class="musicName text-sm ml-[5px]" >
              {{ item.name }}
            </div>
          </div>
          <div class="right text-xs">
            <template v-for="info in item.ar">
              <span class="name">
                {{ info.name }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="openAll flex items-center ml-[210px] text-xs" >
      <span @click="songSheetClick" style="cursor: pointer;">查看全部<el-icon><ArrowRight /></el-icon></span>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowRight
} from '@element-plus/icons-vue'
import { toRefs } from 'vue'
import usePlayStore from '@/stores/modules/play'

const playStore = usePlayStore()
const props = defineProps({
  playItem: {
    type: Object,
    default: ()=> {}
  }
})
const { playItem } = toRefs(props)
const emits = defineEmits(['songSheetClick'])
const songSheetClick = () => {
  emits('songSheetClick', props.playItem)
}
const itemClick = (item, index) => {
  playStore.playList = playItem.value?.tracks
  playStore.playIndex = index
  playStore.getPlayUrl(item)
}
</script>

<style scoped lang="less">
.right{
  // font-size: 12px;
  .name:first-child::after{
    content: '';
  }
  .name:last-child::after{
    content: '';
  }
  .name::after{
    content: ' / ';
  }
}

.item{
  cursor: pointer;
  &:hover{
    background: var(--vue-recycle-scroller__item-view-hover) !important;
  }
  &:nth-child(odd){
      background-color: var(--vue-recycle-scroller__item-view-nth-child);
    }
}
</style>