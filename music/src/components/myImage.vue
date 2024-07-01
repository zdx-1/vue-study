<template>
  <img ref="img"   class="myImg imgLoadingBgd"  v-lazy="{ src: url, delay: 200, error: getAssetsFile('index/loading.jpg') }" :title="title" :alt="alt" />   
</template>

<script setup>
import { onMounted, ref, toRefs } from 'vue'
import { getAssetsFile } from '@/utils'
const props = defineProps({
  url: {
    type: String,
    default: () => ('')
  },
  title: {
    type: String,
    default: () => ('')
  },
  alt: {
    type: String,
    default: () => ('')
  },
})
const emits = defineEmits(['imgLoad'])

const img = ref()

  
onMounted(() => {
  // let img = new Image();
  // img.onload = () => {
  //   emits('imgLoadT')
  //   console.log(img);
  // };
  // console.log(img.src);
})
const loading = ref(false)


</script>

<style scoped lang="less">
:deep(.el-space){
  width: 100%;
  .el-space__item{
    width: 100%;
  }
}
.myImg{
  // width: 100%;
}
</style>