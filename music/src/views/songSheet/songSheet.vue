<template>
  <div class="songAlbum">
    <div class="songBox">
      <div style="position: sticky; top: 76px; float: left; width: 300px;margin-right: 30px;">
        <sheet_infoSkleton :loading="sheet_infoSkletonLoading">
          <sheet_info  @playMusic="playMusic" :detailData="detailData"></sheet_info>
        </sheet_infoSkleton>
        
      </div>
      <div class="songList h-[550px] overflow-hidden relative">
        <my-loading class="dark:bg-black/30 bg-black/5 max-h-[550px] w-[100%] h-[100%]" v-if="loading">
          <span>加载中...</span>
        </my-loading>
        <div v-else :style="{ pointerEvents: !loading ? 'all' : 'none' }">
          <music_item :options="options"   @item-click="playSong" :track-ids="trackIds"></music_item>
        </div>
       
    </div>
    </div>
    <div class="py-[10px] text-[14px] text-center dark:text-white/50 text-black">
      {{ statistics }}
    </div>
    <div>
      <song_comment_area :info="detailData" :total="total" :comment-list="commentList" :hot-comment-list="hotCommentList"></song_comment_area>
    </div>
    
  </div>
</template>

<script setup>
import sheet_infoSkleton from './skeletonCpts/sheet_infoSkleton.vue'
import myLoading from '@/components/myLoading.vue'
import { getPlaylistDetail, getAllPlaylistDetail, getCommentPlaylist } from '@/services'
import { useRoute, useRouter } from 'vue-router'
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'
import usePlayStore from '@/stores/modules/play'
import music_item from './cpts/music_item.vue'
import sheet_info from './cpts/sheet_info.vue'
import song_comment_area from '@/components/commentListBox/song_comment_area.vue'
import VirtualList from './cpts/VirtualList.vue'


const options = {
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
  menuList:[
  {
    label: "查看评论",
    type: "查看评论",
    fn: ({item, index}) =>{
      router.push(`/musicComment?id=${item.id}`)
    }
  },
  {
    label: "播放",
    type: "播放",
    fn: async ({item, index}) => {
      playSong(item, index)
    }
  },
  {
    label: "下一首播放",
    type: "下一首播放",
  },
  {
      line: true,
  },
  {
    label: "收藏",
    type: "收藏",
  },
  {
    label: "发现...",
    type: "发现...",
  },
  {
    label: "复制链接",
    type: "复制链接",
  },
  {
    label: "下载",
    type: "下载",
  },
  {
      line: true,
  },
  {
    label: "从歌单中删除",
    type: "从歌单中删除",
  },
]
}


const loading = ref(false)
const sheet_infoSkletonLoading = ref(true)
const route = useRoute()
const router = useRouter()
let id = route.query.id

const detailData = ref({})

const trackIds  = ref([])
const songDetailList = async (id) => {
  try {
    sheet_infoSkletonLoading.value = true
    loading.value = true
    
    const res = await getPlaylistDetail(id)
    
    if (res.code == 200) {
      
      const allId = res['playlist']['trackIds'].map(item => item.id).join()
      const allList = await getAllPlaylistDetail(allId)
      detailData.value = res['playlist']
      trackIds.value = allList.songs
      
      loading.value = false
      setTimeout(() => {
        sheet_infoSkletonLoading.value = false
      }, 100);
      getCommentPlaylistData() 
    } else {
      // ElNotification({
      //   title: '路径错误',
      //   message: '没有这个歌单！',
      //   type: 'error',
      // })
    }

    
  } catch (error) {
    loading.value = false
    setTimeout(() => {
      sheet_infoSkletonLoading.value = false
    }, 100);
  }
}
songDetailList(id)

onMounted(() => {

})

const statistics = computed(() => {
  return `共 ${ trackIds.value && trackIds.value.length ? trackIds.value.length : 0} 首歌`
})

const playStore = usePlayStore()
const playSong = async (item, index) => {
  if(index == playStore.playIndex) return
  playStore.playIndex = index
  if (trackIds.value.length < 200) {
    playStore.playList = trackIds.value
  } else {
    let list = trackIds.value.slice(index, index + 200)
    if (list.length < 200) {
      list = [... list , ... trackIds.value.slice(0 , 200)]
    }
    playStore.playList = list
  }
  
  playStore.getPlayUrl(item)
}

const playMusic = () => {
  const index = Math.floor(Math.random() * trackIds.value.length - 1)
  playStore.playList = trackIds.value
  playStore.playIndex = index
  playStore.getPlayUrl(trackIds.value[index])
}
const hotCommentList = ref([])
const commentList = ref([])
const commentObj = reactive({
  offset: 0,
  limit: 30
})
const total = ref(0)
const getCommentPlaylistData = async () => {
  const res = await getCommentPlaylist(id, commentObj)
  total.value = res.total
  commentList.value = res['comments']
  hotCommentList.value = res['hotComments']
}

watch(route, n => {
  const nId = n.query.id
  if (nId && (n.name == "songSheet" || n.name == "songsheet")) {
    id = nId
    songDetailList(nId)
    getCommentPlaylistData()
  }
})
</script>

<style scoped lang="less">
.songBox{
  // display: flex;
  // align-items: center;
  max-height: calc(100% - 24px - 90px);
  margin-top: 40px;

  &:after {
    display: block;
    clear: both;
    content: "";
  }
}

</style>