<template>
  <div class="newTopSong">
    <h2>{{ title }}</h2>
    <div class="btnContent my-[20px] flex items-center justify-between pr-[15px]">
      <div class="btn text-xs">
        <template v-for="(item, index) in topSongMock">
          <el-button :class="{ active: active === item.type }" size="small" color="626aef" @click="getNewTopSongListData(item.type)" type="success" round>{{ item.title }}</el-button>
        </template>
      </div>
      <div class="discovery hover:text-[rgb(236,65,65)] dark:hover:text-[#9b4de0] cursor-pointer text-xs dark:text-[#ccc] text-black" @click="allSongClick">
        全部
        <el-icon>
          <ArrowRight />
        </el-icon>
      </div>
    </div>
    <div class="flex flex-wrap" >
      <newTopSongSkleton :loading="newTopSongSkletonLoading">
        <div class="hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer flex box-border h-[80px] p-[10px] pr-[15px] w-2/6" @click="itemClick(item, index)" :key="item.id" v-for="item in ( newTopSong[newTopType] && newTopSong[newTopType].length ? newTopSong[newTopType].slice(0, 9) : 9)">
          <my-image class="img h-[60px] w-[60px] mr-2.5 rounded-md" :url="item.album?.blurPicUrl" />
          <div class="text-xs flex-1 flex-col flex truncate">
            <div class="text-sm truncate">{{ item.name }}</div>
            <div class="dark:text-white/50 text-black/50 mt-0.5 truncate">{{ item.album?.artists[0]?.name }}</div>
            <div class="dark:text-white/50 mt-0.5">
              {{ item.album?.publishTime ? dayjs(item.album?.publishTime ).format('YYYY-MM-DD') : '' }}
            </div>
          </div>
        </div>
      </newTopSongSkleton>
    </div>
  </div>
</template>

<script setup>
import newTopSongSkleton from '../skeletonCpts/newTopSongSkleton.vue'
import { getAssetsFile } from '@/utils'
import { dayjs } from 'element-plus'
import { topSongMock } from '@/mock'
import useMainStore from '@/stores/modules/main'
import { ref, toRefs, watch } from 'vue';
import {
  ArrowRight
} from '@element-plus/icons-vue'
const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
})
const newTopSongSkletonLoading = ref(true)
const { title } = toRefs(props)
const emits = defineEmits(['itemClick','allSongClick'])
const active = ref(-1)
const newTopType = ref(-1)
const mainStore = useMainStore()
const { newTopSong } = toRefs(mainStore)

watch(newTopSong, n => {
  if (n[newTopType.value] && n[newTopType.value].length) {
    newTopSongSkletonLoading.value = false
  }
}, {
  deep: true,
  immediate: true
})

const getNewTopSongListData = (type = 0) => {
  newTopType.value = type
  active.value = type
  if (newTopSong.value[newTopType.value]) {
    newTopSongSkletonLoading.value = false
    return
  }
  newTopSongSkletonLoading.value = true
  mainStore.fetchNewTopSongListData(type)
}

getNewTopSongListData()

const allSongClick = () => {
  emits('allSongClick')
}

const itemClick = (item, index) => {
  emits('itemClick', item, index)
}
</script>

<style lang="less" scoped>
.newTopSong{
  
  .btnContent{
    .discovery{
      :deep(.el-icon){
        display: inline-block;
        position: relative;
        top: 3px;
        font-size: 16px;
      }
    }

    .btn{
      .active{
        color: var(--button-active-color);
        background-color: var( --purple-primary);
      }
      :deep(.el-button.is-round){
        border-color:  var(--button-border-color);
      }
      :deep(.el-button--small.is-round){
        padding: 8px 24px;
      }
      :deep(.el-button:hover){
        background-color: hsla(0,0%,100%,0.1);
        // background-color: var( --purple-primary);
      }
      .active.el-button:hover{
        background-color: var( --purple-primary);
      }
    }
  }
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--hsla-05);
  font-size: 12px;
}
</style>