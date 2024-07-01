<template>
  videoDetails
  <div v-for="item in 400">
    {{ item }}
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getVideoUrl } from '@/services'
const route = useRoute()
const router = useRouter()

const id = route.query.id
if (!id) {
  router.replace('/index')
}

const videoUrl = ref('')
const getVideoUrlData = async () => {
  const res = await getVideoUrl(id)
  videoUrl.value = res.urls[0].url
}
getVideoUrlData()


</script>

<style scoped lang="less">

</style>