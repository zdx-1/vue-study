<template>
  <div>
    <mvItemsBox :items="mvFirstData" :title="'最新MV'">
      <template #headerRight>
        <div class="flex">
          <template v-for="item in mvAreaMock">
            <div @click="newTabsClick(item)" :class="{ 'dark:bg-[#9b4de0] bg-[rgb(236,65,65)]': newTabsActive == item}" class="item border-white/10 rounded-[20px] text-xs mx-[4px] h-[24px] items-center flex box-border cursor-pointer px-[14px] py-[2px] ">
              {{ item }}
            </div>
          </template>
        </div>
      </template>
    </mvItemsBox>

    <mvItemsBox :items="topMvData" :title="'热播MV'"></mvItemsBox>
    <mvItemsBox :items="mvExclusiveRcmdData" :title="'网易出品'"></mvItemsBox>

    <mvTheCharts :title="'MV排行榜'"></mvTheCharts>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { mvAreaMock } from '@/mock/mv'
import { getMvFirst, getMvExclusiveRcmd, getMvAll } from '@/services'
import mvItemsBox from './cpts/mvItemsBox.vue'
import mvTheCharts from './cpts/mvTheCharts.vue'

const newTabsActive = ref('内地')
const newTabsClick = name => {
  if(newTabsActive.value == name) return
  newTabsActive.value = name
  getMvFirstData()
}

const mvFirstData = ref([])
const getMvFirstData = async () => {
  const res = await getMvFirst(newTabsActive.value)
  mvFirstData.value = res.data
  console.log('getMvFirst', res);
}
getMvFirstData()

const mvExclusiveRcmdData = ref([])
const getMvExclusiveRcmdData = async () => {
  const res = await getMvExclusiveRcmd()
  mvExclusiveRcmdData.value = res.data
}
getMvExclusiveRcmdData()

const topMvData = ref([])
const topMvOptions = reactive({
  offset: 0,
  limit: 8,
  order: "最热",
  area: "全部",
})
const getMvAllData = async (options) => {
  const res = await getMvAll(options)
  topMvData.value = res.data
}
getMvAllData(topMvOptions)
</script>