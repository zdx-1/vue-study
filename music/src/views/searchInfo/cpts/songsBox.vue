<template>
  <div class="songsBox">
    <div class="btn">
      <el-button round style="background-color: rgba(246, 81, 81, 0.8);" @click="playAllMusic">
        <el-image class="resume" :src="getAssetsFile('plays/play_resume.png')" title="播放" fit="fill" ></el-image>
        播放全部
      </el-button>
    </div>
    <latestMusicContentList @item-click="itemClick" :items="items"></latestMusicContentList>
    <div class="pagination" v-if="items.length">
        <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="pageCount"
        class="mt-4"
        :page-size="30"
      />
    </div>
  </div>
</template>
  
<script setup>
import { getAssetsFile } from '@/utils'
import usePlayStore from '@/stores/modules/play'
import { toRefs } from 'vue'
import latestMusicContentList from '@/views/index/cpts/latestMusic/cpts/latestMusicContentList.vue';
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
const playStore = usePlayStore()
const { items } = toRefs(props)
const emits = defineEmits([''])

const itemClick = item => {
  const newPlayList = playStore.playList.filter(data => item.id != data.id)
  playStore.playList = [...newPlayList, item]
  playStore.playIndex = newPlayList.length
  playStore.getPlayUrl(item)
}
const playAllMusic = () => {
  playStore.playIndex = 0
  playStore.playList = items.value
  playStore.getPlayUrl(items.value[0])
}
</script>
  
<style scoped lang="less">
.songsBox{
  
  .btn{
    margin-bottom: 20px;
    .resume{
      width: 16px;
      margin-right: 2px;
      height: 16px;
    }
  }

}
:deep(.el-button.is-round ){
    padding: 0;
    padding: 2px 14px;
  }
  :deep(.el-button ){
    font-size: 12px;
    border: 1px solid var(--rgda-255-005);
    height: 24px;
    line-height: 24px;  
    color: var(--text-fff);

  }
  .pagination{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
</style>