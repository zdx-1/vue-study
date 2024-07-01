<template>
  <div class="songIntroduction justify-center flex-col w-[300px] flex content-start">
    <div class="imgBox w-[300px] h-[300px] overflow-hidden rounded-lg">
      <my-image class="img hover:scale-[1.2]   duration-700 transition-all tran w-[100%] h-[100%]" :url="detailData.picUrl || detailData.coverImgUrl" :title="detailData?.name" :alt="detailData?.name" />
    </div>
    <div class="info mt-[12px]">
      <h2 class="title mb-[0px] normal-case text-center w-[100%] text-[20px] font-bold leading-[1.5]">{{ detailData?.name }}</h2>
      <div class="creator text-center text-xs ">
        <span class="mr-[5px] px-[8px] py-[2px] text-black dark:text-white inlineblock- rounded-[12px] border border-black dark:border-stone-50 border-[1]">{{ type }}</span>
        <span class="nickname inline-block dark:text-white/50 text-black">{{ detailData.creator?.nickname}}</span> 
        <span class="trackUpdateTime px-[5px] inline-block dark:text-white/50 text-black">{{ dayjs(detailData?.trackUpdateTime).format('YYYY-MM-DD') }}</span> 
        <span class="inline-block dark:text-white/50 text-black">更新</span>
      </div>
      <div class="tag pt-[5px] text-center text-xs dark:text-white/50 text-black" v-if="detailData?.tags && detailData?.tags.length">
        <span>标签：</span>
        <template v-for="item in detailData.tags">
          <el-tag
            color="rgb(24, 24, 24)"
            class="mx-1 dark:text-[var(--hsla-05)] bg-transparent text-black dark:bg-[var(--hsla-01)] border border-black/50"
            effect="plain"
            round
          >
            {{ item }}
          </el-tag>
        </template>
      </div>
      <div class="random mt-[12px] text-sm font-semibold text-center">
        <el-button class="btn dark:text-white text-white bg-[var(--purple-primary)] border-transparent rounded-[20px] px-[22px] py-[15px] cursor-pointer" round @click="playMusic">
          <el-icon><CaretRight /></el-icon>
          随机播放
        </el-button>
      </div>
    </div>

  </div>
</template>

<script setup>
import {
  CaretRight
} from '@element-plus/icons-vue'
import { dayjs } from 'element-plus'
const props = defineProps({
  detailData: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    default: () => ('歌单')
  },
})
const emits = defineEmits(['playMusic'])
const playMusic = (listItem, index) => {
  emits('playMusic')
}
</script>


<style scoped lang="less">
  .random{
    .btn{
      :deep(.el-icon){
        font-size: 20px;
      }
    }
  }
</style>