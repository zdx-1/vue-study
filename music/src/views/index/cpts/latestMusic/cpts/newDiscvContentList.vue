<template>
  <div class="newDiscvContentList">
    <div class="left">
      {{ title }}
    </div>
    <div class="right">
      <songSheetBox :artists="true" :renderSum="30" :is-all="false" @song-sheet-click="songSheetClick"  :song-sheet-list="gridItems"/>
    </div>
    
  </div>
</template>


<script setup>
import songSheetBox from '@/components/songSheetBox/songSheetBox.vue'
import { ref, toRefs, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  gridItems: {
    type: Array,
    default: () => ([])
  },
  title: {
    type: String,
    default: ()=> ('')
  },
  gridItemsIndex: {
    type: Number,
    default: ()=> (0)
  },
  gridItemsLength: {
    type: Number,
    default: ()=> (0)
  },
})
const year = ''
const month = ''
const { gridItems, title, gridItemsIndex, gridItemsLength } = toRefs(props)
console.log(gridItems);
const recycleScroller = ref()
const itemSize = ref(220)
onMounted(() => {
  // window.addEventListener('resize', () => {
  // })
})


const pageProvider = async (pageNumber, pageSize) => {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve( gridItems.value)
    )
  )
}
const gridList = ref([])
let sum = 0
// const splitItem = data => {
//   let arr = data.slice(sum, sum + 50)
//   if (arr.length) {
//     gridList.value = [...gridList.value, arr]
//     emits('splicOk')
//   }
// }
// watch(gridItems, n => {
//   if (n.length) {
//     gridList.value = n.slice(sum, sum + 50)
//   }
// }, {
//   deep: true,
//   immediate: true
// })
const emits = defineEmits(["splicOk"])
// watch(splic, n => {
//   if (n) {
//     splitItem(gridItems.value)
//   }
// }, {
//   deep: true,
//   immediate: true
// })   
const songSheetClick = item => {
  router.push(`/songalbum?id=${item.id}`)
} 
</script>

<style scoped lang="less">
.newDiscvContentList{
  padding-right: 20px;
  display: flex;
  .left{
    width: 50px;
    height: 50px;
    position: sticky;
    top: 0;
  }
  .right{
    flex: 1;
  }
}
  

.grid {
  display: grid;
  // grid-gap: 40px;
  gap: 10px 30px;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 992px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 1440px) {
  .grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
@media (min-width: 1650px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (min-width: 1890px) {
  .grid {
    grid-template-columns: repeat(7, 1fr);
  }
}
@media (min-width: 2530px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

.item {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 120px;
  min-height: 120px;
  .img{
    flex: 1;
    width: 100%;
    height: auto;
    margin-bottom: 8px;
  }
  .name{
    height: 20px;
    font-size: 14px;
  }
  .artists{
    height: 16px;
    font-size: 12px;
    color: var(--hsla-05);
  }
}
</style>