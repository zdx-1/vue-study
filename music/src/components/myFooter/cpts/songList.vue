<template>
  <div class="px-[10px]">
    <div class="title">
      <h2>当前播放列表</h2>
    </div>
    <div class="h-[30px] text-xs dark:text-white/50 text-black/80">
      共 {{ playList.length }} 首
    </div>
    <el-scrollbar height="calc(100vh - 80px - 30px - 40px)" ref="scrollbar">
      <template v-for="item in playList">
        <div @click="itemClick(item, index)" class="list-item-dynamic dark:hover:bg-white/10 hover:bg-black/5" :class="{ item_active : item?.id == playingInfo?.id ? true : false}">
          <div style="position: relative; margin-right: 10px; display: flex; width: 40px; height: 40px;">
            <my-image class="img" :url="item?.al?.picUrl || item?.album?.picUrl" :title="item.user?.nickname" :alt="item.user?.nickname" />
            <div class="dimmed">
              <el-image v-show="item?.id == playingInfo?.id" class="resume" :src="getAssetsFile('plays/icon-playing.gif')" title="播放" fit="fill" ></el-image>
              <el-image v-show="item?.id != playingInfo?.id" class="resume" :src="getAssetsFile('plays/play_resume.png')" title="播放" fit="fill" ></el-image>
            </div>
          </div>
          <div class="flex-1 flex flex-col overflow-hidden">
            <div class="cursor-pointer truncate" >{{ item.name }}</div>
            <div class="cursor-pointer text-xs dark:text-white/50 text-black/80 truncate">
              <template v-for="item in item.ar">
                <span>
                  {{ item.name }}
                </span>
              </template>
            </div>
          </div>

          <div class="right flex text-center  absolute">
            <!-- <div class="iconfont icon-aixin">
            </div>
            <div class="iconfont icon-gengduo">
            </div> -->
          </div>
        </div>
      </template>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { getAssetsFile } from '@/utils'
import { ref, onMounted, toRefs, watch, nextTick  } from 'vue'
import usePlayStore from '@/stores/modules/play'
const playStore = usePlayStore()
const { PlayingInfo, playList, audioRef, playIndex } = toRefs(playStore)
const scrollbar = ref()
const props = defineProps({
  playList: {
    type: Array,
    default: () => []
  },
  drawer: {
    type: [Boolean, Number],
    default: () => 0
  },
  playingInfo: {
    type: Object,
    default: () => ({})
  },
})
const { drawer } = toRefs(props)
const emits = defineEmits(['itemClick'])
const itemClick = (res, index) => {
  emits('itemClick', res, index)
}
onMounted(() => {
  scrollbar.value?.setScrollTop(56 * playIndex.value)
})
watch(drawer, async n => {
  if (!n) return
  nextTick(() => {
    scrollbar.value?.setScrollTop(56 * playIndex.value)
  })
 
}, {
  deep: true,
  immediate: true
})
watch(PlayingInfo, async n => {
  if (!n.id) return
   n.id && scrollbar.value?.setScrollTop(56 * playIndex.value)
 
}, {
  deep: true,
  immediate: true
})
</script>


<style scoped lang="less">
.title{
  height: 40px;
  display: flex;
  align-items: center;
  height: 40px;
}

:deep(.vue-recycle-scroller){
    padding: 0 8px 15px;
    box-sizing: border-box;
  }

  .item_active{
      background: var(--purple-primary);
      .dimmed{
        visibility: visible !important;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
      &:hover{
        background: var(--purple-primary) !important;
      }
    }
  .list-item-dynamic{
      border-radius: 8px;
      padding: 8px;
      box-sizing: border-box;
      height: 56px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .img{
        cursor: pointer;
        width: 40px;
        height: 40px;
        // margin-right: 10px;
      }
      .dimmed{
        cursor: pointer;
        visibility: hidden;
        position: absolute;
        .resume{
          position: absolute;
          left:50%; top:50%; 
          transform:translate(-50%,-50%);
          -webkit-transform:translate(-50%,-50%);
        }
      }
      &:hover{
        // background: var(--hsla-01);
        .img{
          background: var(--hsla-01);
        }
        .dimmed{    
          visibility: visible;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: hsla(0,0,0,0.4);
          .icimg{
            width: 24px;
            height: 24px;
          }
        }
        .right{
          margin-left: 4px;
          width: 68px;
        }
        .right{
          visibility: visible;
          position:static;
          .icon-gengduo{
            margin-left: 10px;
          }
          .icon-gengduo, .icon-aixin{
            
            cursor: pointer;
            border: 1px solid hsla(0,0%,100%,0.08);
            background: hsla(0,0%,100%,0.08);
            border-radius: 50%;
            padding: 1px;
          }
        }
      }
    }
</style> 