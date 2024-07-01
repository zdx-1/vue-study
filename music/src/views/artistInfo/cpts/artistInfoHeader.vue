<template>
  <div class="artistInfoHeader">
    <div class="infoBox">
      <!-- <img class="img" v-lazy="{ src: info.img1v1Url, delay: 500 }" :title="info.name" :alt="info.name" /> -->
      <my-image class="img" :url="info.img1v1Url" :title="info.name" :alt="info.name" />
      <div>
        <h2 class="name">
          {{ info.name }}
        </h2>
        <div class="name">
          <template v-for="item in info.alias">
            <span>
              {{ item }}
            </span>
          </template>
        </div>
        <div class="size">
          <span>单曲数：{{ info.musicSize }}</span>
          <span>专辑数：{{ info.musicSize }}</span>
          <span>MV数：{{ info.musicSize }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'

const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  },
})
</script>

<style scoped lang="less">
.infoBox{
  height: 230px;
  display: flex;
  .img{
    width: 230px;
    height: 230px;
    border-radius: 8px;
  }
}
</style>