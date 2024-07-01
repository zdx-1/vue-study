<template>
  <el-scrollbar ref="scrollbar" max-height="550px" class="songList mr-[20px]" >
    <template v-for="(listItem, index) in trackIds">
      <!-- v-mouse-menu="{
          params: {
            item: listItem,
            index
          },
          ...options
        }"  -->
      <div
      @click.right.native="showContextMenu($event, listItem, index )"
       
        class="item dark:hover:bg-white/10 hover:bg-black/5  border-b border-black/20 dark:border-[rgba(255, 255, 255, 0.1)] rounded-md h-[60px] p-[10px] box-border flex items-center" @click="playSong(listItem, index)">
        <div class="flex box-border w-[50%]">
          <my-image class="rounded h-[40px] w-[40px] mr-[10px]" :url="listItem.al?.picUrl" :title="listItem.name" :alt="listItem.name" />
          <div class="flex flex-col overflow-hidden truncate" >
            <div class="text-[14px] overflow-hidden text-ellipsis  box-border truncate">{{ listItem.name }}</div>
            <div class="dark:text-white/50 text-black/80  mt-0.5 text-xs  overflow-hidden text-ellipsis pr-[10px] box-border" >
              <template v-for="item in listItem.ar">
                <span>
                  {{ item.name }}
                </span>
              </template>
            </div>
          </div>
        </div>
        <div class="dark:text-white/50 text-black/80 pr-[10px] line-clamp-2 mt-0.5 flex-1 text-[14px] overflow-hidden text-ellipsis">
          {{ listItem.al?.name }}
        </div>
        <div class="text-[14px] dark:text-white/50 text-black/80 mt-0.5 ">
          {{ dayjs(listItem.dt).format('mm:ss') }}
        </div>
      </div> 
  
    </template>
  </el-scrollbar>
</template>

<script setup>
import ContextMenu from "@/hooks/contextMenu/openContextMenus";
import MenuContext from '@/hooks/contextMenu/menu.vue'
import { getCommentMusic } from '@/services'
import { dayjs } from 'element-plus'
import { ref, watch, toRefs,reactive } from 'vue'
import { getAssetsFile } from '@/utils'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  trackIds: {
    type: Array,
    default: () => []
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
const { trackIds } = toRefs(props)
const scrollbar = ref()
const emits = defineEmits(['itemClick'])
const playSong = (listItem, index) => {
  emits('itemClick', listItem, index)
}
watch(trackIds, n => {
  if (n && n.length) {
    scrollbar.value && scrollbar.value.setScrollTop(0)
  }
})

const actions = ([
  "",
  {
    label: '查看评论',
    type: "查看评论",
    fn: (props) => {
      router.push(`/musicComment?id=${props.data.id}`)
    }
  },
  {
    label: "播放",
    type: "play",
    fn: (props) => {
      playSong(props.data, props.index)
    }
  },
  {
    label: "下一首播放",
    type: "下一首播放",
  },
  "",
  {
    label: "添加到我喜欢的音乐",
    type: "添加到我喜欢的音乐",
  },
  {
    label: "添加到歌单",
    type: "添加到歌单",
  },
  {
    label: "复制链接",
    type: "复制链接",
  },
])

const showContextMenu = async (e, item, index) => {
    ContextMenu(e, MenuContext, {
      data: item,
      actions,
      index,
    })

};
</script>

<style scoped lang="less">

</style>