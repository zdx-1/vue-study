<template>
  <div class="video min-w-[550px]">
    <tabs class="mt-[10px]" @tab-click="tabClick" :activeItem="tabsActive" :group-list="videoGroupList" :category-list="videoCategoryList"></tabs>

    <div class="videoList flex flex-wrap" v-if="loginStatus">
      <template v-for="(item, index) in videoGroupData">
        <videoItem
          class="w-[25%] videoItem"
          :img-src="item.data?.coverUrl" 
          :title="item.data?.title" 
          :name="item.data?.creator?.nickname" 
          :id="item.data?.vid" 
          :item="item" 
          :index="index"
          @videoItemClick="videoItemClick"
        />
      </template>
      <myLoading v-if="loading" class="mt-[10px] w-[100%]">
        <span>加载中...</span>
      </myLoading>
    </div>

    <div v-else class="flex items-center justify-center text-xs">
      请登入!
    </div>
  </div>
</template>

<script setup>
import tabs from './cpts/tabs.vue';
import myLoading from '@/components/myLoading.vue'
import videoItem from '@/components/video/videoItem.vue'
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'
import { getVideoTimelineAll, getVideoGroupList, getVideoCategoryList, getVideoGroup, getVideoUrl } from '@/services'
import usePageStore from '@/stores/modules/page'
import useUserStore from '@/stores/modules/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(true)
const userStore = useUserStore()
const { loginStatus } = toRefs(userStore)

const pageStore = usePageStore()
const { arrivedState } = toRefs(pageStore)

const tabsActive = reactive({
  name: '现场',
  id: 58100
})
const videoGroupList = ref([])
const videoCategoryList = ref([])
const videoGroupData = ref([])
const categoryId = ref('')
let offset = 2
let isGo = true

const initVideoGroupAndCategory = async () => {
  const videoGroupListRef = await getVideoGroupList()
  const videoCategoryListRef = await getVideoCategoryList()
  videoGroupList.value = videoGroupListRef.data
  categoryId.value = videoGroupListRef.data[0]?.id
  videoCategoryList.value = videoCategoryListRef.data
  initVideoList()
}
initVideoGroupAndCategory()


const getVideoGroupData = async () => {
  isGo = false
  try {
    loading.value = true
    let res = await getVideoGroup(categoryId.value, offset)
    videoGroupData.value = [...videoGroupData.value, ...res.datas]
    loading.value = false
    offset++
    isGo = true
  } catch (error) {
    isGo = true
  }
}

const initVideoList = () => {
  if(!loginStatus.value) return
  Promise.all([getVideoGroup(categoryId.value, 0)]).then(res => {
    res.forEach(item => {
      videoGroupData.value = [...videoGroupData.value, ...item.datas]
    });
    Promise.all([getVideoGroup(categoryId.value, 1)]).then(res => {
      res.forEach(item => {
        videoGroupData.value = [...videoGroupData.value, ...item.datas]
      });
      loading.value = false
    })
  })
}

const tabClick = item => {
  let { name, id } = item
  tabsActive.name = name
  tabsActive.id = id
  categoryId.value = id
  videoGroupData.value = []
  offset = 2
  initVideoList()
}

watch(arrivedState, n => {
  if (n && n.bottom && isGo) {
    getVideoGroupData()
  }
}, {
  deep: true,
  immediate: true
})
watch(loginStatus, n => {
  if (n && !videoGroupData.value.length) {
    initVideoList()
  }
}, {
  deep: true
})

const videoItemClick = id => {
  console.log('video-videoItemClick', id);
  router.push(`/videoDetails?id=${id}&mode=video`)
}
</script>

<style scoped lang="less">
@media screen and (max-width: 1420px) {
  .videoItem{
    width: 33.3333333% !important;
  }
}
@media screen and (max-width: 1120px) {
  .videoItem{
    width: 50% !important;
  }
}
</style>



