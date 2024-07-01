<template>
  <div class="musicInfo">
    <div class="infoBox">
      <!-- <img :src="imgs" alt="" srcset="" class="bg_image"> -->
      <div class="bg_cover"></div>
      <!-- <div class="left" :style="{ backgroundImage:` url(${getAssetsFile('plays/o.png')})` }"> -->
      <div class="left" >
        <el-image :style="{animationPlayState: playOrPaused ? 'inherit' : 'paused'}"  class="imgAtn img" :src="PlayingInfo?.al?.picUrl || PlayingInfo?.album?.picUrl" fit="fill" :title="PlayingInfo.name" :alt="PlayingInfo.name"></el-image>
      </div>
      <div class="right">
        <div class="info">
          <h2 class="title font-black">
            {{ PlayingInfo.name }}
          </h2>
          <div class="">
            <div class="name">
              <span>
                歌手: 
              </span>
              <template v-for="item in PlayingInfo.ar ? PlayingInfo.ar : PlayingInfo?.album?.artists">
                <span>{{ item.name }}</span>
              </template>
            </div>
          </div>
        </div>
        <div class="list">
          <el-scrollbar height="400px" ref="scrollbarRef" :always="false">
            <template v-for="(item, index) in lyricList">
              <div 
              class="item"
                :class=" { 
                   'dark:text-white/70 text-black/90' : contentLyricIndex !== index ,
                   'dark:text-white text-black text-base font-black' : contentLyricIndex === index ,
                }" 
              >
                {{ item.text }}
              </div>
            </template>
        </el-scrollbar>
        </div>
      </div>
    </div>

    <div class="comment">
      <comment-list-box @likedCountClick="likedCountClick" :title="'精彩评论'" :comments="hotCommentList"></comment-list-box>
      <comment-list-box @likedCountClick="likedCountClick" :title="`最新评论(${total})`" :comments="commentList"></comment-list-box>
    </div>
  </div>
</template>

<script setup>
import commentListBox from '@/components/commentListBox/commentList.vue'
import usePlayStore from '@/stores/modules/play'
import { parseLyric } from '@/utils/pase_lyric'
import { toRefs, ref, reactive, watch } from 'vue'
import { getMusicIyric, getSongCommentArea } from '@/services'
import { getAssetsFile } from '@/utils'
const playStore = usePlayStore()
const lyricList = ref([])
const { PlayingInfo, playingCurrentTime, playOrPaused } = toRefs(playStore)
const getIyric = async () => {
  const res = await getMusicIyric(PlayingInfo.value.id)
  // console.log(res.lrc.lyric);
  lyricList.value =  parseLyric(res.lrc.lyric)
  console.log(lyricList);
}
getIyric()

watch(PlayingInfo, (n,v) => {
  if (n.id != v.id) {
    getIyric()
    getSongCommentAreaData()
  }
})
const scrollbarRef = ref()
const lyricScrollTop = 0
const contentHeight = 200
const contentLyricIndex = ref(-1)
const hotCommentList = ref([])
const commentList = ref([])
const limit = ref(30)
const total = ref(0)
const getSongCommentAreaData = async () => {
  const res = await getSongCommentArea(PlayingInfo.value.id, limit.value)
  total.value = res.total
  commentList.value = res['comments']
  hotCommentList.value = res['hotComments']
  console.log('getSongCommentAreaData', res);
}
getSongCommentAreaData()
const likedCountClick = (res, index) => {
  console.log(res,index);
}
const imgs = ref('')
watch(PlayingInfo, n => {
  imgs.value = `${PlayingInfo.value?.al?.picUrl || PlayingInfo.value?.album?.picUrl}`
}, {
  deep: true,
  immediate: true
})
watch(playingCurrentTime, n => {
  // if(ttm) return
  contentLyricIndex.value = lyricList.value.length - 1
  for (let i = 0; i < lyricList.value.length; i++) {
    const item = lyricList.value[i];
    if (n < item.time) {
      contentLyricIndex.value = i - 1
      break
    }
  }
  scrollbarRef.value?.setScrollTop((contentLyricIndex.value * 40  ))
})

const handleMouseEnter = async (i) => {

}
</script>

<style scoped lang="less">
.bg_image, .bg_cover{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
  // filter: blur(20px) ;
}

.bg_cover{
  // background: rgba(0,0,0,.8);
  // backdrop-filter: blur(20px);
  // filter: blur(24px) drop-shadow(6px 6px 2px rgba(0,0,0,0.1)) invert(10%);
}
.musicInfo{
  // height: calc(100vh - 90px);
  -moz-user-select:none;
  -webkit-user-select:none;
  -ms-user-select:none;
  -khtml-user-select:none;
  -o-user-select:none;
  user-select:none; 
}
.infoBox{
  height: calc(100vh - 80px);
  padding: 0 20%;
  position: relative;
  display: flex;
  // justify-content: center;
  align-items: center;
  .left{
    padding: 0 40px;
    
    .img{
      width: 300px;
      height: 300px;
      border-radius: 50%;
      
    }
  }
  .right{
    min-width: 360px;
    z-index: 2;
    padding-top: 20px;
    padding-bottom: 20px;
    box-sizing: border-box;
    .info{
      font-size: 16px;
      font-weight: 500;
      // color: #fff;
      margin-bottom: 5px;
      .name{
        margin-top: 10px;
        font-size: 12px;
        // color: var(--hsla-05);
      }
    }
    .list{
      pointer-events: none;
      .item{
        font-size: 12px;
        // color: var(--hsla-9);
        // padding: 5px 10px;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
      }
      .active{
        font-size: 16px;
        font-weight: 900;
        // color: #fff;
      }
    }
  }
}

:deep(.el-scrollbar__view){
  padding-top: 160px;
  padding-bottom: 200px;
}
.comment{
  margin: 0 20%;
  margin-top: 30px;
}

.imgAtn{
  animation: loading 12s  linear infinite ;
  animation-fill-mode: forwards;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>