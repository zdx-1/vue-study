<template>
  <div class="personalizedMuicList">
    <div class="carousel">
      <carousel/>
    </div>

    <song-sheet-box :renderSum="10" :options="options" @song-sheet-click="songSheetClick" title="推荐歌单" @top-right-click="toSongSheet" :song-sheet-list="songSheetList"></song-sheet-box>

    <div class="newTopSong" style="margin-bottom: 20px;" ref="newTopSongRef">
      <newTopSong :title="'最新音乐'" @item-click="newTopSongItemClick" @all-song-click="allSongClick"></newTopSong>
    </div>

    <song-sheet-box title="ACG" ref="AcgSheetRef" :options="options" @song-sheet-click="songSheetClick" :song-sheet-list="AcgSheetData"></song-sheet-box>
    <song-sheet-box title="经典" ref="jingdianSheetRef" :options="options" @song-sheet-click="songSheetClick" :song-sheet-list="jingdianSheetData"></song-sheet-box>
    <song-sheet-box title="话语" ref="huayuSheetRef" :options="options" @song-sheet-click="songSheetClick" :song-sheet-list="huayuSheetData"></song-sheet-box>

    <hotSong @item-click="hotSongItemClick" ref="hotSongItemRef"></hotSong>

    <div class="hotArtists" style="margin-top: 20px;" ref="hotArtistsRef">
      <song-sheet-box @song-sheet-click="songArtistClick" title="热门歌手" :song-sheet-list="hotArtistsList" @top-right-click="topArtistsClick"></song-sheet-box>
    </div>
  </div>
</template>

<script setup>
import { sheetContextMenuOptions } from '@/hooks/contextMenu/cpts/sheetContextMenu'
import { getSongUrl, getPlaylistDetail, getAllPlaylistDetail } from '@/services'
import { useLazyData } from '@/hooks/useIntersectionObserver'
import { getHomeBanner, getNewSongSheet, getCatPlaylist, getHotArtists, getRecommendResource } from '@/services'
import { catKeyListMock } from '@/mock'
import carousel from './cpts/carousel.vue'
import newTopSong from './cpts/newTopSong.vue'
import hotSong from './cpts/hotSong.vue'
import songSheetBox from '@/components/songSheetBox/songSheetBox.vue'
import { ref, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import usePlayStore from '@/stores/modules/play'

const newTopSongRef = ref()
const songSheetRef = ref()
const hotSongItemRef = ref()
const hotArtistsRef = ref()

const CatPlaylist = ref({})


const AcgSheetData = ref([])
const AcgSheetRef = ref([])
const jingdianSheetData = ref([])
const jingdianSheetRef = ref([])
const huayuSheetData = ref([])
const huayuSheetRef = ref([])
onMounted(() => {
  useLazyData(AcgSheetRef, {
    fn: () => {
      getCatPlaylist('ACG').then(res => {
        AcgSheetData.value = res['playlists']
      })
    }
  })
  useLazyData(jingdianSheetRef, {
    fn: () => {
      getCatPlaylist('经典').then(res => {
        jingdianSheetData.value = res['playlists']
      })
    }
  })
  useLazyData(huayuSheetRef, {
    fn: () => {
      getCatPlaylist('华语').then(res => {
        huayuSheetData.value = res['playlists']
      })
    }
  })

  useLazyData(hotArtistsRef, {
    fn: () => {
      getHotArtistsListData()
    }
  })
})

const playStore = usePlayStore()
const router = useRouter()
const emits = defineEmits(['jumpTab'])

const songSheetList = ref([])
const getNewSongSheetList = async () => {
  const recommendResourceRes = await getRecommendResource()
  songSheetList.value = recommendResourceRes['recommend'].length > 6 ? recommendResourceRes['recommend'].slice(0, 10) : recommendResourceRes['recommend'].slice(0, 5)
  console.log('recommendResourceRes[recommend]',recommendResourceRes['recommend']);
}
getNewSongSheetList()

const hotArtistsList = ref([])
const getHotArtistsListData = async () => {
  const res = await getHotArtists()
  hotArtistsList.value = res['artists']
}

const songSheetClick = (item) => {
  router.push(`/songSheet?id=${item.id}`)
}
const songArtistClick = (item) => {
  router.push(`/artistInfo?id=${item.id}`)
}

const playMusic = item => {
  const newPlayList = playStore.playList.filter(data => item.id != data.id)
  playStore.playList = [...newPlayList, item]
  playStore.playIndex = newPlayList.length
  playStore.getPlayUrl(item)
}

const newTopSongItemClick = (item, index) => {
  playMusic(item)
}

const allSongClick = () => {
  emits('JumpTab', 'latestMusic')
}
const topArtistsClick = () => {
  emits('JumpTab', 'singer')
}

const hotSongItemClick = (item) => {
  playMusic(item)
}

const toSongSheet = () => {
  emits('JumpTab', 'songSheet')
}

const options = {
  ...sheetContextMenuOptions,
  menuList:[
  {
    label: "查看歌单",
    type: "查看歌单",
    fn: (item) =>{
      router.push(`/songSheet?id=${item.id}`)
    }
  },
  {
    label: "播放",
    type: "播放",
    fn: async (item) => {
      const detailRes = await getPlaylistDetail(item.id)
      
      if (detailRes.code == 200) {
        const allId = detailRes['playlist']['trackIds'].map(item => item.id).join()
        
        const allList = await getAllPlaylistDetail(allId)
        playStore.playIndex = 0
        playStore.playList = allList.songs
        playStore.getPlayUrl(allList.songs[0])
      }
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
      line: true,
  },
  {
    label: "不感兴趣",
    type: "不感兴趣",
  },
]
}
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
</style>