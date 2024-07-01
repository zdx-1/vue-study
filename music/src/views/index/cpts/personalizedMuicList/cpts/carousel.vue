<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
      <my-image class="img" style="height: 200px; width: 100%;" :url="item.pic" />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { getHomeBanner } from '@/services'
import { ref } from 'vue';
const bannerList = ref([])
const getBannerList = async () => {
  const res = await getHomeBanner()
  bannerList.value = res['banners']
}
getBannerList()
</script>

<style scoped>
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--hsla-05);
  font-size: 14px;
}
</style>