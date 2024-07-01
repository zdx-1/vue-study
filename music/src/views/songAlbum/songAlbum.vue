<template>
  <div class="songAlbum">
    <div class="songBox">
      <sheet_info :type="'专辑'" @playMusic="playMusic" :detailData="detailData"></sheet_info>
      <div class="songList">
        <my-loading class="loading" style="max-height: 550px" v-if="loading">
          <span>加载中...</span>
        </my-loading>
        <music_item :style="{ pointerEvents: !loading ? 'all' : 'none' }" :loading="loading" @item-click="playSong" :track-ids="trackIds"></music_item>
    </div>
    </div>
    <div class="statistics">

      {{ statistics }}
    </div>
    <div>
      <song_comment_area :info="detailData" :total="total" :comment-list="commentList" :hot-comment-list="hotCommentList"></song_comment_area>
    </div>
    
  </div>
</template>

<script setup>
import myLoading from '@/components/myLoading.vue'
import { getAlbum, getAllPlaylistDetail, getCommentAlbum } from '@/services'
import { useRoute, useRouter } from 'vue-router'
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'
import usePlayStore from '@/stores/modules/play'
import music_item from '../songSheet/cpts/music_item.vue'
import sheet_info from '../songSheet/cpts/sheet_info.vue'
import song_comment_area from '@/components/commentListBox/song_comment_area.vue'
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const id = route.query.id

const detailData = ref({})

const trackIds  = ref([])
const songDetailList = async (id) => {
  try {
    loading.value = true
    const res = await getAlbum(id)
    if (res.code == 200) {
      detailData.value = res['album']
      const allId = res['songs'].map(item => item.id).join()
      const allList = await getAllPlaylistDetail(allId)
      trackIds.value = allList.songs
      getCommentAlbumData() 
    } else {
      ElNotification({
        title: '路径错误',
        message: '没有这个歌单！',
        type: 'error',
      })
    }
    loading.value = false
  } catch (error) {
    loading.value = false
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
  playStore.playList = trackIds.value
  playStore.getPlayUrl(item)
}

const playMusic = () => {
  const index = Math.floor(Math.random() * trackIds.value.length - 1)
  playStore.playList = trackIds.value
  playStore.getPlayUrl(trackIds.value[index])
}
const hotCommentList = ref([])
const commentList = ref([])
const commentObj = reactive({
  offset: 0,
  limit: 30
})
const total = ref(0)
const getCommentAlbumData = async () => {
  const res = await getCommentAlbum(id, commentObj)
  total.value = res.total
  commentList.value = res['comments']
  hotCommentList.value = res['hotComments']
}

watch(route, n => {
  const nId = n.query.id
  if (nId && n.name == "songAlbum") {
    songDetailList(nId)
  }
})
</script>

<style scoped lang="less">
.songBox{
  display: flex;
  margin-top: 40px;
  max-height: calc(100% - 24px - 90px);
  overflow: hidden;

  .songList{
    flex: 1;
    height: 100%;
    overflow: hidden;
    position: relative;
    .loading{
      max-height: 550px;
      height: 100%;
      width: 100%;
      position: absolute;
      background: hsla(0, 0%, 100%, 0.04);
    }
  }
}

 .statistics{
  padding: 10px 0;
  color: var(--color-255rgba-03);
  font-size: 14px;
  text-align: center;
 }
</style>