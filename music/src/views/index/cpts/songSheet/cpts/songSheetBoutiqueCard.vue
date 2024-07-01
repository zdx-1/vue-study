<template>
  <div class="p-[10px] flex bg-black/[0.04] dark:bg-white/[0.04]">
    <songSheetBoutiqueCardSkleton :loading="cardInfoSLN">
      <!-- <el-image class="img" :src="cardInfo.img1v1Url || cardInfo.picUrl || cardInfo.coverImgUrl || cardInfo.img1v1Url" fit="fill" :title="cardInfo.name" :alt="cardInfo.name"/> -->
      <my-image class="w-[120px] h-[120px] mr-[10px] rounded-md" :url="cardInfo.img1v1Url || cardInfo.picUrl || cardInfo.coverImgUrl || cardInfo.img1v1Url" :title="cardInfo.name" :alt="cardInfo.name"/>
               
    </songSheetBoutiqueCardSkleton>
    <!-- <el-image class="img" :src="cardInfo.img1v1Url || cardInfo.picUrl || cardInfo.coverImgUrl || cardInfo.img1v1Url" fit="fill" :title="cardInfo.name" :alt="cardInfo.name"/> -->
    
    <div class="flex flex-1 flex-col">
      <div class="p-[5px 10px] my-[15px]">精品歌单</div>
      <div class="text-xs">{{ cardInfo.name }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import songSheetBoutiqueCardSkleton from '../skeletonCpts/songSheetBoutiqueCardSkleton.vue';
const props = defineProps({
  cardInfo: {
    type: Object,
    default: () => {}
  },
  cardInfoSLN: {
    type: Boolean,
    default: () => true
  },
})

</script>

<style scoped lang="less">

</style>