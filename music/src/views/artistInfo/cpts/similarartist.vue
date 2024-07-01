<template>
  <div class="similarartist">
    <songSheetBox :artists="true" :renderSum="10" :is-all="false" @song-sheet-click="songSheetClick"  :song-sheet-list="simiArtists"/>
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'
import { getAssetsFile } from '@/utils'
import songSheetBox from '@/components/songSheetBox/songSheetBox.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  simiArtists: {
    type: Array,
    default: () => ([])
  },
})

const songSheetClick = item => {
  router.push(`/artistInfo?id=${item.id}`)
}
</script>

<style scoped lang="less">

</style>