<template>
  <div class="singer" ref="singerRef">
    <template v-for="item in artistListClassMock">
      <artistNameBox :active="active[item.key]" :item-data="item" @item-click="tabClick"></artistNameBox>
    </template>
    <div class="content">
      <song-sheet-box :render-sum="20" @song-sheet-click="songSheetClick" :song-sheet-list="artistList"></song-sheet-box>
    </div>
    <div v-if="isBottom" class="mb-[20px]">
      <my-loading >
        <span>加载中...</span>
      </my-loading>
    </div>
  </div>
</template>

<script setup>
import { getArtistList } from '@/services'
import { artistListClassMock } from '@/mock'
import { ref, toRefs, watch, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import artistNameBox from './cpts/artistNameBox.vue'
import songSheetBox from '@/components/songSheetBox/songSheetBox.vue'
import myLoading from '@/components/myLoading.vue'
const props = defineProps({
  scrollTop: {
    type: Number,
    default: () => (0)
  },
  componentClientHeight: {
    type: Number,
    default: () => (0)
  },
})
const offset = ref(0)
const limit = ref(20)
const active = reactive({
  area: "-1",
  type: "-1",
  initial: "-1"
})
const isBottom = ref(false)
const { scrollTop, componentClientHeight } = toRefs(props)
const artistList = ref([])
const singerRef = ref()
const router = useRouter()
const getArtistListData = async () => {
  const res = await getArtistList(active, {
    offset: offset.value,
    limit: limit.value,
  })
  artistList.value = [...artistList.value, ...res.artists]
  offset.value += 20
  isBottom.value = false
  console.log(singerRef.value?.clientHeight);
}
getArtistListData()
const tabClick = (name, val) => {
  active[name] = val
  artistList.value = []
  offset.value = 0
  limit.value = 20
  getArtistListData()
}
const songSheetClick = (res) => {
  router.push(`/artistInfo?id=${res.id}`)
}

const singerScroll = (e) => {
  console.log('singerScroll', e);
}

onMounted(() => {
  // const scrollHeight = document.querySelector('.main .el-scrollbar .el-scrollbar__view').scrollHeight
  // console.log('scrollHeight', scrollHeight);
  // setInterval(() => {
  //   console.log(singerRef.value?.clientHeight);
  // },100)
})

watch(scrollTop, (n) => { 
  if (n && singerRef.value) {
    const scrollbarH = document.querySelector('.main .el-scrollbar').offsetHeight
    const componentCH = componentClientHeight.value
    if (scrollbarH + n + 40 > componentCH && !isBottom.value) {
      isBottom.value = true
      getArtistListData()
    }
  }
}, {
  deep: true,
  immediate: true
})
</script>

<style scoped lang="less">
.content{
  margin-top: 30px;
}
</style>