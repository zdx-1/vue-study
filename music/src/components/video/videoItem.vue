<template>
  <div class="item" @click="itemClick">
    <div class="videoOrImg" >
      <div class="cursor-pointer" ref="target" @mouseleave ="videoImgMouseout" :style="{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${videoUrl}') no-repeat 0% 20%/ cover`
      }">
        <img class="img" v-show="!isMouseover"  v-lazy="{ src: imgSrc, delay: 500}" @mouseenter="videoImgMouseover()" />
        <div v-show="isMouseover" class="img relative">
          <myLoading v-if="isVideoPlay" class="w-[100%] h-[100%] absolute">
            <!-- <span>加载中...</span> -->
          </myLoading>
          <video class="img" @canplaythrough="videoCanplaythrough"  :poster="imgSrc" muted :src="videoUrl" ref="video" ></video>
        </div>
      </div>
     
    </div>
    <div class="line-clamp-2 text-sm mt-1 cursor-pointer ">
      {{ title }}
    </div>
    <div class="truncate dark:text-white/50 text-black/50 text-xs cursor-pointer">
      <span v-if="isBy">
        by 
      </span> {{ name }}
    </div>
  </div>
</template>

<script setup>
import myLoading from '@/components/myLoading.vue'
import { useMouseInElement } from '@vueuse/core'
import { ref, toRefs, onMounted, computed, reactive, watch, nextTick } from 'vue'
import { getVideoTimelineAll, getVideoGroupList, getVideoCategoryList, getMvUrl, getVideoUrl } from '@/services'
const props = defineProps({
  title: {
    type: String,
    default: () => ('')
  },
  mode: {
    type: String,
    default: () => ('video')
  },
  name: {
    type: String,
    default: () => ('')
  },
  imgSrc: {
    type: String,
    default: () => ('')
  },
  id: {
    type: [Number,String],
    default: () => ('')
  },
  item: {
    type: Object,
    default: () => {}
  },
  index: {
    type: Number,
    default: () => (0)
  },
  isBy: {
    type: Boolean,
    default: () => (true)
  }
})
const { id, mode } = toRefs(props)
const videoUrl = ref('')
const video = ref()
const isMouseover = ref(false)
const isVideoPlay = ref(true)
const videoImgMouseover = async (item, index) => {
  if (videoUrl.value) {
    video.value.initPlay = 'start'
    isMouseover.value = true  
    video.value.currentTime = 0
    video.value.play()
    return
  }
  isMouseover.value = true
  
  if (mode.value == 'video') {
    const res = await getVideoUrl(id.value)
    videoUrl.value = res.urls[0].url
  } else if (mode.value == 'mv') {
    const res = await getMvUrl(id.value)
    videoUrl.value = res.data.url
  }
  
}

const videoImgMouseout = async () => {
  isMouseover.value = false
  video.value.pause()
  video.value.initPlay = 'stop'
}

const videoCanplaythrough = (e) => {
  if (isMouseover.value && videoUrl.value) { 
    try {
      isVideoPlay.value = false
      video.value.play()
    } catch (error) {
      
    }
  }
}

const emits = defineEmits(['videoItemClick'])
const itemClick = () => {
  emits('videoItemClick', id.value)
}

const target = ref(null)

const { x, y, isOutside } = useMouseInElement(target)

watch(isOutside, n => {
  if (n && videoUrl.value) {
    isMouseover.value = false
    video.value.pause()
  }
})

</script>

<style scoped lang="less">
  .item{
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    .videoOrImg{
      height: 150px;
      .img{
        width: 100%;
        height: 150px;
      }
    }
  }



</style>