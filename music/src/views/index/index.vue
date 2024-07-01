<template>
  <div class="index">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="tabClick">
      <template v-for="item in indexTabsMock">
        <el-tab-pane :label="item.label" :name="item.name">
      </el-tab-pane>
      </template>
    </el-tabs>
    <div ref="testRef">
      <el-scrollbar ref="scrollbarRef" :height="`calc(100vh - ${pageHeight} - 40px - 85px)`" @scroll="indexPageScroll">
        <div ref="componentRef" style="height: 100%;">
          <component :componentHeight="componentHeight" :componentClientHeight="componentClientHeight" @jump-tab="jumpTab" :scroll-top="scrollTop" :is="cpt"></component>
        </div>
    </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, toRefs, watch, defineAsyncComponent, onMounted, markRaw } from 'vue';
import { throttle } from 'underscore'
import { indexTabsMock } from '@/mock'
import { useInfiniteScroll } from '@vueuse/core'
import usePageStore from '@/stores/modules/page'
const pageStore = usePageStore()
const { pageHeight } = toRefs(pageStore)

const route = useRoute()
const router = useRouter()
const el = ref()
// useInfiniteScroll(
//   el,
//   () => {
//   //  console.log('useInfiniteScroll');
//   },
//   { distance: 10 }
// )

const activeName = ref('personalizedMuicList')
const tabIndex = ref(0)
const componentHeight = ref(0)
const tabClick = item => {
  if(item.index == tabIndex.value) return
  tabIndex.value = item.index
  const name = indexTabsMock[tabIndex.value].name
  router.push(`/index/${name}`)
  cpt.value = markRaw(defineAsyncComponent(components[`./cpts/${name}/${name}.vue`]))
  
}
const components = import.meta.glob('./cpts/*/*.vue')

const cpt = ref(null)
cpt.value = markRaw(defineAsyncComponent(components[`./cpts/${indexTabsMock[tabIndex.value].name}/${indexTabsMock[tabIndex.value].name}.vue`]))

const scrollbarRef = ref()
const componentRef = ref()
const testRef = ref()

let componentClientHeight = 0
const jumpTab = (path) => {
  const index = indexTabsMock.findIndex(item => item.name == path)
  activeName.value = path
  tabIndex.value = index
  cpt.value = markRaw(defineAsyncComponent(components[`./cpts/${path}/${path}.vue`]))
}

const scrollTop = ref(0)
const indexPageScroll = throttle((n) => {
  if(! ['latestMusic', 'songSheet', 'singer'].includes(indexTabsMock[tabIndex.value].name)) return
  componentClientHeight = componentRef.value?.clientHeight
  componentHeight.value = testRef.value?.clientHeight
  scrollTop.value = n.scrollTop
}, 300)


watch(route, (n, v) => {
  if (n.matched[0].path == '/index') {
    const index = indexTabsMock.findIndex(item => item.name == n.name)
    if (activeName.value == indexTabsMock[index].name) return
    activeName.value = indexTabsMock[index].name
    tabIndex.value = index
    cpt.value = markRaw(defineAsyncComponent(components[`./cpts/${n.name}/${n.name}.vue`]))
  }
}, {
  deep: true,
  immediate: true
})


</script>

<style scoped lang="less">
.demo-tabs{
  // position: sticky;
  // top: 0;
  // z-index: 9;
  // background-color: rgba(30, 30, 30, 0.8);
}


:deep(.el-tabs__header){
  .el-tabs__item{
    // color: var(--el-button-text-color);
    color: var(--el-tabs-item-color);
    &:hover{
      color: var( --el-tabs-item-active-color);
    }

  }
  .el-tabs__active-bar{
    background-color: var(--el-tabs-item-active-bar-color);
  }
  .el-tabs__nav-wrap::after{
    background-color: hsla(0, 0%, 100%, 0);
  }
  .is-active{
    font-weight: 900;
    color: var( --el-tabs-item-active-color);
  }
}
</style>