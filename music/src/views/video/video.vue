<template>
  <div class="video min-w-[550px]">
    <tabr :tabs="videoTabsMock" :active="tabActive" @item-click="tabItemClick" class="sticky top-[0px] right-0 left-0"></tabr>
    <!-- <component :is="componentId"></component> -->
    <div class="">
      <component :is="cpt"/>
    </div>
  </div>
</template>

<script setup>
import tabr from './cpts/tabr.vue'
import { ref, markRaw, defineAsyncComponent, computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { videoTabsMock } from '@/mock/video'


const route = useRoute()
const router = useRouter()

const tabActive = ref('video')
const components = import.meta.glob('./cpts/*/*.vue')
const cpt = ref(null)
cpt.value = markRaw(defineAsyncComponent(components[`./cpts/${tabActive.value}/${tabActive.value}.vue`]))

const tabItemClick = item => {
  tabActive.value = item.id
  const link = components[`./cpts/${tabActive.value}/${tabActive.value}.vue`]
  cpt.value = markRaw(defineAsyncComponent(link))
  
}

watch(route, n => {
  console.log(n);
})

</script>

<style scoped lang="less">
.videoList{
  position: fixed;
  // display: grid;
  // grid-template-columns:repeat(4,1fr);
  // grid-gap: 10px;
  // @media screen and (max-width: 1380px) {
  //   grid-template-columns:repeat(4,1fr);
  // }
  // @media screen and (max-width: 1080px) {
  //   grid-template-columns:repeat(3,1fr);
  // }
  // @media screen and (max-width: 920px) {
  //   grid-template-columns:repeat(2,1fr);
  // }
  // @media screen and (max-width: 820px) {
  //   grid-template-columns:repeat(1,1fr);
  // }
}
</style>


