<template>
  <div>
    <tabr :tabs="myCollectionTabsMock" :active="tabActive" @item-click="tabItemClick" class="sticky top-[0px] right-0 left-0"/>
    <div class="">
      <component :is="cpt"/>
    </div>
  </div>
</template>

<script setup>
import tabr from '@/views/video/cpts/tabr.vue'
import { myCollectionTabsMock } from '@/mock/myCollection'
import { getDigitalAlbumPurchased, getAlbumSublist, getVideoSub, getTopicSublist, getArtistSublist } from '@/services'
import { ref, toRefs, defineAsyncComponent, markRaw } from 'vue'

const tabActive = ref(myCollectionTabsMock[0].id)
const components = import.meta.glob('./cpts/*.vue')
const cpt = ref(null)
cpt.value = markRaw(defineAsyncComponent(components[`./cpts/${tabActive.value}.vue`]))

const tabItemClick = item => {
  tabActive.value = item.id
  const link = components[`./cpts/${tabActive.value}.vue`]
  cpt.value = markRaw(defineAsyncComponent(link))
}
</script>