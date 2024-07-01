<template>
    <div class="Sheet"   ref="songSheetBoxRef" >
      <div class="header flex justify-between items-center box-border pr-4" v-if="title">
        <h2 class="title">{{title}}</h2>
        <div class="discovery hover:text-[rgb(236,65,65)] dark:hover:text-[#9b4de0] text-black cursor-pointer text-xs dark:text-[#ccc]" v-if="isAll" @click="discoveryClick">
          全部<el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div >
        
        <songSheetBoxSkeleton :loading="loading && layz" :render-sum="renderSum">
          <div class="songSheetBox grid grid-cols-5 gap-[10px]">
            <template v-for="item in songSheetList">
              <!-- v-motion-slide-bottom -->
              <div class="item flex-[0 0 230px] overflow-hidden flex-col min-h-[150px] flex h-auto p-[15px] box-border my-[10px]" @click="songSheetClick(item)" >
                <div v-mouse-menu="{
                    params: item,
                    ...options
                  }" style="overflow: hidden; width: 100%; margin-bottom: 6px;" class="overflow-hidden rounded">
                  <my-image class="img  hover:scale-[1.2]   duration-700 transition-all cursor-pointer w-[100%] h-[100%] overflow-hidden" 
                  :url="item.img1v1Url || item.picUrl || item.coverImgUrl || item.img1v1Url" :title="item.name" :alt="item.name" />
                </div>
                <div class="dark:text-[#fff] text-black cursor-pointer text-sm line-clamp-2" :style="{color: artists == true ? '#fff' : '#ccc'}" v-if="effect == 'dark'">
                  {{ item.name }}
                </div>
                <div class="dark:text-[#fff] text-black cursor-pointer text-sm line-clamp-2"  v-else>
                  {{ item.name }}
                </div>
                  <!-- <div class="artists" v-if="artists && item.artists?.length" :style="{color: effect == 'light' ? '#ccc' : '#ccc'}">
                  
                </div> -->
                  <div class="text-xs h-4 text-zinc-400 text-[#ccc] dark:text-white/30 " v-if="artists && item.artists?.length">
                    {{ item.artists[0]?.name }} 
                  </div>
              </div>
            </template>
          </div>
        </songSheetBoxSkeleton>
      </div>
    </div>
  
  
</template>

<script setup>

import sheetContextMenu from "@/hooks/contextMenu/cpts/sheetContextMenu.vue"
import openContextMenus  from '@/hooks/contextMenu/openContextMenus'
import { Skeleton as vSkeleton, SkeletonItem as vSkeletonItem } from '@/utils/skeleton.js'
import songSheetBoxSkeleton from './cpts/songSheetBoxSkeleton.vue'
import {
  ArrowRight,
  Picture as IconPicture
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref, watch, toRefs, onMounted } from 'vue'
import { getAssetsFile } from '@/utils'
import { useLazyData } from '@/utils/layz'
import usePageStore from '@/stores/modules/page'
import usePlayStore from '@/stores/modules/play'
const playStore = usePlayStore()
const pageStore = usePageStore()
const { effect } = toRefs(pageStore)
const songSheetBoxRef = ref()
const layz = ref(false)
const ifobserverElement = () => {
  setTimeout(() => {
    layz.value = true
  },500)
}
const router = useRouter()
onMounted(() => {
  useLazyData(songSheetBoxRef, ifobserverElement)

})

const contextmenu = (e,item) => {
  const curInstance = openContextMenus(e, {
    data: item,
    appendTo: songSheetBoxRef,
    renderCpts: sheetContextMenu,
  })
}




const props = defineProps({
  songSheetList: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: () => ('')
  },
  isAll: {
    type: Boolean,
    default: () => (true)
  },
  artists: {
    type: Boolean,
    default: () => (false)
  },
  renderSum: {
    type: Number,
    default: 5
  },
  options: {
    type: Object,
    default: () => (
      {
        menuWrapperCss: {
          padding: '10px 0',
          background: 'var(--menuWrapperCssbgb)',
          lineColor: 'var(--menuWrapperCsslineColor)',
          boxShadow: 'var(--menuItemCssHoverbgd)',
          boxShadow: '0 0px 1px #888'
        },
        menuItemCss: {
          labelColor: 'var(--menuitem-color)',
          hoverBackground: 'var(--menuItemCssHoverbgd)'
        },
        menuList: [
          {
            label: "收藏",
            type: "收藏",
          }
        ]
      }
    )
  },
})
const { songSheetList } = toRefs(props)
const emits = defineEmits(['songSheetClick','topRightClick'])
const songSheetClick = (item) => {
  emits('songSheetClick', item)
}
const discoveryClick = () => {
  emits('topRightClick')
}
const loading = ref(false)
watch(songSheetList, n => {
  if (n && n.length) {
    setTimeout(() => {
      loading.value = true
    }, 500)
  } else {
    loading.value = false
  }
}, {
  deep: true, 
  immediate: true
})
const imgLoadType = false
const imgLoad = () => {
  console.log('imgLoadT', true);
  imgLoadType.value = true
}
</script>

<style scoped lang="less">
.Sheet{
  .header{
    .discovery{
      :deep(.el-icon){
        display: inline-block;
        position: relative;
        top: 2px;
        font-size: 16px;
      }
    }
  }
}
.songSheetBox{
  @media screen and (max-width: 1380px) {
    grid-template-columns:repeat(4,1fr);
  }
  @media screen and (max-width: 1080px) {
    grid-template-columns:repeat(3,1fr);
  }
  @media screen and (max-width: 880px) {
    grid-template-columns:repeat(2,1fr);
  }
  @media screen and (max-width: 720px) {
    grid-template-columns:repeat(1,1fr);
  }
}

</style>