<template>
  <div class="list">
    <div class="loading" v-show="!items.length">
      <my-loading>
        <span>加载中...</span>
      </my-loading>
    </div>
    <RecycleScroller
      v-if="items.length"
      class="scroller"
      :items="items"
      :item-size="80"
      :buffer="60"
      key-field="id"
      v-slot="{ item,index }"
    >
      <div class="dark:text-[#ccc] text-gray-500 justify-between box-border px-[50x] py-[10px] items-center text-xs flex" @click="itemClick(item, index)">
        <div class="text-[14px] flex-1 flex items-center">
          <div class="w-[40px] text-center">
            <span v-if="PlayingInfo.id != item.id">{{ index + 1 < 10 ? '0' + (index + 1) : index + 1  }}</span>
            <span v-else class="iconfont icon-sound-on text-[red]"></span>
          </div>
          <div class="w-[60px] h-[60px] mr-[10px] overflow-hidden">
            <!-- <img class="img" v-lazy="{ src: item?.album?.picUrl || item.al?.picUrl, delay: 500 }" :title="item.name" :alt="item.name" /> -->
            <my-image class="w-[100%] h-[100%]" :url="item?.album?.picUrl || item.al?.picUrl" :title="item.name" :alt="item.name" />
            <!-- <el-image loading="lazy" lazy  class="img" :src="item?.album?.picUrl || item.al?.picUrl" fit="fill" :title="item.name" :alt="item.name"></el-image> -->
          </div>
          <div class="dark:text-[#fff] text-black">
            <span :class="{ 'text-[red]': PlayingInfo.id == item.id}">{{ item.name }}</span>
            <template v-if="(item.album?.transNames && item.album?.transNames?.length) || (item.alias && item.alias?.length)">
              <span class="dark:text-white/50 text-black/50"  v-if="item.album?.transNames?.length">
                ({{ item.album?.transNames[0] }})
              </span>
              <span  class="dark:text-white/50 text-black/50" v-else-if="item.alias?.length">
                ({{ item.alias[0] }})
              </span>
            </template>
          </div>
        </div>
        <div class="w-[180px]">
          <template v-if="item.album?.artists?.length" v-for="(info, infoIndex) in item.album?.artists">
            <span class="">
              {{ info.name }}
            </span>
          </template>
          <template v-else-if="item.ar?.length" v-for="(info, infoIndex) in item?.ar">
            <span class="">
              {{ info.name }}
            </span>
          </template>
        </div>
        <div class="w-[240px]">
          {{ item.album?.name || item.al?.name }}
        </div>

        <div class="w-[80px] text-center">
          <template v-if="item.duration">
            {{ dayjs(item.duration ? item.duration : 0).format('mm:ss') }}
          </template>
          <template v-else-if="item.dt">
            {{ dayjs(item.dt ? item.dt : 0).format('mm:ss') }}
          </template>
          <template v-else>
            {{ dayjs(0).format('mm:ss') }}
          </template>
          
        </div>
      </div>
    </RecycleScroller>
  </div>
  
</template>


<script setup>
import { getAssetsFile } from '@/utils'
import { ref, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router'
import { dayjs } from 'element-plus'
import myLoading from '@/components/myLoading.vue'
import usePlayStore from '@/stores/modules/play'


const playStore = usePlayStore()
const props = defineProps({
  items: {
    type: Array,
    default: ()=> ([])
  }
})
const { PlayingInfo } = toRefs(playStore)
const { items } = toRefs(props)
const emits = defineEmits(['itemClick'])
const itemClick = (item, index) => {
  emits('itemClick', item, index)
}
</script>

<style scoped lang="less">

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
