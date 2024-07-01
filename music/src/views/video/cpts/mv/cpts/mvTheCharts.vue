<template>
  <div>
    <mvItemHeader :title="title">
      <div class="flex">
        <template v-for="item in mvAreaMock">
          <div @click="tabsClick(item)" :class="{ 'dark:bg-[#9b4de0] bg-[rgb(236,65,65)]': topMvTheChartsOptions.area == item}" class="item border-white/10 rounded-[20px] text-xs mx-[4px] h-[24px] items-center flex box-border cursor-pointer px-[14px] py-[2px] ">
            {{ item }}
          </div>
        </template>
      </div>
    </mvItemHeader>
    <div class="flex flex-wrap">
      <template v-for="(item, index) in topMvTheChartsData">
        <div class="w-[50%] flex max-[1120px]:flex-col">
          <videoItem
            class="w-[300px] max-[1120px]:pb-0 max-[1120px]:mb-[0]"
            :mode="'mv'"
            :img-src="item.cover" 
            :id="item.id" 
            :item="item" 
            :index="index"
            :is-by="false"
          />
          <div class="flex flex-col flex-1 mt-[25px] max-[1120px]:pl-[10px] max-[1120px]:mt-0 ">
            <div class="">
              {{ item.name }}
            </div>
            <div>
              {{ item.artistName }}
            </div>
          </div>
        </div>

      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, reactive } from 'vue'
import { mvAreaMock } from '@/mock/mv'
import mvItemHeader from './mvItemHeader.vue'
import { getMvAll } from '@/services'
import videoItem from '@/components/video/videoItem.vue'
const props = defineProps({
  title: {
    type: String,
    default: () => '默认标题'
  },
})

const topMvTheChartsData = ref([])
const topMvTheChartsOptions = reactive({
  offset: 0,
  limit: 10,
  order: "最热",
  area: "内地",
})

const getTopMvTheChartsData = async () => {
  const res = await getMvAll(topMvTheChartsOptions)
  console.log('getTopMvTheChartsData', res);
  topMvTheChartsData.value = res.data
}
getTopMvTheChartsData()

const tabsClick = area => {
  topMvTheChartsOptions.area = area
  getTopMvTheChartsData()
}
</script>
