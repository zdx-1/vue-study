<template>
  <div class="podcast pb-6">
    <dj-items-row :items="djPersonalizeRecommendData" ref="djPersonalizeRecommendRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>猜你喜欢</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-row>

    <dj-items-row :items="dianyinData" ref="dianyinRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>电音</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-row>

    <dj-items-row :items="chuangZuoFanChangData" ref="chuangZuoFanChangRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>创作翻唱</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-row>

    <dj-items-column :items="xinWenZiXunData" ref="xinWenZiXunRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>新闻资讯</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-column> 
    
    <dj-banner :banners="djBannerData" ref="bannerRef" />

    <dj-items-row :items="musicRecommendData" ref="musicRecommendRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>音乐推荐</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-row>

    <dj-items-column :items="emotionData" ref="emotionRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>情感</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-column>

    <dj-items-column :items="lifeData" ref="lifeRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>生活</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-column> 

    <dj-items-row :items="audioBookData" ref="audioBookRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>有声书</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-row>

    <dj-items-row :items="parentingData" ref="parentingRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>亲子</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-row> 
    
    <dj-items-row :items="humanisticHistoryData" ref="humanisticHistoryRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>人文历史</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-row> 
    
    <dj-items-column :items="talkShowData" ref="talkShowRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>脱口秀</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-column>

    <dj-items-row :items="twoDData" ref="twoDRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>二次元</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-row>
    
    <dj-items-column :items="storyData" ref="storyRef">
      <template #title>
        <div class="flex items-center cursor-pointer font-black">
          <h2>故事</h2>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </dj-items-column>
   
  </div>
</template>

<script setup>
import {
  ArrowRight,
} from '@element-plus/icons-vue'
import { useLazyData } from '@/hooks/useIntersectionObserver'
import { getDjBanner, getDjPersonalizeRecommend, getDjCatelist, getDjRecommendType } from '@/services'
import { ref, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import djBanner from './cpts/djBanner.vue'
import djItemsRow from './cpts/djItemsRow.vue'
import djItemsColumn from './cpts/djItemsColumn.vue'

const router = useRouter()

const djBannerData = ref([])
const getDjBannerData = async () => {
  const res = await getDjBanner()
  djBannerData.value = res.data
  console.log(res.data);
}

const djPersonalizeRecommendData = ref([])
const getDjPersonalizeRecommendData = async () => {
  const res = await getDjPersonalizeRecommend()
  djPersonalizeRecommendData.value = res.data
}

const djCatelist = ref([])
const getDjCatelistData = async () => {
  const res = await getDjCatelist()
  djCatelist.value = res.categories
  console.log(res);
}
getDjCatelistData()

const dianyinData = ref([])
const getDianyinData = async () => {
  const res = await getDjRecommendType(10002)
  dianyinData.value = res.djRadios?.slice(0,6)
}

const chuangZuoFanChangData = ref([])
const getChuangZuoFanChangData = async () => {
  const res = await getDjRecommendType(2001)
  chuangZuoFanChangData.value = res.djRadios?.slice(0,6)
}

const musicRecommendData = ref([])
const getMusicRecommendData = async () => {
  const res = await getDjRecommendType(2)
  musicRecommendData.value = res.djRadios?.slice(0,6)
}

const emotionData = ref([])
const getEmotionData = async () => {
  const res = await getDjRecommendType(3)
  emotionData.value = res.djRadios?.slice(0,6)
}

const lifeData = ref([])
const getLifeData = async () => {
  const res = await getDjRecommendType(6)
  lifeData.value = res.djRadios?.slice(0,6)
}

const parentingData = ref([])
const getParentingData = async () => {
  const res = await getDjRecommendType(13)
  parentingData.value = res.djRadios?.slice(0,6)
}

const audioBookData = ref([])
const getAudioBookData = async () => {
  const res = await getDjRecommendType(10001)
  audioBookData.value = res.djRadios?.slice(0,6)
}

const humanisticHistoryData = ref([])
const getHumanisticHistoryData = async () => {
  const res = await getDjRecommendType(3080098)
  humanisticHistoryData.value = res.djRadios?.slice(0,6)
}
 
const talkShowData = ref([])
const getTalkShowData = async () => {
  const res = await getDjRecommendType(8)
  talkShowData.value = res.djRadios?.slice(0,6)
}

const storyData = ref([])
const getStoryData = async () => {
  const res = await getDjRecommendType(3080097)
  storyData.value = res.djRadios?.slice(0,6)
}
      
const twoDData = ref([])
const getTwoDData = async () => {
  const res = await getDjRecommendType(3001)
  twoDData.value = res.djRadios?.slice(0,6)
}

const xinWenZiXunData = ref([])
const getXinWenZiXunData = async () => {
  const res = await getDjRecommendType(3087096)
  xinWenZiXunData.value = res.djRadios?.slice(0, 6)
}

getDjBannerData()
const bannerRef = ref()
const dianyinRef = ref()
const chuangZuoFanChangRef = ref()
const djPersonalizeRecommendRef = ref()
const xinWenZiXunRef = ref()
const musicRecommendRef = ref()
const emotionRef = ref()
const lifeRef = ref()
const parentingRef = ref()
const audioBookRef = ref()
const humanisticHistoryRef = ref()
const talkShowRef = ref()
const twoDRef = ref()
const storyRef = ref()

onMounted(() => {
  useLazyData(bannerRef, {
    fn: () => {
      
    }
  })
  useLazyData(dianyinRef, {
    fn: () => {
      getDianyinData()
    }
  })
  useLazyData(chuangZuoFanChangRef, {
    fn: () => {
      getChuangZuoFanChangData()
    }
  })
  useLazyData(djPersonalizeRecommendRef, {
    fn: () => {
      getDjPersonalizeRecommendData()
    }
  })
  useLazyData(xinWenZiXunRef, {
    fn: () => {
      getXinWenZiXunData()
    }
  })
  useLazyData(musicRecommendRef, {
    fn: () => {
      getMusicRecommendData()
    }
  })
  useLazyData(emotionRef, {
    fn: () => {
      getEmotionData()
    }
  })
  useLazyData(lifeRef, {
    fn: () => {
      getLifeData()
    }
  })
  useLazyData(parentingRef, {
    fn: () => {
      getParentingData()
    }
  })
  useLazyData(audioBookRef, {
    fn: () => {
      getAudioBookData()
    }
  })
  useLazyData(humanisticHistoryRef, {
    fn: () => {
      getHumanisticHistoryData()
    }
  })
  useLazyData(talkShowRef, {
    fn: () => {
      getTalkShowData()
    }
  })
  useLazyData(storyRef, {
    fn: () => {
      getStoryData()
    }
  })
  useLazyData(twoDRef, {
    fn: () => {
      getTwoDData()
    }
  })
})
</script>

<style scoped lang="less">

</style>