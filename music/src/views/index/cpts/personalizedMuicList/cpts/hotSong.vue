<template>
  <div class="hotSongList" ref="hotSongListRef">
    <h2>最近热门歌榜</h2>
      <div  class="mt-5 h-[150px]">
        <el-carousel indicator-position="none" :interval="4000" height="150px">
          <el-carousel-item v-for="(list, index) in newHotSongList" :key="index" class="flex w-[100%]">
            <template v-for="(item,index1) in list">
              <div class="w-1/3 " :style="{padding: index1 == 1 ? '0 15px': 'none' }">
                <div class="dark:hover:bg-white/20 hover:bg-black/20 bg-[#f1f0f0] dark:bg-white/10 rounded-lg w-[100%] box-border p-[14px] cursor-pointer flex overflow-hidden" @click="itemClick(item)">
                  <my-image class="img w-[120px] h-[120px] mr-2" :url="item.al?.picUrl || item.coverImgUrl" :title="item.name" :alt="item.name" />
                  <div class="flex-1 flex flex-col justify-between overflow-hidden">
                    <div class="overflow-hidden">
                      <div class="font-bolde text-base truncate  ">
                        {{ item.name }}
                      </div>
                      <div class="text-xs mt-[3px] dark:text-white/30  text-black/40 truncate ">
                        <template v-for="info in item.ar">
                          {{ info.name }}
                        </template>
                      </div>
                    </div>
                    <div style="-webkit-text-stroke: 1px #797575;" class="font-serif font-black text-right text-transparent text-[40px]">
                      <span>#</span>
                      <span v-if="index == 0">{{ index1 + 1}}</span>
                      <span v-else-if="index == 1">{{ 4 + index1}}</span>
                      <span v-else>{{ 7 + index1}}</span>
                    </div> 
                  </div>
                </div>
              </div>
            </template>
          </el-carousel-item>
        </el-carousel>
      </div>
  </div>
</template>

<script setup>
import { useLazyData } from '@/hooks/useIntersectionObserver'
import useMainStore from '@/stores/modules/main'
import { ref, toRefs, watch, onMounted } from 'vue';
import { getAssetsFile } from '@/utils'
const mainStore = useMainStore()
const { hotSongList } = toRefs(mainStore)

const emits = defineEmits(['itemClick'])
const newHotSongList = ref([])
watch(hotSongList, (n, v) => {
  if (!n?.length) return
  newHotSongList.value = []
  for (let index = 0; index < 3; index++) {
    let arr = []
    index == 0 ? arr = hotSongList.value.slice(0, 3) : arr = hotSongList.value.slice(3 * index, 3 * (index + 1))
    newHotSongList.value.push(arr)
  }
}, {
  deep: true,
  immediate: true
})

const itemClick = item => {
  emits('itemClick', item)
}
const hotSongListRef = ref()
onMounted(() => {
  useLazyData(hotSongListRef, {
    fn: () => {
      mainStore.fetchHotSongListData()
    }
  })
})
</script>

<style scoped lang="less">
  :deep(.el-carousel__arrow){
    padding: 5px;
    background: #fff;
    .el-icon{
      color: rgb(35,35,35);
      font-size: 20px;
    }
  }

.light body .box .item{
  background-color: #f1f0f0 !important;
}

</style>